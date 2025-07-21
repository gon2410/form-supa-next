import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
    const allCookies = cookies()
    const token = (await allCookies).get("auth-token")
    console.log("all cookies", allCookies)

    return NextResponse
}