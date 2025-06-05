"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const SignInPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            alert("Please enter both email and password.")
            return
        }

        setLoading(true)
        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const data = await res.json()
            if (res.ok) {
                alert("Signed in successfully!")
                // redirect or store token/session here
            } else {
                alert(data.message || "Sign in failed.")
            }
        } catch (err) {
            console.error("Sign in error:", err)
            alert("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm p-6">
                <CardContent className="space-y-6">
                    <h2 className="text-xl font-semibold text-center">Sign In</h2>

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
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            required
                        />
                    </div>

                    <Button
                        onClick={handleSubmit}
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignInPage
