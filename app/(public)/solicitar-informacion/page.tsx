"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
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

    const submitAction = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-group`, {
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
                setEmail("");
                setGroup([])
                toast(data.detail || "Algo salió mal. Intente de nuevo", {
                    duration: 5000
                })
            } else {
                setEmail("");
                setGroup(data);
            }
        } catch (error) {
            console.log(error)
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
                
            <form action={submitAction} className="grid gap-2 mt-10">
                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white">Dirección de e-mail</Label>
                    <Input type="email" id="email" className='bg-white' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="juanperez@hotmail.com" autoComplete="true" required/>
                </div>
                <div>
                    <Button type="submit" variant={"outline"}>Solicitar</Button>
                </div>
            </form>

            <div>
                {group.length > 0 && (
                    <Table className="mt-5 p-2 rounded text-white">
                        <TableCaption className="text-white">Lista de miembros asociados al email proporcionado</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-white">#</TableHead>
                                <TableHead className="text-white">Invitado</TableHead>
                                <TableHead className="text-white">Menú</TableHead>
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