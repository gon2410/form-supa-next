import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Props {
    name: string;
    lastname: string;
    description: string
}

const ErrorViewDialog = ({name, lastname, description}: Props) => {
    return (
        <Dialog>
            <DialogTrigger>Ver</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Reporte de {lastname}, {name}</DialogTitle>
                <DialogDescription>Descripción</DialogDescription>
                <p>{description}</p>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ErrorViewDialog