"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
                console.log("Error", data)
            } else {
                console.log(data)
                router.push("/admin");
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <Card>
                <CardContent>
                    <CardHeader className="mb-5">
                        <CardTitle className="text-center">Ingresar</CardTitle>
                    </CardHeader>
                    <form action={submitAction} className="grid gap-4">
                        <Label htmlFor="email">Email:</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} autoComplete="true" required/>
                        <Label htmlFor="password">Contraseña:</Label>
                        <Input id="password" type="password" value={passwd} onChange={(e) => {setPasswd(e.target.value)}} required />
                        <Button type="submit">Ingresar</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login;