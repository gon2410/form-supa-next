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
            </SidebarContent>
        </Sidebar>
    )
}