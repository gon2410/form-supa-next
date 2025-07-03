"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
    leader_id: number;
    name: string;
    lastname:string;
}

interface Guest {
    id: number;
    name: string;
    lastname: string;
    menu: string;
}

const GroupMembersDialog = ({ leader_id, name, lastname }: Props) => {
    const [error, setError] = useState("");
    const [group, setGroup] = useState<Guest[]>([]);
    const supabase = createClient();

    const getGroupMembers = async () => {
        setGroup([])
        const {data:leader, error:leaderError} = await supabase.from("person").select("id, name, lastname, menu").eq("id", leader_id).single<Guest>();

        if (leaderError) {
            setError("Algo salió mal. Intente de nuevo.")
        }

        if (leader) {
            setGroup((prev) => [...prev, leader]);
            const {data: allCompanions, error:allCompanionsError } = await supabase.from("person").select("id, name, lastname, menu").eq("companion_of", leader_id);
            
            if (allCompanionsError) {
                setError("Algo salió mal. Intente de nuevo.")
            }
            
            if (allCompanions !== null && allCompanions?.length > 0) {
                setGroup((prev) => [...prev, ...allCompanions]);
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger onClick={getGroupMembers}><Users size={15}/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Grupo de {name} {lastname}</DialogTitle>
                <DialogDescription>Aquí se listan todos los miembros del grupo.</DialogDescription>
                    {error ?
                        <p className="text-center text-red-500">{error}</p>
                        :
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Apellido</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Menú</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {group.map((member) => (
                                    <TableRow key={member.id}>
                                        <TableCell>{member.lastname}</TableCell>
                                        <TableCell>{member.name}</TableCell>
                                        <TableCell>{member.menu}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default GroupMembersDialog;