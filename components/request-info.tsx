"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SubmitButton from "@/components/submit-button";

const RequestInfo = () => {
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
                setGroup([])
                toast(data.detail);
            } else {
                setGroup(data);
            }
        } catch (error) {
            console.log(error)
            toast("No pudimos verificar el email.")
        }
    }
    
    return (
        <>
            <form action={submitAction} className="grid gap-8">
                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white">Dirección de e-mail</Label>
                    <Input type="email" id="email" className="bg-white" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="juanperez@hotmail.com" autoComplete="true" required/>
                </div>
                <div className="text-center mt-5">
                    <SubmitButton />
                </div>
            </form>

            <div>
                {group.length > 0 && (
                    <>
                        <Table className="mt-5 p-2 border rounded text-white">
                            <TableCaption className="text-white">Invitados inscriptos bajo el email proporcionado</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-white">#</TableHead>
                                    <TableHead className="text-white">Invitado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {group.map((member, index) => (
                                    <TableRow key={member.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{member.lastname}, {member.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <p className="text-center text-white mt-10">Si existe un error o necesita hacer un cambio en la inscripción, puede reportarlo <Link href={"/reportar-error"} className="text-blue-500 underline">aquí</Link></p>
                    </>
                )}
            </div>
        </>
    )
}

export default RequestInfo;