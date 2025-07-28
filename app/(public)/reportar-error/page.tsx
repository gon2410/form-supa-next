"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

const ReportErrorPage = () => {
    const [email, setEmail] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    
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
            toast(data.detail);
        } else {
            toast(data)
        }
    }

    return (
        <div className="rounded-2xl p-4 bg-zinc-950">
            <Card>
                <CardHeader>
                    <CardTitle>Atención</CardTitle>
                    <CardDescription>Para que el reporte de error sea enviado, es
                    obligatorio ingresar una dirección de email registrada, es decir, <b>la
                    misma que utilizó</b> usted personalmente o el responsable del grupo para
                    confirmar. De lo contrario, será ignorado.</CardDescription>
                </CardHeader>
            </Card>
            <form action={submitAction} className="grid gap-8 mt-10">
               <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white">Dirección de e-mail</Label>
                    <Input id="email" type="email" className='bg-white' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="juanperez@hotmail.com" autoComplete="true" required/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description" className="text-white">Descripción del error</Label>
                    <Textarea id="description" className='bg-white' placeholder="Escriba el error detalladamente aqui" rows={40} value={description} onChange={(e) => setDescription(e.target.value)} required/>
                </div>
                <div className="text-center mt-5">
                    <Button type="submit" variant={"outline"}>Enviar</Button>
                </div>
            </form>
        </div>
    )
}

export default ReportErrorPage;