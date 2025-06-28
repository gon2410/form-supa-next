import { BanIcon, HomeIcon, NotebookIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"


export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Opciones</SidebarGroupLabel>
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
            </SidebarContent>
        </Sidebar>
    )
}