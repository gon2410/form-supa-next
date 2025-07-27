import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "@/components/login";

export default async function LoginPage() {
    const allCookies = await cookies()
    const token = allCookies.get("auth-cookie");

    if (token) {
        redirect("/admin")
    }

    return (
        <Login />
    )
}