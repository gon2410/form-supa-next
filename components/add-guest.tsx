"use client";

import { useState } from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
    leaders: Guest[];
}

const AddGuest = ({leaders}: Props) => {
    const router = useRouter();

    const formRef = useRef<HTMLFormElement>(null);
    const [name, setName] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [role, setRole] = useState<string>("leader");
    const [email, setEmail] = useState<string>("");
    const [leader, setLeader] = useState<string>("");

    const [open, setOpen] = useState<boolean>(false);

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
                setEmail("");
                setLeader("");
                toast(data);
            }

            router.refresh();
        } catch (error) {
            console.log(error)
            toast("Algo salió mal.")
        }
    }

    return (
        <form action={submitAction} ref={formRef} className="grid gap-8">
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Juan" value={name} onChange={(e) => setName(e.target.value)} autoComplete="true" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="lastname" >Apellido</Label>
                <Input id="lastname" placeholder="Perez" value={lastname} onChange={(e) => setLastname(e.target.value)} autoComplete="true" required />
            </div>

            <RadioGroup defaultValue="leader" name="role" className="grid gap-3">
                <div className="flex gap-3">
                    <RadioGroupItem id="option-one" value="leader" onClick={() => setRole("leader")} />
                    <Label htmlFor="option-one">Voy por mi cuenta / responsable de grupo</Label>
                </div>

                <div className="flex gap-3">
                    <RadioGroupItem id="option-two" value="companion" onClick={() => setRole("companion")} />
                    <Label htmlFor="option-two">Soy acompañante</Label>
                </div>
            </RadioGroup>

            {role == "companion" ?
                <div className="grid gap-2">
                    <Label htmlFor="leader">Soy acompañante de</Label>
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
                <div className="grid gap-2">
                    <Label htmlFor="email" >Correo electrónico</Label>
                    <Input type="email" id="email" placeholder="juanperez@hotmail.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="true" required/>
                </div>
            }
    
            <div className="text-center mt-5">
                <AlertDialog open={open}>
                    <AlertDialogTrigger asChild><Button variant={"outline"} onClick={() => setOpen(true)}>Confirmar</Button></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Esta seguro que desea confirmar?</AlertDialogTitle>
                        <AlertDialogDescription>Los datos ingresados son correctos?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpen(false)}>Cancelar</AlertDialogCancel>
                            <Button variant="default" onClick={() => {formRef.current?.requestSubmit(); setOpen(false);}}>
                                Sí, confirmar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </form>
    )
}

export default AddGuest;