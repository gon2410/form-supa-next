"use client";

import { ColumnDef } from "@tanstack/react-table";
import ErrorViewDialog from "./error-view-dialog";

export type Error = {
    id: number
    name: string
    lastname: string
    description: string
}

export const errorsColumns: ColumnDef<Error>[] = [
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
            const error = row.original
            return (
                <ErrorViewDialog name={error.name} lastname={error.lastname} description={error.description} />
            )
        },
    },
]