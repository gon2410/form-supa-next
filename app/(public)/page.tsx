import Link from "next/link";
import AddGuest from "@/components/add-guest";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Home = async () => {
    let leaders = [] as Guest[]
    let connected = false
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
            method: "GET",
            credentials: "include"
        })

        if (response.ok) {
            leaders = await response.json() as Guest[];
            connected = true;
        }

    } catch (error) {
        console.log("No pudimos obtener líderes.")
    }

    return (
        <>
            <div className="text-center mb-5">
                {connected ? <p className="text-xs text-green-500">Conectado</p> : <p className="text-xs text-destructive">Desconectado</p>}
                <Dialog>
                    <DialogTrigger className="text-sm text-destructive">Por favor, lea las instrucciones haciendo click aquí</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>¿Vas solo o con acompañantes?</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><strong>Si vas solo:</strong> completá tus datos y elegí “Voy por mi cuenta / Responsable del grupo”.</li>
                            <li><strong>Si vas con acompañantes:</strong> primero completá tus datos y elegí “Voy por mi cuenta / Responsable del grupo”.
                                Después, cada acompañante (o vos en su lugar) debe confirmar su asistencia eligiendo “Soy acompañante” y
                                seleccionando tu nombre como responsable.</li>
                            </ul>
                    </DialogContent>
                </Dialog>
            </div>

            <AddGuest leaders={leaders}/>
            <p className="text-white text-xs text-center mt-5">Podés verificar tu inscripción <Link href={"/solicitar-informacion"} className="text-blue-500">aquí</Link></p>
        </>
    );
}

export default Home;