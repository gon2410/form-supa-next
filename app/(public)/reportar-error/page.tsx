import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ReportError from "@/components/report-error";

const Page = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Atención</CardTitle>
                    <CardDescription>Para que el reporte de error sea enviado, es
                    obligatorio ingresar una dirección de email registrada, es decir, <b>la
                    misma que utilizó</b> usted personalmente o el responsable del grupo para
                    confirmar. De lo contrario, será ignorado.</CardDescription>
                </CardHeader>
            </Card>
            <ReportError />
        </>
    )
}

export default Page;