"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        const { name, email, phone, password, confirmPassword } = formData

        if (!name || !email || !phone || !password || !confirmPassword) {
            alert("All fields are required.")
            return
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.")
            return
        }

        setLoading(true)
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, password }),
            })

            const data = await res.json()

            if (res.ok) {
                alert("Account created successfully!")
                // Optional: redirect to login page
            } else {
                alert(data.message || "Sign up failed.")
            }
        } catch (err) {
            console.error("Sign-up error:", err)
            alert("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm p-6">
                <CardContent className="space-y-6">
                    <h2 className="text-xl font-semibold text-center">Sign Up</h2>

                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleChange("confirmPassword", e.target.value)}
                            required
                        />
                    </div>

                    <Button onClick={handleSubmit} className="w-full" disabled={loading}>
                        {loading ? "Creating Account..." : "Sign Up"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUpPage
