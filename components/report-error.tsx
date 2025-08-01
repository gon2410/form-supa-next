"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import SubmitButton from "@/components/submit-button";

const ReportError = () => {
    const [name, setName] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
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
                name: name,
                lastname: lastname,
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
        <form action={submitAction} className="grid gap-8 mt-10">
            <div className="grid gap-2">
                <Label htmlFor="name" className="text-white">Nombre</Label>
                <Input id="name" placeholder="Juan" className="bg-white" value={name} onChange={(e) => setName(e.target.value)} autoComplete="true" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="lastname" className="text-white">Apellido</Label>
                <Input id="lastname" placeholder="Perez" className="bg-white" value={lastname} onChange={(e) => setLastname(e.target.value)} autoComplete="true" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">Dirección de e-mail</Label>
                <Input id="email" type="email" className='bg-white' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="juanperez@hotmail.com" autoComplete="true" required/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description" className="text-white">Descripción del error</Label>
                <Textarea id="description" className='bg-white' placeholder="Escriba el error detalladamente aqui" rows={40} value={description} onChange={(e) => setDescription(e.target.value)} required/>
            </div>
            <div className="text-center mt-5">
                <SubmitButton />
            </div>
        </form>
    )
}

export default ReportError;