"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SubmitButton from "./submit-button";

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
            console.log(error)
            toast("Algo salió mal.")
        }
    }
    return (
        <form action={submitAction} className="grid gap-8">
            <p className="text-center text-1xl">Area de administración</p>

            <div className="grid gap-2">
                <Label htmlFor="email">Email:</Label>
                <Input id="email" type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} autoComplete="true" required/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Contraseña:</Label>
                <Input id="password" type="password" value={passwd} onChange={(e) => {setPasswd(e.target.value)}} required />
            </div>
            <div className="text-center mt-5">
                <SubmitButton defaultLabel="Ingresar" onPressLabel="Ingresando..."/>
            </div>
        </form>
    )
}

export default Login;