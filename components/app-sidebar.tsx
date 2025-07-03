import { BanIcon, HomeIcon, NotebookIcon, Power, User } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import Link from "next/link"
import { signOut } from "@/app/login/actions"
import { createClient } from "@/lib/supabase/server";
import { Button } from "./ui/button";

export async function AppSidebar() {
    const supabase = await createClient();
    const {data} = await supabase.auth.getUser();

    return (
        <Sidebar>
            <SidebarContent className="list-none">
                <SidebarGroup>
                    <SidebarGroupLabel>Invitados</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/">
                                        <HomeIcon />
                                    <span>Inicio</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/solicitar">
                                        <NotebookIcon />
                                    <span>Solicitar información</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/error">
                                        <BanIcon />
                                    <span>Reportar error</span>
                                    </Link>
                                </SidebarMenuButton>
                                </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Administrador</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/admin">
                                    <User />
                                <span>Panel de administración</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {data.user ?
                    <div className="flex justify-center">
                        <form action={signOut}>
                            <Button type="submit" variant={"outline"} className="flex border-red-500 w-[15rem]">Cerrar sesión<Power /></Button>
                        </form>
                    </div>
                :
                    <p></p>
                }
            </SidebarFooter>
        </Sidebar>
    )
}