import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

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

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen`}>
				<SidebarProvider>
					<AppSidebar />
					<div className="grid grid-cols-[auto] w-full">
						<main className="flex flex-col h-screen overflow-auto">
							<SidebarTrigger />

							{children}
						</main>
					</div>
				</SidebarProvider>
			</body>
		</html>
	);
}
