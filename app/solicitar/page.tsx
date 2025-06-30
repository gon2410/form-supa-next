"use client";

import { TriangleAlert, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { infoRequest } from '@/app/actions';
import { useActionState } from "react";
const initialState = { error: undefined, success: undefined, groupList: undefined };

const RequestInfo = () => {
    const [state, formAction] = useActionState(infoRequest, initialState);
    
    return (
        <div className="max-w-xl p-5">
            <Card className="border-black">
                <CardHeader>
                    <CardTitle className="flex gap-5"><TriangleAlert />ATENCIÓN</CardTitle>
                    <CardDescription>Para que la solicitud de información sea procesada, es
                    obligatorio ingresar una dirección de email registrada, es decir, <strong>la
                    misma que utilizó</strong> usted personalmente o el responsable del grupo para
                    confirmar. De lo contrario, la solicitud será ignorada.</CardDescription>
                </CardHeader>
            </Card>

            <form action={formAction} className="grid gap-2 justify-center mt-10">
                <div className="grid gap-2">
                    <Label htmlFor="email">Direccion de e-mail</Label>
                    <Input type="email" id="email" name="email" required/>
                </div>
                <div className="grid justify-center">
                    <Button type="submit" variant={"outline"}>Obtener</Button>
                </div>
            </form>
            <div>
                {state.error && (
                    <p className="text-red-600 mt-5 text-center">{state.error}</p>
                )}

                {state.success && (
                    <>
                        <Card className="border-black">
                        <CardHeader>
                            <CardTitle>Información</CardTitle>
                            <CardDescription>Listado de persona o personas registradas</CardDescription>
                            <CardContent>
                                <Table>
                                    <TableCaption>Miembro o miembros del grupo</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead></TableHead>
                                            <TableHead>Apellido</TableHead>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Menú</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {state.groupList?.map((person) => (
                                            <TableRow key={person.id}>
                                                <TableCell><User /></TableCell>
                                                <TableCell>{person.lastname}</TableCell>
                                                <TableCell>{person.name}</TableCell>
                                                <TableCell>{person.menu}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </CardHeader>
                        </Card>
                    </>
                )}
            </div>
        </div>
    )
}

export default RequestInfo;