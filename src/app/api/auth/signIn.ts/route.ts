import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect"
import User from "@/models/UserSchema"

export async function POST(req: NextRequest) {
    try {
        await dbConnect()

        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            )
        }

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            )
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            )
        }

        // Optionally: Generate JWT or Session here
        return NextResponse.json(
            {
                message: "Sign in successful",
                user: {
                    _id: user._id,
                    email: user.email,
                    role: user.role,
                    name: user.name,
                },
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Signin error:", error)
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        )
    }
}
