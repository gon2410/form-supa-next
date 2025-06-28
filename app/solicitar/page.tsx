"use client";

import { TriangleAlert, User2Icon, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { infoRequest } from '@/app/actions';
import { useActionState } from "react";
const initialState = { error: undefined, success: undefined, groupList: undefined };

const page = () => {
    const [state, formAction] = useActionState(infoRequest, initialState);
    
    return (
        <div>
            <Card className="m-3 border-black">
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
                    <Card className="m-3 border-black">
                        <CardHeader>
                            <CardTitle>Información</CardTitle>
                            <CardDescription>Listado de persona o personas registrados</CardDescription>
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
                                        {state.groupList?.map((p) => (
                                            <TableRow key={p.id}>
                                                <TableCell><User /></TableCell>
                                                <TableCell>{p.lastname}</TableCell>
                                                <TableCell>{p.name}</TableCell>
                                                <TableCell>{p.menu}</TableCell>
                                            </TableRow>
                                        ))}
                                     
                                    </TableBody>
                                </Table>
                                <ul>
                               
                                </ul>
                            </CardContent>
                        </CardHeader>
                    </Card>
                )}
 

            </div>
        </div>
    )
}

export default page