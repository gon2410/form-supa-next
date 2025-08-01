"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
interface Props {
    id: number;
}

interface Guest {
    id: number;
    name: string;
    lastname: string;
    companion_of: string;
}

const GroupMembersDialog = ({ id }:Props) => {
    const [open, setOpen] = useState(false);
    const [members, setMembers] = useState<Guest[]>([]);

    useEffect(() => {
        if (open) {
            tuFuncion()
        }
    }, [open])

    async function tuFuncion() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-companions-of/${id}`, {
            method: "GET"
        })

        const data = await response.json()
        setMembers(data)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>+</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Grupo de invitado</DialogTitle>
                <DialogDescription>Lista de miembros del grupo</DialogDescription>
                    {members.length > 0 ?
                        <Table className="border">
                            <TableHeader>
                                <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Miembro</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.map((member, index) => (
                                    <TableRow key={member.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{member.lastname}, {member.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    :
                        <p className="text-center text-sm">Este invitado va por su cuenta.</p>
                    }
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default GroupMembersDialog;