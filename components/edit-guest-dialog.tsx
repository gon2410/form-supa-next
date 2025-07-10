"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";
import { updateGuest } from "@/app/actions";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const initialState = { error: undefined, success: undefined };

interface Props {
    guest_id: number;
    name: string;
    lastname:string;
    menu: string;
}

const EditGuestDialog = ({ guest_id, name, lastname, menu }: Props) => {
    const [state, formAction] = useActionState(updateGuest, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            router.refresh();
        }
    }, [state.success])


    return (
        <Dialog>
            <DialogTrigger><Edit size={15}/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Editar invitado</DialogTitle>
                <DialogDescription>Vas a editar los datos de {name} {lastname}.</DialogDescription>
                    <form action={formAction} className="grid gap-5 mt-5">
                        <Input name="guest_id" defaultValue={guest_id} hidden/>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" name="name" defaultValue={name}/>
                        </div>
                        
                        <div className="grid gap-2">
                            <Label htmlFor="lastname">Apellido</Label>
                            <Input id="lastname" name="lastname" defaultValue={lastname} />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor='menu'>Menú</Label>
                            <Select name='menu' defaultValue={menu} >
                                <SelectTrigger id='menu'>
                                    <SelectValue placeholder={menu} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sin_condicion">Sin Condición</SelectItem>
                                    <SelectItem value="vegetariano">Vegetariano</SelectItem>
                                    <SelectItem value="vegano">Vegano</SelectItem>
                                    <SelectItem value="celiaco">Celiaco</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-4 justify-center">
                            <Button type="submit">Guardar</Button>

                            {state.error && <p className="text-red-600 mt-5 text-center">{state.error}</p>}
                            {state.success && <p className="text-green-600 mt-5 text-center">{state.success}</p>}
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EditGuestDialog;