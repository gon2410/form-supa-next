import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen bg-[url('/fondo.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="mx-auto max-w-[50rem] p-1">
                <div className="rounded-2xl p-4 bg-white">
                    {children}
                </div>
            </div>
        </div>
    );
}