// models/AffiliateUser.ts
import { Schema, model, models } from "mongoose";

const AffiliateUserSchema = new Schema(
    {
        applicationId: {
            type: Schema.Types.ObjectId,
            ref: "AffiliationApplication",
            required: true,
        },
        name: String,
        email: String,
        phone: String,
        organization: String,
        affiliateCode: { type: String, unique: true }, // used for referrals
        isActive: { type: Boolean, default: true },
        joinedAt: { type: Date, default: Date.now },
        earnings: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default models.AffiliateUser ||
    model("AffiliateUser", AffiliateUserSchema);
