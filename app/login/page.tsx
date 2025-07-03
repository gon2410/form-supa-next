import { login } from "./actions"; 
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card>
                <CardContent>
                    <CardHeader className="mb-5">
                        <CardTitle className="text-center">Ingresar</CardTitle>
                    </CardHeader>
                    <form action={login} className="grid gap-4">
                        <Label htmlFor="email">Email:</Label>
                        <Input id="email" name="email" type="email" defaultValue="admin@gmail.com" />
                        <Label htmlFor="password">Contraseña:</Label>
                        <Input id="password" name="password" type="password" required />
                        <Button type="submit">Ingresar</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}