"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

interface Props {
    guestId: string;
    guestName: string;
    guestLastname: string;
    guestMenu: string;
}

const EditGuestDialog = ({guestId, guestName, guestLastname, guestMenu}: Props) => {
    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [menu, setMenu] = useState<string>("");

    const [isEditing, setIsEditing] = useState<null | boolean>(false);
    const [success, setSuccess] = useState<string>("")
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const editGuest = async() => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/editguest`, {
            method: "POST",
            credentials: "include",
            headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify({
                id: id,
                name: name,
                lastname: lastname,
                menu: menu,
            }),
        })
        
        const data = await response.json();

        if (response.ok) {
            setError("")
            setSuccess(data)
            setIsEditing(false)
            router.refresh();
        } else {
            setSuccess("");
            setError(data.detail);
        }
    }

    return (
        <Dialog onOpenChange={() => setSuccess("")}>
            <DialogTrigger onClick={() => {
                setId(guestId.toString());
                setName(guestName);
                setLastname(guestLastname);
                setMenu(guestMenu);
            }}>+</DialogTrigger>
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

                    <div className="grid gap-1">
                        <Label htmlFor='menu'>Menú</Label>
                        <Select name='menu' value={menu} onValueChange={(value) => {setMenu(value); setIsEditing(true)}}>
                            <SelectTrigger id='menu'>
                                <SelectValue placeholder="Elegir" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sin_condicion">Sin Condición</SelectItem>
                                <SelectItem value="vegetariano">Vegetariano</SelectItem>
                                <SelectItem value="vegano">Vegano</SelectItem>
                                <SelectItem value="celiaco">Celiaco</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                </form>
                <DialogFooter className="grid gap-5">
                    <Button type="submit" form="editGuestForm" variant={"outline"} disabled={!isEditing}>Guardar</Button>
                    {success ? <p role="status" className="font-bold text-green-500 text-center">{success}</p> : <></>}
                    {error ? <p role="status" className="font-bold text-red-500 text-center">{error}</p> : <></>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditGuestDialog;