"use client";

import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from 'sonner';

interface Leader {
    id: number;
    name: string;
    lastname: string;
}

const SaveForm = () => {

    const [name, setName] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [menu, setMenu] = useState<string>("");
    const [role, setRole] = useState<string>("leader");
    const [email, setEmail] = useState<string>("");
    const [leader, setLeader] = useState<string>("");

    const [leadersList, setLeadersList] = useState<Leader[]>([]);

    const submitAction = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-guest`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    lastname: lastname,
                    menu: menu,
                    role: role,
                    email: email,
                    leader: leader,
                }),
            })

            const data = await response.json();

            if (!response.ok) {
                toast(data.detail || "Algo salió mal. Intente de nuevo")
            } else {
                setName("");
                setLastname("");
                setMenu("");
                setEmail("");
                setLeader("");

                toast(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function getGuests() {
            setEmail("")
            setLeader("")
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
                method: "GET",
                credentials: "include"
            })

            if (response.ok) {
                const guests = await response.json() as Leader[];
                setLeadersList(guests);
            }
        }
        getGuests();
    }, [role])

    return (
        <div className="rounded-2xl p-2 bg-zinc-950">
            <div className="text-center">
                <Dialog>
                    <DialogTrigger className="text-xs text-gray-500">Como me inscribo?</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>¿Vas solo o con acompañantes?</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><strong>Si vas solo:</strong> completá tus datos y elegí “Voy por mi cuenta / Responsable del grupo”.</li>
                            <li><strong>Si vas con acompañantes:</strong> primero completá tus datos y elegí “Voy por mi cuenta / Responsable del grupo”.
                                Después, cada acompañante (o vos en su lugar) debe confirmar su asistencia eligiendo “Soy acompañante” y
                                seleccionando tu nombre como responsable.</li>
                            </ul>
                    </DialogContent>
                </Dialog>
            </div>

            <form action={submitAction} className="grid gap-8 p-5">
                <div className="grid gap-2">
                    <Label htmlFor="name" className="text-white">Nombre</Label>
                    <Input id="name" placeholder="Juan" className="bg-white" value={name} onChange={(e) => setName(e.target.value)} autoComplete="true" required />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="lastname" className="text-white">Apellido</Label>
                    <Input id="lastname" placeholder="Perez" className="bg-white" value={lastname} onChange={(e) => setLastname(e.target.value)} autoComplete="true" required />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="menu" className="text-white">Menú</Label>
                    <Select name="menu"  value={menu} onValueChange={(value) => setMenu(value)}>
                        <SelectTrigger id="menu" className="bg-white">
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

                <RadioGroup defaultValue="leader" name="role" className="grid gap-3">
                    <div className="flex gap-3">
                        <RadioGroupItem id="option-one" className="bg-white" value="leader" onClick={() => setRole("leader")} />
                        <Label htmlFor="option-one" className="text-white">Voy por mi cuenta / responsable de grupo</Label>
                    </div>

                    <div className="flex gap-3">
                        <RadioGroupItem id="option-two" className="bg-white" value="companion" onClick={() => setRole("companion")} />
                        <Label htmlFor='option-two' className="text-white">Soy acompañante</Label>
                    </div>
                </RadioGroup>


                {role == "companion" ?
                    <div className="grid gap-2">
                        <Label htmlFor="leader" className="text-white">Soy acompañante de</Label>
                        <Select value={leader} onValueChange={(value) => {setLeader(value)}} required>
                            <SelectTrigger id="leader" className="bg-white">
                                <SelectValue placeholder="Elegir" />
                            </SelectTrigger>
                            <SelectContent>
                                {leadersList.map(leader => (
                                    <SelectItem key={leader.id} value={leader.id.toString()}>{leader.lastname}, {leader.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                :
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-white">Correo electrónico</Label>
                        <Input type="email" id="email" className="bg-white" placeholder="juanperez@hotmail.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="true" required/>
                    </div>
                }
      
                <div className="text-center mt-5">
                    <Button type="submit" variant={"outline"}>Confirmar</Button>
                </div>
            </form>
        </div>
    );
}

export default SaveForm;