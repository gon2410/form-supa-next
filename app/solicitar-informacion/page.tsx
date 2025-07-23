"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Guest {
    id: number;
    name: string;
    lastname: string;
    menu: string
}

const RequestInfoPage = () => {
    const [email, setEmail] = useState<string>("");
    const [group, setGroup] = useState<Guest[]>([]);

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const submitAction = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getgroup`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            })

            const data = await response.json();

            if (!response.ok) {
                setSuccess("")
                setEmail("");
                setError(data.detail || "Algo salió mal. Intente de nuevo")
            } else {
                setError("");
                setEmail("");
                setGroup(data);
                setSuccess("success");
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='h-full flex flex-col p-2'>
            <Card className="border-2 border-yellow-400">
                <CardHeader>
                    <CardTitle>Atención</CardTitle>
                    <CardDescription>Para que la solicitud de información sea procesada, es
                    obligatorio ingresar una dirección de email registrada, es decir, <b>la
                    misma que utilizó</b> usted personalmente o el responsable del grupo para
                    confirmar. De lo contrario, la solicitud será ignorada.</CardDescription>
                </CardHeader>
            </Card>
                
            <form action={submitAction} className="grid gap-2 justify-center mt-10">
                <div className="grid gap-2">
                    <Label htmlFor="email">Direccion de e-mail</Label>
                    <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="true" required/>
                </div>
                <div className="grid justify-center">
                    <Button type="submit" variant={"outline"}>Obtener</Button>
                </div>
            </form>

            <div>
                {error && (
                    <p className="text-red-600 mt-5 text-center">{error}</p>
                )}

                {success && (
                    <Table className="mt-5 border">
                        <TableCaption>Lista de miembros asociados al email proporcionado</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Invitado</TableHead>
                                <TableHead>Menú</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {group.map((member, index) => (
                                <TableRow key={member.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{member.lastname}, {member.name}</TableCell>
                                    <TableCell>{member.menu}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    )
}

export default RequestInfoPage;