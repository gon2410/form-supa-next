"use client";

import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { savePerson } from '@/app/actions';
import { useActionState, useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { supabase } from '@/lib/supabase/client';

const initialState = { error: undefined, success: undefined };

interface Person {
    id: number;
    name: string;
    lastname: string;
}

const SaveForm = () => {
    const [role, setRol] = useState("leader");
    const [state, formAction] = useActionState(savePerson, initialState);
    const [personArray, setPersonArray] = useState<Person[]>([]);

    useEffect(() => {
        async function fetchPersons() {
            const { data: persons} = await supabase.from("person").select("id, name, lastname").is('is_leader', true);
            setPersonArray(persons as Person[])
        }
        fetchPersons();
    }, [role])

    return (
        <div className='h-full max-w-xl mt-1 p-5'>
            <h3 className='text-center font-bold'>Confirmar asistencia</h3>
            <div className="text-center mb-5">
                <Dialog>
                    <DialogTrigger className="font-bold text-xs text-gray-500 underline">Como me inscribo?</DialogTrigger>
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
            </div>

            <form action={formAction}>
                <div className='grid gap-5'>
                    <div className="grid gap-2">
                        <Label htmlFor='name'>Nombre</Label>
                        <Input id='name' name='name' placeholder='Juan' autoComplete='true' required />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='lastname'>Apellido</Label>
                        <Input id='lastname' name='lastname' placeholder='Perez' autoComplete='true' required />

                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='menu'>Menú</Label>
                        <Select name='menu'>
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
                                <RadioGroupItem id="option-one" value="leader" onClick={() => setRol("leader")} />
                                <Label htmlFor='option-one'>Voy por mi cuenta / responsable de grupo</Label>
                            </div>

                            <div className='flex gap-3'>
                                <RadioGroupItem id="option-two" value="companion" onClick={() => setRol("companion")} />
                                <Label htmlFor='option-two'>Soy acompañante / soy miembro de grupo</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='email'>Correo electrónico</Label>
                        <Input type='email' id='email' name='email' placeholder='juanperez@hotmail.com' autoComplete='true' required disabled={role != "leader"} />
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='leader'>Soy acompañante de</Label>
                        <Select name='leader_id' disabled={role != "companion"} required>
                            <SelectTrigger id='leader'>
                                <SelectValue placeholder="Elegir" />
                            </SelectTrigger>
                            <SelectContent>
                                {personArray.map(person => (
                                    <SelectItem key={person.id} value={person.id.toString()}>{person.lastname}, {person.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className='text-center mt-10'>
                    <Button type='submit' variant={"default"}>Confirmar</Button>

                    {state.error && <p className="text-red-600 mt-5 text-center">{state.error}</p>}
                    {state.success && <p className="text-green-600 mt-5 text-center">{state.success}</p>}
                </div>
            </form>
        </div>
    );
}

export default SaveForm;