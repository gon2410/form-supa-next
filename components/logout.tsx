"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const Logout = () => {
const router = useRouter();

    const submitAction = async() => {
        const response = await fetch("/api/logout", {
            method: 'POST',
            credentials: "include"
        })

        if (response.ok) {
            router.push("/admin")
        }
    }

    return (
        <form action={submitAction}>
            <Button variant={"ghost"} className="text-destructive"><LogOut />Salir</Button>
        </form>
    )
}

export default Logout