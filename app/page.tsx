"use client";

import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const [leadersList, setLeadersList] = useState<Leader[]>([]);

    const submitAction = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add`, {
                method: "POST",
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
                setName("");
                setLastname("");
                setMenu("");
                setRole("leader");
                setEmail("");
                setLeader("");

                setSuccess("");
                setError(data.detail || "Algo salió mal. Intente de nuevo")
            } else {
                setName("");
                setLastname("");
                setMenu("");
                setRole("leader");
                setEmail("");
                setLeader("");
                setError("")
                setSuccess(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function getGuests() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
                method: "GET"
            })

            if (response.ok) {
                const guests = await response.json() as Leader[];
                setLeadersList(guests)
            }
        }
        getGuests();
    }, [role])

    return (
        <div className='h-full flex flex-col'>
            <h3 className='text-center font-bold'>Confirmar asistencia</h3>
            <Dialog>
                <DialogTrigger className="font-bold text-xs text-gray-500 underline mb-15">Como me inscribo?</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Como me inscribo?</DialogTitle>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><strong>Si asiste solo:</strong> complete los campos y elija la opción <u>Voy por mi cuenta / responsable de grupo</u>.</li>
                        <li><strong>Si asiste con acompañantes:</strong> primero confirme su asistencia eligiendo la opción <u>Voy por mi cuenta
                        / responsable de grupo</u>. Luego, cada acompañante (o usted mismo en su nombre) debe confirmar su asistencia eligiendo
                        la opción <u>Soy acompañante</u> y seleccionando su nombre como responsable de grupo.</li>
                        </ul>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <form action={submitAction}>
                <div className='grid gap-5 p-5'>
                    <div className="grid gap-2">
                        <Label htmlFor='name'>Nombre</Label>
                        <Input id='name' placeholder='Juan' value={name} onChange={(e) => setName(e.target.value)} autoComplete='true' required />
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='lastname'>Apellido</Label>
                        <Input id='lastname' placeholder='Perez' value={lastname} onChange={(e) => setLastname(e.target.value)} autoComplete='true' required />
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='menu'>Menú</Label>
                        <Select name='menu' value={menu} onValueChange={(value) => setMenu(value)}>
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

                    <div className='grid gap-3'>
                        <RadioGroup defaultValue='leader' name='role' className='flex flex-col justify-center items-center'>
                            <div className='flex gap-3'>
                                <RadioGroupItem id="option-one" value="leader" onClick={() => setRole("leader")} />
                                <Label htmlFor='option-one'>Voy por mi cuenta / responsable de grupo</Label>
                            </div>

                            <div className='flex gap-3'>
                                <RadioGroupItem id="option-two" value="companion" onClick={() => setRole("companion")} />
                                <Label htmlFor='option-two'>Soy acompañante / soy miembro de grupo</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='email'>Correo electrónico</Label>
                        <Input type='email' id='email' placeholder='juanperez@hotmail.com' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='true' required disabled={role != "leader"} />
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='leader'>Soy acompañante de</Label>
                        <Select value={leader} onValueChange={(value) => {setLeader(value)}} disabled={role !== "companion"} required>
                            <SelectTrigger id='leader'>
                                <SelectValue placeholder="Elegir" />
                            </SelectTrigger>
                            <SelectContent>
                                {leadersList.map(leader => (
                                    <SelectItem key={leader.id} value={leader.id.toString()}>{leader.lastname}, {leader.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className='text-center mt-10'>
                    <Button type='submit' variant={"default"}>Confirmar</Button>

                    {error && <p className="text-red-600 mt-5 text-center">{error}</p>}
                    {success && <p className="text-green-600 mt-5 text-center">{success}</p>}
                </div>
            </form>
        </div>
    );
}

export default SaveForm;