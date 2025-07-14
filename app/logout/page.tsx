"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
    const router = useRouter();

    useEffect(() => {
        const logout = async() => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include"
            })

            if (response.ok) {
                router.push("/admin")
            }
        }

        logout();
    }, [])
    
    return (
        <div>Adiós</div>
    )
}

export default LogoutPage;