import mongoose from 'mongoose'

let isConnected = false

const dbConnect = async (): Promise<void> => {
    if (isConnected) return

    const uri = process.env.MONGODB_URI
    if (!uri) {
        throw new Error("MONGODB_URI not found in environment variables")
    }

    try {
        const db = await mongoose.connect(uri)
        console.log("✅ Connected to DB:", db.connection.name)
        isConnected = db.connections[0].readyState === 1
        console.log("✅ MongoDB connected")
    } catch (error) {
        console.error("❌ MongoDB connection error:", error)
        throw error
    }
}

export default dbConnect
