import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
type Person = {
    name: string;
    lastname:string;
}

const EditPersonDialog = ({ name, lastname }: Person) => {
    return (
        <Dialog>
            <DialogTrigger><Edit size={15}/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Editar invitado</DialogTitle>
                <DialogDescription>
                    Vas a editar los datos de {lastname}, {name}.
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EditPersonDialog;