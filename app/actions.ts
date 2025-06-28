"use server";

import { supabase } from "@/lib/supabase/client";

type ActionState = {
  error?: string;
  success?: string;
  groupList?: Person[];
}

interface Person {
    id: number;
    name: string;
    lastname: string;
    menu: string
    created_at: string;
    is_leader: boolean;
}

export async function savePerson(prevState: ActionState, formData: FormData): Promise<ActionState> {

    const name = formData.get("name") as string;
	const lastname = formData.get("lastname") as string;
    const menu = formData.get("menu") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const leaderId = formData.get("leader_id") as string;

    // check if that person already exists 
    const { data, error } = await supabase.from('person').select('id').ilike('name', name).ilike('lastname', lastname);

    if (data?.length != 0) {
        return {error: name + " " + lastname + " ya está registrado"}
    } else if (error) {
        return {error: "Algo salió mal."}
    }
    
    if (role == 'leader') {
        //save leader
        const { error: leaderError} = await supabase.from('person').insert([{ name: name, lastname: lastname, menu: menu, email: email, is_leader: true }])
        if (leaderError) {
            return {error: "Algo salió mal."}
        }
    } else {
        // save companion
        const { error: companionError } = await supabase.from('person').insert([{ name: name, lastname: lastname, menu: menu, is_leader: false, companion_of: leaderId }])
        if (companionError) {
            return {error: "Algo salió mal."}
        }
    }

    return {success: "¡Confirmado! En la sección 'Solicitar información' podés verificar tu inscripción y la de tus acompañantes, si los hay."}
};

export async function infoRequest(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const email = formData.get("email") as string;

    const {data} = await supabase.from("person").select("*").eq("email", email).single();

    if (data === null || data === undefined) {
        return {error: "No pudimos encontrar esa dirección de e-mail."}
    }

    const leader = data as Person;

    const {data: companions} = await supabase.from("person").select("*").eq("companion_of", data.id);

    const groupList = [leader];
    
    if (companions?.length != 0) {
        companions?.map((companion) => (
            groupList.push(companion)
        ));
    }

    return {success: "success", groupList}
}


export async function editPerson(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const name = formData.get("name") as string;
    console.log("Nombre recibido: ", name);

    if (name == "admin") {
        return {error: "El nombre ya está en uso."}
    }

    return {success: "¡Actualizado!"}
};