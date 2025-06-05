import { NextRequest } from 'next/server'
import dbConnect from '@/lib/dbConnect'

export async function GET(request: NextRequest) {
    await dbConnect()

    return new Response(JSON.stringify({ message: "api is running" }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    })
}
