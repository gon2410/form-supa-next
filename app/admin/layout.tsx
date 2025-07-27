import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto max-w-[80rem]">
            {children}
        </div>
    );
}