import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect"
import User from "@/models/UserSchema" // adjust path if needed

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, email, phone, password } = body

        if (!name || !email || !phone || !password) {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            )
        }

        await dbConnect()

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists with this email." },
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            role: "user", // default role
        })

        await newUser.save()

        return NextResponse.json(
            { message: "User registered successfully." },
            { status: 201 }
        )
    } catch (err) {
        console.error("Signup Error:", err)
        return NextResponse.json(
            { message: "Internal Server Error." },
            { status: 500 }
        )
    }
}
