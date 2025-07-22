import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
            cookie: req.headers.get("cookie") || "",
        },
    })

    const data = await apiRes.json()

    const res = new NextResponse(JSON.stringify(data), {
        status: apiRes.status,
        headers: {
            "Content-Type": "application/json",
        },
    })

    const setCookie = apiRes.headers.get("set-cookie")
    if (setCookie) {
        res.headers.set("set-cookie", setCookie)
    }

    return res
}
