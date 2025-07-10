"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";

interface Guest {
    id: number;
    name: string;
    lastname: string;
    menu: string;
}

const AdminPage = () => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<null | boolean>(null);
    const [guests, setGuests] = useState<Guest[]>([]);

    useEffect(() => {
        async function checkIsAdmin() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/status`, {
                credentials: "include",
            })

            if (response.ok) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        }
        checkIsAdmin();
    }, []);

    useEffect(() => {
        if (isAdmin === false) {
            router.push("/login");
        }
    }, [isAdmin, router]);
   
    useEffect(() => {
        async function getGuests() {
            if (isAdmin === true) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getall`, {
                    credentials: "include"
                });

                if (response.ok) {
                    const guests = await response.json() as Guest[];
                    if (guests) {
                        setGuests(guests)
                    }
                }
            }
        }

        getGuests();
    }, [isAdmin])

    const logout = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        })
        
        if (response.ok) {
            setIsAdmin(false)
            router.push("/admin");
        } 
    }

    return (
        <div className="flex flex-col justify-center">
            <h3 className="font-bold text-center mb-5">Panel de Administración</h3>
                {isAdmin ?
                    <div className="flex justify-center">
                        <form action={logout}>
                            <Button type="submit" variant={"outline"} className="flex border-red-500 w-[15rem]">Cerrar sesión<Power /></Button>
                        </form>
                    </div>
                :
                    <p></p>
                }
            <div className="max-w-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Invitado</TableHead>
                        <TableHead>Menú</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {guests.map((guest, index) => (
                            <TableRow key={guest.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{guest.lastname}, {guest.name}</TableCell>
                                <TableCell>{guest.menu}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AdminPage;