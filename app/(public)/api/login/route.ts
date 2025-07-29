import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  	const body = await request.json()

	const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	})

	const data = await apiRes.json()
	const setCookie = apiRes.headers.get('set-cookie')
	
	const res = NextResponse.json(data, { status: apiRes.status })

	if (setCookie) {
		res.headers.set('set-cookie', setCookie)
	}

	return res
}
