"use client";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface Props {
    id: number;
    name: string;
    lastname: string;
}

const DeleteGuestDialog = ({id, name, lastname}: Props) => {
    const router = useRouter();

    const submitAction = async() => {
        const response = await fetch("/api/delete", {
            method: "POST",
            credentials: "include",
            headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify({
                id: id,
            }),
        })
        
        const data = await response.json();

        if (response.ok) {
            toast(data)
            router.refresh();
        } else {
            toast(data.detail)
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger><Trash size={15}/></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Esta seguro que desea eliminar a {name} {lastname}?</AlertDialogTitle>
                <AlertDialogDescription>
                    <b>CUIDADO! El invitado será borrado de forma permanente.</b>
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <form action={submitAction}>
                    <Button type="submit" className="bg-destructive">Eliminar</Button>
                </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteGuestDialog;