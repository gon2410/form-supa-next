import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[url('/fondo.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="mx-auto max-w-[50rem] p-2">
                {children}
            </div>
        </div>
    );
}