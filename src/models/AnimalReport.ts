import mongoose, { Schema, Document } from "mongoose";

export interface IAnimalReport extends Document {
  // Animal Information
  animalType: string;
  breed?: string;
  name: string;
  age?: string;
  color: string;
  size: string;
  gender?: string;
  description: string;
  urgency: "low" | "medium" | "high" | "critical";

  // Image Information
  animalPhoto: {
    cloudinaryId: string;
    imageUrl: string;
    thumbnailUrl: string;
    originalFilename?: string;
    fileSize?: number;
    fileType?: string;
  };

  // Last Seen Information
  lastSeenDate: Date;
  lastSeenTime?: string;
  lastSeenLocation: string;

  // Contact Information
  reporterName: string;
  reporterPhone: string;
  reporterEmail: string;
  contactPreference: "phone" | "email" | "both";

  // Additional Information
  rewardAmount?: string;
  additionalInfo?: string;

  // System Information
  reportId: string;
  status: "active" | "found" | "closed" | "pending";
  createdAt: Date;
  updatedAt: Date;

  // AI Analysis (if implemented)
  aiAnalysis?: {
    confidence?: number;
    suggestedBreed?: string;
    detectedFeatures?: string[];
    processed?: boolean;
    injuryDetection?: {
      prediction: string;
      confidence: string;
      detectedAt: string;
    };
  };
}

const AnimalReportSchema: Schema = new Schema(
  {
    // Animal Information
    animalType: {
      type: String,
      required: true,
      enum: ["dog", "cat", "bird", "rabbit", "hamster", "guinea-pig", "other"],
    },
    breed: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      enum: ["very-small", "small", "medium", "large", "very-large"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "unknown"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    urgency: {
      type: String,
      required: true,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    // Image Information
    animalPhoto: {
      cloudinaryId: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      thumbnailUrl: {
        type: String,
        required: true,
      },
      originalFilename: String,
      fileSize: Number,
      fileType: String,
    },

    // Last Seen Information
    lastSeenDate: {
      type: Date,
      required: true,
    },
    lastSeenTime: {
      type: String,
      trim: true,
    },
    lastSeenLocation: {
      type: String,
      required: true,
      trim: true,
    },

    // Contact Information
    reporterName: {
      type: String,
      required: true,
      trim: true,
    },
    reporterPhone: {
      type: String,
      required: true,
      trim: true,
    },
    reporterEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    contactPreference: {
      type: String,
      required: true,
      enum: ["phone", "email", "both"],
      default: "phone",
    },

    // Additional Information
    rewardAmount: {
      type: String,
      trim: true,
    },
    additionalInfo: {
      type: String,
      trim: true,
    },

    // System Information
    reportId: {
      type: String,
      required: true,
      unique: true,
      // Remove duplicate index: true here since we define it below
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "found", "closed", "pending"],
      default: "active",
    },

    // AI Analysis
    aiAnalysis: {
      confidence: Number,
      suggestedBreed: String,
      detectedFeatures: [String],
      processed: {
        type: Boolean,
        default: false,
      },
      injuryDetection: {
        prediction: String,
        confidence: String,
        detectedAt: String,
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: "animal-reports",
  }
);

// Create indexes for better query performance
AnimalReportSchema.index({ reportId: 1 });
AnimalReportSchema.index({ status: 1 });
AnimalReportSchema.index({ animalType: 1 });
AnimalReportSchema.index({ urgency: 1 });
AnimalReportSchema.index({ lastSeenDate: -1 });
AnimalReportSchema.index({ createdAt: -1 });

// Compound indexes
AnimalReportSchema.index({ status: 1, urgency: 1 });
AnimalReportSchema.index({ animalType: 1, status: 1 });

// Export the model
export default mongoose.models.AnimalReport ||
  mongoose.model<IAnimalReport>("AnimalReport", AnimalReportSchema);
