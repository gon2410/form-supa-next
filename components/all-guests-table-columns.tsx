"use client";

import { ColumnDef } from "@tanstack/react-table"
import EditGuestDialog from "@/components/edit-guest-dialog";
import DeleteGuestDialog from "@/components/delete-guest-dialog"

export const guestsColumns: ColumnDef<Guest>[] = [
    {
        accessorKey: "lastname",
        header: "Apellido",
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const guest = row.original
            return (
                <div className="flex gap-3">
                    <EditGuestDialog guestId={guest.id.toString()} guestName={guest.name} guestLastname={guest.lastname} />
                    <DeleteGuestDialog id={guest.id} name={guest.name} lastname={guest.lastname} />
                </div>
            )
        },
    },
]