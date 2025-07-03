"use server";

import { createClient } from "@/lib/supabase/client";

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

const menuOptions = ["sin_condicion", "vegetariano", "vegano", "celiaco"];
const roleOptions = ["leader", "companion"]

export async function savePerson(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = createClient();
    // making sure everything submitted is correct. The html inputs are required but just in case.
    const name = formData.get("name");
    if (typeof name !== "string" || name.trim() === "") {
        return {error: "Necesitamos un nombre válido."};
    }

    const lastname = formData.get("lastname");
    if (typeof lastname !== "string" || lastname.trim() === "") {
        return {error: "Necesitamos un apellido válido."};
    }

    const menu = formData.get("menu");
    if (typeof menu !== "string" || menu.trim() === "" || !menuOptions.includes(menu)) {
        return {error: "Necesitamos un menú válido."};
    }

    const role = formData.get("role");
    if (typeof role !== "string" || role.trim() === "" || !roleOptions.includes(role)) {
        return {error: "Necesitamos un rol válido."};
    }


    // check if that person already exists by name and lastname
    const { data: foundPerson, error: personError } = await supabase.from('person').select('id').ilike('name', name).ilike('lastname', lastname);

    // if something goes wrong trying find the person
    if (personError) {
        return {error: "Algo salió mal. Intente de nuevo."}
    }

    // if the person is already registered
    if (foundPerson && foundPerson.length > 0) {
        return {error: name + " " + lastname + " ya está registrado."}
    }

    // if the role is leader, verify email and save it in DB with is_leader:true    
    if (role === "leader") {
        const email = formData.get("email");

        if (typeof email !== "string" || email.trim() === "") {
            return {error: "Necesitamos un email válido."};
        }

        const {data: leader, error: leaderEmailError} = await supabase.from("person").select("*").eq("email", email);

        // if something goes wrong
        if (leaderEmailError) {
            return {error: "Algo salió mal. Intente de nuevo."}
        }

        // if the email submitted is already registered
        if (leader && leader.length > 0) {
            return {error: "Ya existe un invitado registrado con ese e-mail. Quizás está intentando registrar a un acompañante."}
        }

        // send it
        const { error: leaderError} = await supabase.from('person').insert([{ name: name, lastname: lastname, menu: menu, email: email, is_leader: true }])
        
        // if something goes wrong
        if (leaderError) {
            return {error: "Algo salió mal. Intente de nuevo."}
        }

    // if it's not a leader, it's a companion, so verfiy leaderID and save it in DB with is_leader:false and with companion_of:leaderId
    } else {
        const leaderId = formData.get("leader_id");

        if (typeof leaderId !== "string" || leaderId.trim() === "") {
            return {error: "Necesitamos un id de líder válido."};
        }
        const { error: companionError } = await supabase.from('person').insert([{ name: name, lastname: lastname, menu: menu, is_leader: false, companion_of: leaderId }])
        
        // if something goes wrong
        if (companionError) {
            return {error: "Algo salió mal. Intente de nuevo."}
        }
    }

    // send it
    return {success: "¡Confirmado " + name + "! En la sección 'Solicitar información' (arriba a la izquierda) podés verificar tu inscripción y la de tus acompañantes, si los hay."}
};

// function to retrieve person or group of persons related with an email. It corresponds with the "Solicitar información" page.
export async function infoRequest(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = createClient();

    // retrieving email submitted
    const email = formData.get("email");

    // if email is not type string or empty. The html input is required but just in case.
    if (typeof email !== "string" || email.trim() === "") {
        return {error: "Necesitamos un email válido."}
    }

    // retrieving leader (person) with that email
    const {data: leader, error: leaderError} = await supabase.from("person").select("*").eq("email", email).single<Person>();
    
    // if something goes wrong trying to retrieve leader
    if (leaderError) {
        return {error: "No pudimos encontrar esa dirección de e-mail."}
    }
    
    // if the leader is not registered
    if (leader === null || leader === undefined) {
        return {error: "No pudimos encontrar esa dirección de e-mail."}
    }

    // create array and add leader to send to the frontend
    const groupList = [leader];

    // retrieving companions (person or group of persons) of founded leader
    const {data: companions, error:companionsError} = await supabase.from("person").select("*").eq("companion_of", leader.id);

    // if something goes wrong trying to retrieve companions
    if (companionsError) {
        return {error: "Algo salió mal. Intente de nuevo."}
    }
    
    // if there are companions, add them to the array
    if (companions && companions.length > 0) {
        groupList.push(...companions)
    }

    // send it
    return {success: "success", groupList}
}


