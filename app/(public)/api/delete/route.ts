import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json()
    const cookies = request.headers.get("cookie");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-guest`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": cookies || ""
        },
        body: JSON.stringify(body),
        credentials: "include"
    })

    const data = await response.json()
    return NextResponse.json(data, {status: response.status})
}