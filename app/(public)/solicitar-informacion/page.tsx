import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RequestInfo from "@/components/request-info";

const Page = () => {
    return (
        <>
            <Card className="mb-5">
                <CardHeader>
                    <CardTitle>Atención</CardTitle>
                    <CardDescription>Aquí puede solicitar informacion sobre su inscripción. Para que
                    sea procesada, es obligatorio ingresar una dirección de email registrada, es decir, <b>la
                    misma que utilizó</b> usted personalmente o el responsable del grupo para
                    confirmar. De lo contrario, la solicitud será ignorada.</CardDescription>
                </CardHeader>
            </Card>
            <RequestInfo />
        </>
    )
}

export default Page;