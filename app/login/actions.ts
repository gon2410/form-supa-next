"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    console.log(data)
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/admin')
}


export async function signOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut()
    if (error) {
        redirect("/error")
    }

    redirect("/login")
}