import EditGuestDialog from "./edit-guest-dialog";
import DeleteGuestDialog from "./delete-guest-dialog";
import GroupMembersDialog from "./group-members-dialog";
import { Button } from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
    guests: Guest[];
    leaders: Guest[];
}

export function GuestsDataTable({guests, leaders}: Props) {
    return (
        <div className="bg-white rounded-md p-2">
            <p className="font-semibold px-3 py-1">Listado de todos los invitados</p>
            <p className="text-xs px-3 py-1"></p>
            <div className="overflow-auto rounded-md border min-h-[26rem] max-h-[26rem]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Apellido</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {guests.length ? (
                        guests.map((guest, index) => (
                            <TableRow key={guest.id}>
                                <TableCell className="flex gap-1">{index + 1} {guest.is_leader ?
                                    <Tooltip>
                                    <TooltipTrigger>&#128081;</TooltipTrigger>
                                    <TooltipContent>
                                        <p>Va por su cuenta o es responsable de grupo.</p>
                                    </TooltipContent>
                                    </Tooltip>
                                    :
                                    <></>}
                                </TableCell>
                                <TableCell>{guest.lastname}</TableCell>
                                <TableCell>{guest.name}</TableCell>
                                <TableCell className="flex gap-3">
                                    <EditGuestDialog guestId={guest.id.toString()} guestName={guest.name} guestLastname={guest.lastname} guestCompanionOf={guest.companion_of?.toString()} leaders={leaders} />
                                    <DeleteGuestDialog id={guest.id} name={guest.name} lastname={guest.lastname} />
                                    {guest.is_leader ? <GroupMembersDialog id={guest.id} name={guest.name} lastname={guest.lastname} guests={guests} /> : <></>}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell className="h-24 text-center">
                            No hay invitados
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-start space-x-2 pt-2">
                <a href={`${process.env.NEXT_PUBLIC_API_URL}/download-pdf`} rel="noopener noreferrer">
                    <Button variant="outline" size="sm">Descargar PDF</Button>
                </a>
            </div>
        </div>
    )
}