"use client";

import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

    const [selectMenu, setSelectMenu] = useState("Elegir");
    const [selectLeader, setSelectLeader] = useState("Elegir");

    useEffect(() => {
        async function fetchPersons() {
            const { data: persons} = await supabase.from("person").select("id, name, lastname").is('is_leader', true);
            setPersonArray(persons as Person[])
        }
        fetchPersons();
    }, [role])

    useEffect(() => {
        if (state?.success) {
            setSelectMenu("Elegir");
            setSelectLeader("Elegir");
        } else {
            setSelectMenu("Elegir");
            setSelectLeader("Elegir");
        }
      
    }, [state])

    return (
        <div className='h-full p-3'>
            <h3 className='text-center font-bold mb-5'>Confirmar asistencia</h3>
            <form action={formAction}>
                <div className='grid gap-5'>
                    <div className="flex gap-1.5">
                        <Label htmlFor='name'>Nombre</Label>
                        <Input id='name' name='name' placeholder='Juan' autoComplete='true' required />
                    </div>
                    <div className='flex gap-1.5'>
                        <Label htmlFor='lastname'>Apellido</Label>
                        <Input id='lastname' name='lastname' placeholder='Perez' autoComplete='true' required />

                    </div>
                    <div className='flex gap-5.5'>
                        <Label htmlFor='menu'>Menú</Label>
                        <Select name='menu'>
                            <SelectTrigger className="w-[19rem]" id='menu'>
                                <SelectValue placeholder={selectMenu} />
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
                                <Label htmlFor='option-two'>Acompaño a otra persona</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className='flex gap-4.5'>
                        <Label htmlFor='email' className='w-[3.1rem]'>E-mail</Label>
                        <Input type='email' id='email' name='email' placeholder='juanperez@hotmail.com' autoComplete='true' required disabled={role != "leader"} />
                    </div>

                    <div className='flex gap-3'>
                        <Label htmlFor='leader' className='w-[8.2rem]'>Soy acompañante de</Label>
                        <Select name='leader_id' disabled={role != "companion"} required>
                            <SelectTrigger id='leader' className="w-[13.5rem]">
                                <SelectValue placeholder={selectLeader} />
                            </SelectTrigger>
                            <SelectContent>
                                {personArray.map(person => (
                                    <SelectItem key={person.id} value={person.id.toString()}>{person.lastname}, {person.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className='text-center mt-5'>
                    <Button type='submit' className="bg-green-600 hover:bg-green-700">Confirmar</Button>

                    {state.error && <p className="text-red-600 mt-5 text-center">{state.error}</p>}
                    {state.success && <p className="text-green-600 mt-5 text-center">{state.success}</p>}
                </div>
            </form>
        </div>
    );
}

export default SaveForm;