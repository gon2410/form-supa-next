"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Login = () => {
    const [email, setEmail] = useState<string>("admin@gmail.com");
    const [passwd, setPasswd] = useState<string>("xyzab3landa");
    const router = useRouter();
    
    const submitAction = async () => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    passwd: passwd
                }),
            })

            const data = await response.json();

            if (!response.ok) {
                toast(data.detail || "Algo salió mal.")
            } else {
                router.push("/admin");
            }
        } catch (error) {
            toast("Algo salió mal.")
        }
    }
    return (
        <div className="rounded-2xl p-5 bg-zinc-950">
            <form action={submitAction} className="grid gap-8">
                <p className="text-center text-white text-1xl">Area de administración</p>

                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white">Email:</Label>
                    <Input id="email" type="email" className="bg-white" value={email} onChange={(e) => {setEmail(e.target.value)}} autoComplete="true" required/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password" className="text-white">Contraseña:</Label>
                    <Input id="password" type="password" className="bg-white" value={passwd} onChange={(e) => {setPasswd(e.target.value)}} required />
                </div>
                <div className="text-center mt-5">
                    <Button type="submit" variant={"outline"}>Ingresar</Button>
                </div>
            </form>
        </div>
    )
}

export default Login;