import { BanIcon, HomeIcon, NotebookIcon, Power, User } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
// import Link from "next/link"
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
                                    <a href="/">
                                        <HomeIcon />
                                    <span>Inicio</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/solicitar">
                                        <NotebookIcon />
                                    <span>Solicitar información</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/error">
                                        <BanIcon />
                                    <span>Reportar error</span>
                                    </a>
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
                                <a href="/admin">
                                    <User />
                                <span>Panel de administración</span>
                                </a>
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