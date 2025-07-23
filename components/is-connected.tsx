"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const IsConnected = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const getConnection = async() => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
            
            if (response.ok) {
                setIsConnected(true)
            }
        }
        getConnection();
    }, [])

    return (
        <div className="flex gap-1">
            {isConnected ? <Badge variant="default" className="bg-green-600 ml-5">Conectado</Badge>
            :
            <Badge variant="destructive" className="ml-5">Conectando...</Badge>}
            <Tooltip>
                <TooltipTrigger><Info size={15}/></TooltipTrigger>
                <TooltipContent>
                    <p>Es necesario esperar la conexión con el servidor. Puede demorar unos minutos.</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}

export default IsConnected;