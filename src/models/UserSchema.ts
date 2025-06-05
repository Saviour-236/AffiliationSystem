import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, unique: true, required: true, lowercase: true, trim: true },
        password: { type: String, required: true },

        role: { type: String, enum: ["user", "affiliate", "admin"], default: "user" },

        // Affiliate-specific nested data (optional)
        affiliateData: {
            affiliateCode: { type: String, unique: true, sparse: true }, // unique but optional
            earnings: { type: Number, default: 0 },
            joinedAt: { type: Date },
            isActive: { type: Boolean, default: true },
            referralCount: { type: Number, default: 0 }, // how many people they referred
            payoutInfo: {
                bankAccount: String,
                ifsc: String,
                paypalEmail: String,
            },
        },

        // Profile info
        phone: { type: String },
        avatarUrl: { type: String }, // profile picture URL
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
            postalCode: String,
        },

        // Security & account status
        isEmailVerified: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        lastLoginAt: { type: Date },
        passwordResetToken: { type: String },
        passwordResetExpires: { type: Date },

        // Metadata
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true, // auto adds createdAt and updatedAt
    }
);

export default models.User || model("User", UserSchema);
