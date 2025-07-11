import { headers } from "next/headers";
import { redirect } from "next/navigation";

const LogoutPage = async () => {
    const cookieHeader = (await headers()).get("cookie") || "";

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            cookie: cookieHeader
        }
    })

    if (response.ok) {
        redirect("/login")
    }
    
    return (
        <div>Adiós</div>
    )
}

export default LogoutPage;