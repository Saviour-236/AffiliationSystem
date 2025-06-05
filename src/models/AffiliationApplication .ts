import { Schema, model, models } from "mongoose";

const AffiliationApplicationSchema = new Schema(
    {
        applicant: {
            type: Schema.Types.ObjectId,
            ref: "User",  // link to user who applied
            required: true,
            unique: true, // one application per user (optional, based on your logic)
        },
        organization: { type: String },
        website: { type: String },
        reason: { type: String, required: true },
        experience: { type: String }, // e.g., "3 years in affiliate marketing"
        socialLinks: [{ type: String }], // Twitter, LinkedIn, etc.
        audienceSize: { type: String }, // Optional (for influencers)
        documents: [{ type: String }], // File URLs if any

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        reviewedBy: {
            type: Schema.Types.ObjectId,
            ref: "User", // admin user who reviewed
            required: false,
        },

        reviewedAt: { type: Date },
        notes: { type: String },
    },
    { timestamps: true }
);

export default models.AffiliationApplication ||
    model("AffiliationApplication", AffiliationApplicationSchema);
