import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import DeleteGroupDialog from "@/components/delete-group-dialog";
import GroupMembersDialog from "@/components/group-members-dialog";

interface Person {
    id: number;
    name: string;
    lastname: string;
    menu: string;
    companion_of: string;
    email: string;
    created_at: string;
}

const AdminPage = async () => {
    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser();

    if (error || !data.user) {
        redirect("/login");
    }

    const {data: allPersons, error: allPersonsError} = await supabase.from("person").select("*").eq("is_leader", true).order("lastname");
    const allPersonsList = allPersons as unknown as Person[];
    
    if (allPersonsError) {
        console.log(allPersonsError)
    }

    return (
        <div className="p-2">
            <h3 className="font-bold text-center mb-5">Panel de Administración</h3>
            <Table>
                <TableCaption>Listado de invitados que van por su cuenta o son responsables de un grupo</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Apellido</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Menú</TableHead>
                        <TableHead>Fecha de inscripción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allPersonsList.map((person) => {
                        const date = new Date(person.created_at);
                        const formatedDate = format(date, "d 'de' MMMM 'a las' HH:mm'hs'", { locale: es });
                        return (
                            <TableRow key={person.id}>
                                <TableCell className="flex gap-1.5">
                                    <GroupMembersDialog leader_id={person.id} name={person.name} lastname={person.lastname} />
                                    {/* <EditPersonDialog name={person.name} lastname={person.lastname} /> */}
                                    <DeleteGroupDialog name={person.name} lastname={person.lastname} />
                                </TableCell>
                                <TableCell>{person.lastname}</TableCell>
                                <TableCell>{person.name}</TableCell>
                                <TableCell>{person.menu}</TableCell>
                                <TableCell>{formatedDate}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminPage;