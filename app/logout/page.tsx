"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            const response = await fetch("/api/logout", {
                method: 'POST',
                credentials: "include"
            })

            if (response.ok) {
                router.push("/admin")
            }
        }
        logout();
    }, [])

    return (
        <div className="text-center">Adiós</div>
    )
}

export default LogoutPage;