import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Table, TableCaption, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EditGuestDialog from "@/components/edit-guest-dialog";
import GroupMembersDialog from "@/components/group-members-dialog";
import Link from "next/link";
import Logout from "@/components/logout";

interface Guest {
    id: number;
    name: string;
    lastname: string;
    menu: string;
    companion_of: string;
}

interface Menu {
    menu_name: string;
    quantity: number;
}

const AdminPage = async () => {
    const allCookies = await cookies()
    const token = allCookies.get("auth-cookie");

    if (!token) {
        redirect("/login")
    }

    const all = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getall`, {
        headers: {
            cookie: token.value
        },
        cache: "no-store"
    })

    const guests = await all.json() as Guest[];


    const allLeaders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
        headers: {
            cookie: token.value
        },
        cache: "no-store"
    })

    const leaders = await allLeaders.json() as Guest[];

    const menus = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getnumbers`, {
        method: "GET"
    })

    const menusData = await menus.json() as Menu[];
    
    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-between">
                <Logout />
            </div>

            <div className="grid gap-2 md:flex p-3 border-b">
                <Table className="border">
                    <TableCaption>Cantidades</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {menusData.map((menu) => (
                            <TableRow key={menu.menu_name}>
                                <TableCell className="font-bold">{menu.menu_name}</TableCell>
                                <TableCell>{menu.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Table className="border">
                    <TableCaption>Todos los grupos</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Responsable</TableHead>
                        <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaders.map((guest, index) => (
                            <TableRow key={guest.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{guest.lastname}, {guest.name}</TableCell>
                                <TableCell>
                                    <GroupMembersDialog id={guest.id} guests={guests} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center p-3">
                <Table className="border">
                    <TableCaption>Todos los invitados</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Invitado</TableHead>
                        <TableHead>Menú</TableHead>
                        <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {guests.map((guest, index) => (
                            <TableRow key={guest.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{guest.lastname}, {guest.name}</TableCell>
                                <TableCell>{guest.menu}</TableCell>
                                <TableCell>
                                    <EditGuestDialog guestId={guest.id.toString()} guestName={guest.name} guestLastname={guest.lastname} guestMenu={guest.menu}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AdminPage;