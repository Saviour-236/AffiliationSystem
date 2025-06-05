// models/AdminUser.ts
import { Schema, model, models } from "mongoose";

const AdminUserSchema = new Schema(
    {
        name: String,
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        role: { type: String, default: "admin" }, // Future scope: superadmin, reviewer
    },
    { timestamps: true }
);

export default models.AdminUser || model("AdminUser", AdminUserSchema);
