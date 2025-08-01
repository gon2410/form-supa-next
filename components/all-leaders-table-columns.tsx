"use client";

import { ColumnDef } from "@tanstack/react-table"
import GroupMembersDialog from "./group-members-dialog";

export type Guest = {
    id: number
    name: string
    lastname: string
}

export const leadersColumns: ColumnDef<Guest>[] = [
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
                <GroupMembersDialog id={guest.id} />
            )
        },
    },
]