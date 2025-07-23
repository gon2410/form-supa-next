import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleX, Info, NotepadText, UserPen, UserRoundCheck } from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  	title: "form-supa-next",
  	description: "RSVP web app",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	let data = null;
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
		data = await response.json();
	} catch (error) {
		data = null;
		console.log("Todavia no hay conexión: ", error)
	}

	return (
			<html lang="en">
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<nav className="flex justify-around shadow p-4 mb-5">
						<div>
							<h3 className="font-bold"><Link href={"/"}>RSVP</Link></h3>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger><Menu /></DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem><UserRoundCheck /><Link href={"/"}>Confirmar asistencia</Link></DropdownMenuItem>
								<DropdownMenuItem><NotepadText /><Link href={"/solicitar-informacion"}>Solicitar información</Link></DropdownMenuItem>
								<DropdownMenuItem><CircleX /><Link href={"/reportar-error "}>Reportar error</Link></DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem><UserPen /><Link href={"/admin"}>Area de administración</Link></DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<div className="flex gap-1">
							{data ? <Badge variant="default" className="bg-green-600 ml-5">Conectado</Badge>
							:
							<Badge variant="destructive" className="ml-5">Conectando...</Badge>}
							<Tooltip>
								<TooltipTrigger><Info size={15}/></TooltipTrigger>
								<TooltipContent>
									<p>Es necesario esperar la conexión con el servidor. Puede demorar unos minutos.</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</nav>
					<main>
						{children}
					</main>
				</body>
			</html>
	);
}
