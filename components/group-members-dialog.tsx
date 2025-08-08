"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from "lucide-react";
import { useState } from "react";

interface Props {
    id: number;
    name: string;
    lastname: string;
    guests: Guest[];
}

const GroupMembersDialog = ({ id, name, lastname, guests }: Props) => {
    const [members, setMembers] = useState<Guest[]>([]);

    const getMembers = () => {
        setMembers([]);
        setMembers(prev => [
            ...prev,
            ...guests.filter(guest => guest.companion_of === id)
        ]);
    };

    return (
        <Dialog>
            <DialogTrigger onClick={() => getMembers()}><Users size={15}/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Acompañantes de {name} {lastname}</DialogTitle>
                <DialogDescription>Listado de acompañantes</DialogDescription>
                    {members.length > 0 ?
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Apellido</TableHead>
                                <TableHead>Nombre</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.map((member, index) => (
                                    <TableRow key={member.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{member.lastname}</TableCell>
                                        <TableCell>{member.name}</TableCell>
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