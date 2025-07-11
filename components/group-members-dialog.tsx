import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
    id: number;
    guests: Guest[]
}

interface Guest {
    id: number;
    name: string;
    lastname: string;
    menu: string;
    companion_of: string;
}

const GroupMembersDialog = async ({id, guests}:Props) => {
    let members = []
    for (let i=0; i < guests.length; i++) {
        const element = guests[i];
        if (element.companion_of == id.toString() || element.id == id) {
            members.push(element)
        }
    }

    return (
        <Dialog>
            <DialogTrigger>+</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Grupo de invitado</DialogTitle>
                <DialogDescription>Lista de miembros del grupo</DialogDescription>
                    <Table className="border">
                        <TableHeader>
                            <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Miembro</TableHead>
                            <TableHead>Menú</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member, index) => (
                                <TableRow key={member.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{member.lastname}, {member.name}</TableCell>
                                    <TableCell>{member.menu}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default GroupMembersDialog;