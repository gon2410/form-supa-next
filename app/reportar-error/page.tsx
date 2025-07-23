"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const ReportErrorPage = () => {
    const [email, setEmail] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");
    
    const submitAction = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report-error`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                description: description
            })
        })

        const data = await response.json();

        if (!response.ok) {
            setSuccess("");
            setError(data.detail);
        } else {
            setError("");
            setSuccess(data)
        }
    }

    return (
        <div className='flex flex-col p-2'>
            <Card>
                <CardHeader>
                    <CardTitle>Atención</CardTitle>
                    <CardDescription>Para que la solicitud de información sea procesada, es
                    obligatorio ingresar una dirección de email registrada, es decir, <b>la
                    misma que utilizó</b> usted personalmente o el responsable del grupo para
                    confirmar. De lo contrario, la solicitud será ignorada.</CardDescription>
                </CardHeader>
            </Card>
            <form action={submitAction} className="flex flex-col gap-4 mt-10">
               <div className="grid gap-1">
                    <Label htmlFor="email">Dirección de e-mail</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="grid gap-1">
                    <Label htmlFor="description">Descripción del error</Label>
                    <Textarea id="description" placeholder="Escriba el error detalladamente aqui" rows={40} value={description} onChange={(e) => setDescription(e.target.value)} required/>
                </div>
                <div>
                    <Button type="submit" variant={"outline"}>Enviar</Button>
                </div>
                <div>
                    {success && (<p className="text-green-500">{success}</p>)}
                    {error && (<p className="text-destructive">{error}</p>)}
                </div>
            </form>
        </div>
    )
}

export default ReportErrorPage;