"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Guest {
    id: number;
    name: string;
    lastname: string;
    menu: string;
    companion_of: string;
    email: string;
    created_at: string;
}

const GuestsTable = async () => {
    const [guests, setGuests] = useState<Guest[]>([])

    const supabase = await createClient();
    const {data: allPersons, error: allPersonsError} = await supabase.from("person").select("*");
    
    if (allPersons !== null && allPersons.length > 0) {
        setGuests((prev) => [...prev, ...allPersons])
    }

    if (allPersonsError) {
        console.log(allPersonsError)
    }
    return (
        <div>
            {guests.map((person) => {
                const date = new Date(person.created_at);
                const formatedDate = format(date, "d 'de' MMMM 'a las' HH:mm'hs'", { locale: es });
                return (
                    <li key={person.id}>
                        {person.name}
                        {person.lastname}
                    </li>
                );
            })}
        </div>

    )
}

export default GuestsTable;