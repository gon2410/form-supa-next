import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Table, TableCaption, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Logout from "@/components/logout";
import { guestsColumns } from "../../components/all-guests-table-columns";
import { GuestsDataTable } from "../../components/all-guests-data-table";
import { leadersColumns } from "@/components/all-leaders-table-columns";
import { LeadersDataTable } from "@/components/all-leaders-data-table";
import { errorsColumns, Error } from "@/components/errors-table-columns";
import { ErrorDataTable } from "@/components/errors-data-table";

const AdminPage = async () => {
    const allCookies = await cookies()
    const token = allCookies.get("auth-cookie");

    if (!token) {
        redirect("/login")
    }

    const all = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-guests/all`, {
        headers: {
            cookie: token.value
        },
        cache: "no-store"
    })

    const guests = await all.json() as Guest[];

    const allLeaders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-guests/leader`, {
        headers: {
            cookie: token.value
        },
        cache: "no-store"
    })

    const leaders = await allLeaders.json() as Guest[];

    const getStatistics = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-statistics`, {
        method: "GET"
    })

    const stats = await getStatistics.json() as Stat[];
    

    const getErrors = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-errors`, {
        method: "GET"
    })

    const errors = await getErrors.json() as Error[];

    return (
        <div>
            <div className="flex justify-end">
                <Logout />
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:justify-evenly">
                <div className="container bg-white p-2 rounded-md">
                    <p className="text-2xl font-semibold m-3">Hola, Administrador</p>
                </div>
                <div className="container bg-white p-2 rounded-md">
                    <p className="font-semibold px-3 py-1">Numero de invitados</p>
                    <Table className="border rounded-md">
                    <TableCaption></TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Cantidad</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stats.map((stat) => (
                                <TableRow key={stat.name}>
                                    <TableCell>{stat.name}</TableCell>
                                    <TableCell>{stat.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <br />

            <div className="flex flex-col md:flex-row gap-2 md:justify-evenly">
                <div className="container">
                    <LeadersDataTable columns={leadersColumns} data={leaders} />
                </div>
                <div className="container">
                    <GuestsDataTable columns={guestsColumns} data={guests} />
                </div>
            </div>
            <br />
            <div className="flex flex-col md:flex-row gap-2 md:justify-evenly">
                <div className="container">
                    <ErrorDataTable columns={errorsColumns} data={errors}/>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;