import Link from "next/link";
import AddGuest from "@/components/add-guest";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Home = async () => {
    let leaders = [] as Guest[]
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-guests/leader`, {
            method: "GET",
            credentials: "include",
            cache: "no-store"
        })

        if (response.ok) {
            leaders = await response.json() as Guest[];
        }

    } catch (error) {
        console.log(error)
    }

    return (
        <>
            <div className="text-center mb-5">
                <Dialog>
                    <DialogTrigger className="text-sm">Por favor, lea las instrucciones haciendo click aquí</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>¿Vas solo o con acompañantes?</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><strong>Si vas solo:</strong> completá tus datos, elegí “Voy por mi cuenta / Responsable del grupo”, agregá una dirección de e-mail y confirmá.</li>
                            <li><strong>Si vas con acompañantes:</strong> Seguí exactamente los mismos pasos como si asistieras solo.
                                Luego, cada acompañante (o vos en su lugar) debe completar sus datos, elegir “Soy acompañante” y
                                seleccionar tu nombre como responsable de la lista.</li>
                            <li>Por último, puede verificar su inscripción en la seccion “Solicitar información”</li>
                            </ul>
                    </DialogContent>
                </Dialog>
            </div>

            <AddGuest leaders={leaders}/>
            <p className="text-xs text-center mt-5">Podés verificar tu inscripción <Link href={"/solicitar-informacion"} className="text-blue-500">aquí</Link></p>
        </>
    );
}

export default Home;