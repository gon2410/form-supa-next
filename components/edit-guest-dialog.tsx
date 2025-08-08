"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    guestId: string;
    guestName: string;
    guestLastname: string;
    guestCompanionOf: string;
    leaders: Guest[];
}

const EditGuestDialog = ({guestId, guestName, guestLastname, guestCompanionOf, leaders}: Props) => {
    const [id, setId] = useState<string>();
    const [name, setName] = useState<string>();
    const [lastname, setLastname] = useState<string>();
    const [leader, setLeader] = useState<string>();
    const [isEditing, setIsEditing] = useState<null | boolean>(false);

    const router = useRouter();

    const getLeader = () => {
        const foundLeader = leaders.find(leader => guestCompanionOf === leader.id.toString());
        setLeader(foundLeader ? foundLeader.id.toString() : "");
    }

    const editGuest = async() => {
        const response = await fetch("/api/update", {
            method: "POST",
            credentials: "include",
            headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify({
                id: id,
                name: name,
                lastname: lastname,
            }),
        })
        
        const data = await response.json();

        if (response.ok) {
            toast(data)
            setIsEditing(false)
            router.refresh();
        } else {
            toast(data.detail);
        }
    }

    return (
        <Dialog>
            <DialogTrigger onClick={() => {
                setId(guestId.toString());
                setName(guestName);
                setLastname(guestLastname);
                getLeader();
            }}><Edit size={15} /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{guestLastname}, {guestName}</DialogTitle>
                <DialogDescription className="border-b">Detalles del invitado</DialogDescription>
                </DialogHeader>
                <form action={editGuest} id="editGuestForm" className="grid gap-4">
                    <div className="grid gap-1">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" value={name} onChange={(e) => {setName(e.target.value); setIsEditing(true)}} autoComplete="true" required/>
                    </div>
                    
                    <div className="grid gap-1">
                        <Label htmlFor="lastname">Apellido</Label>
                        <Input id="lastname" value={lastname} onChange={(e) => {setLastname(e.target.value); setIsEditing(true)}} required/>
                    </div>

                    {leader ?
                        <div className="grid gap-1">
                            <Label htmlFor="leader">Es acompañante de</Label>
                            <Select value={leader} onValueChange={(value) => {setLeader(value)}} required>
                                <SelectTrigger id="leader">
                                    <SelectValue placeholder="Elegir" />
                                </SelectTrigger>
                                <SelectContent>
                                    {leaders.map(leader => (
                                        <SelectItem key={leader.id} value={leader.id.toString()}>{leader.lastname}, {leader.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        :
                        <></>
                        }

                </form>
                <DialogFooter className="grid gap-5">
                    <Button type="submit" form="editGuestForm" variant={"outline"} disabled={!isEditing}>Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditGuestDialog;