import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CircleX, NotepadText, UserPen, UserRoundCheck } from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import IsConnected from "@/components/is-connected";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "RSVP - Confirmá tu asistencia fácilmente",
	description: "Una app web simple y moderna para gestionar confirmaciones de asistencia (RSVP) de forma eficiente.",
};


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
				<nav className="flex justify-between shadow p-4 bg-stone-900 border-b-black">
					<div>
						<h3 className="font-bold text-white"><Link href={"/"}>RSVP</Link></h3>
					</div>
					<IsConnected />
					<DropdownMenu>
						<DropdownMenuTrigger><Menu className="text-white" /></DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem><UserRoundCheck /><Link href={"/"}>Confirmar asistencia</Link></DropdownMenuItem>
							<DropdownMenuItem><NotepadText /><Link href={"/solicitar-informacion"}>Solicitar información</Link></DropdownMenuItem>
							<DropdownMenuItem><CircleX /><Link href={"/reportar-error "}>Reportar error</Link></DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem><UserPen /><Link href={"/admin"}>Area de administración</Link></DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</nav>
				<main>
					{children}
				</main>
				<Toaster />
			</body>
		</html>
	);
}
