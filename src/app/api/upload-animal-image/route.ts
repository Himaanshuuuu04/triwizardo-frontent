import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { uploadToCloudinary, getOptimizedImageUrl } from "@/lib/cloudinary";
import AnimalReport from "@/models/AnimalReport";

// Function to check if animal is injured using your external API
async function checkAnimalInjury(imageBase64: string, filename: string) {
  try {
    // Convert base64 to blob for form data
    const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Create form data
    const formData = new FormData();
    const blob = new Blob([buffer], { type: "image/jpeg" });
    formData.append("file", blob, filename || "image.jpg");

    // Call your injury detection API
    const response = await fetch(
      "https://vansh1293-paw-alert-api.hf.space/predict",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Injury detection API error: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    console.log("🔍 Injury detection result:", result);

    return {
      success: true,
      prediction: result.prediction,
      confidence: result.confidence,
      filename: result.filename,
    };
  } catch (error) {
    console.error("❌ Error checking animal injury:", error);
    return {
      success: false,
      message: "Failed to check animal injury status",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    const body = await request.json();
    const {
      image,
      filename,
      filesize,
      filetype,
      timestamp,
      metadata,
      // Animal report data
      formData,
    } = body;

    console.log("📥 Received animal report submission:", {
      filename: filename || "unknown",
      filesize: filesize || "unknown",
      filetype: filetype || "unknown",
      imageSize: image?.length || 0,
      timestamp: timestamp,
      uploadMethod: metadata?.uploadMethod || "unknown",
      hasFormData: !!formData,
    });

    // Validate required fields
    if (!image) {
      return NextResponse.json(
        { success: false, error: "Image is required" },
        { status: 400 }
      );
    }

    // Step 1: Check if animal is injured using your injury detection API
    console.log("🔍 Checking if animal is injured...");
    const injuryCheckResult = await checkAnimalInjury(image, filename);

    if (!injuryCheckResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Injury detection failed",
          message: injuryCheckResult.message,
          details: injuryCheckResult.details,
        },
        { status: 400 }
      );
    }

    // If animal is not injured, reject the report
    if (injuryCheckResult.prediction !== "injured") {
      return NextResponse.json(
        {
          success: false,
          error: "Animal not injured",
          message: `Animal appears to be ${injuryCheckResult.prediction}. Only injured animals can be reported through this system.`,
          injuryDetection: {
            prediction: injuryCheckResult.prediction,
            confidence: injuryCheckResult.confidence,
            filename: injuryCheckResult.filename,
          },
        },
        { status: 400 }
      );
    }

    console.log(
      `✅ Animal injury confirmed: ${injuryCheckResult.prediction} (confidence: ${injuryCheckResult.confidence})`
    );

    // Generate unique report ID
    const reportId = `report_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Upload image to Cloudinary
    console.log("☁️ Uploading to Cloudinary...");
    const cloudinaryResult = await uploadToCloudinary(image, "animal-reports");

    // Generate thumbnail URL
    const thumbnailUrl = getOptimizedImageUrl(
      cloudinaryResult.public_id,
      300,
      300
    );

    // Prepare animal report data
    const animalReportData = {
      // Animal Information
      animalType: formData?.animalType || "unknown",
      breed: formData?.breed || undefined,
      name: formData?.name || "Unknown",
      age: formData?.age || undefined,
      color: formData?.color || "Unknown",
      size: formData?.size || "medium",
      gender: formData?.gender || undefined,
      description: formData?.description || "No description provided",
      urgency: formData?.urgency || "medium",

      // Image Information
      animalPhoto: {
        cloudinaryId: cloudinaryResult.public_id,
        imageUrl: cloudinaryResult.secure_url,
        thumbnailUrl: thumbnailUrl,
        originalFilename: filename,
        fileSize: filesize,
        fileType: filetype,
      },

      // Last Seen Information
      lastSeenDate: formData?.lastSeenDate
        ? new Date(formData.lastSeenDate)
        : new Date(),
      lastSeenTime: formData?.lastSeenTime || undefined,
      lastSeenLocation: formData?.lastSeenLocation || "Location not specified",

      // Contact Information
      reporterName: formData?.reporterName || "Anonymous",
      reporterPhone: formData?.reporterPhone || "Not provided",
      reporterEmail: formData?.reporterEmail || "not-provided@example.com",
      contactPreference: formData?.contactPreference || "phone",

      // Additional Information
      rewardAmount: formData?.rewardAmount || undefined,
      additionalInfo: formData?.additionalInfo || undefined,

      // System Information
      reportId: reportId,
      status: "active",

      // AI Analysis with injury detection results
      aiAnalysis: {
        confidence: parseFloat(injuryCheckResult.confidence), // Use actual confidence from injury detection
        suggestedBreed: "To be determined", // This could be enhanced with breed detection
        detectedFeatures: ["injured", "requires_attention"], // Based on injury detection
        processed: true, // Set to true since we have processed the image
        injuryDetection: {
          prediction: injuryCheckResult.prediction,
          confidence: injuryCheckResult.confidence,
          detectedAt: new Date().toISOString(),
        },
      },
    };

    // Save to MongoDB
    console.log("💾 Saving to MongoDB...");
    const animalReport = new AnimalReport(animalReportData);
    const savedReport = await animalReport.save();

    // Success response
    const response = {
      success: true,
      message: "Animal report submitted successfully",
      reportId: reportId,
      imageId: cloudinaryResult.public_id,
      data: {
        id: savedReport._id,
        reportId: savedReport.reportId,
        animalName: savedReport.name,
        animalType: savedReport.animalType,
        status: savedReport.status,
        imageUrl: savedReport.animalPhoto.imageUrl,
        thumbnailUrl: savedReport.animalPhoto.thumbnailUrl,
        uploadedAt: savedReport.createdAt,
        lastSeenDate: savedReport.lastSeenDate,
        lastSeenLocation: savedReport.lastSeenLocation,
        contactInfo: {
          name: savedReport.reporterName,
          phone: savedReport.reporterPhone,
          email: savedReport.reporterEmail,
          preference: savedReport.contactPreference,
        },
      },
      cloudinary: {
        publicId: cloudinaryResult.public_id,
        url: cloudinaryResult.secure_url,
        thumbnailUrl: thumbnailUrl,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        format: cloudinaryResult.format,
        bytes: cloudinaryResult.bytes,
      },
      aiAnalysis: {
        processed: true,
        injuryDetection: {
          prediction: injuryCheckResult.prediction,
          confidence: injuryCheckResult.confidence,
          status: "Animal confirmed as injured and requires attention",
        },
        note: "AI analysis completed with injury detection",
      },
    };

    console.log("✅ Animal report saved successfully:", reportId);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("❌ Error processing animal report:", error);

    // Determine error type and respond accordingly
    if (error instanceof Error) {
      if (error.message.includes("Injury detection")) {
        return NextResponse.json(
          {
            success: false,
            error: "Injury detection failed",
            message: "Failed to check if animal is injured",
            details: error.message,
          },
          { status: 500 }
        );
      }

      if (error.message.includes("Cloudinary")) {
        return NextResponse.json(
          {
            success: false,
            error: "Image upload failed",
            message: "Failed to upload image to cloud storage",
            details: error.message,
          },
          { status: 500 }
        );
      }

      if (
        error.message.includes("MongoDB") ||
        error.message.includes("validation")
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Database error",
            message: "Failed to save report to database",
            details: error.message,
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "An unexpected error occurred while processing your report",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to retrieve uploaded images
export async function GET(request: NextRequest) {
  // TODO: Implement logic to retrieve uploaded images
  return NextResponse.json(
    {
      message: "GET method for retrieving images - implement as needed",
      examples: [
        "GET /api/upload-animal-image?imageId=123",
        "GET /api/upload-animal-image?userId=456",
      ],
    },
    { status: 200 }
  );
}
