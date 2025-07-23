"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

// Aqui fica a lógica do formulário
function ResetPasswordConfirmPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get("code") || "";
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!password || !passwordConfirm) {
            setError("Preencha os dois campos de senha.");
            return;
        }
        if (password !== passwordConfirm) {
            setError("As senhas não conferem.");
            return;
        }

        setIsLoading(true);
        try {
            // AJUSTE AQUI para usar a URL do Strapi
            const res = await fetch("https://api.itfolkstech.com/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, password, passwordConfirmation: passwordConfirm }),
            });
            const data = await res.json();
            if (!res.ok || data.error) throw new Error(data.error?.message || "Erro ao redefinir senha");
            setSuccess(true);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || "Erro ao redefinir senha, solicite um novo link.");
            } else {
                setError("Erro ao redefinir senha, solicite um novo link.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="p-8">
                    <CardHeader className="flex flex-col items-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                        <CardTitle>Senha redefinida!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center mb-4">Sua senha foi alterada com sucesso. Agora você pode fazer login normalmente.</p>
                        <Button onClick={() => router.push("/login")} className="w-full">Fazer login</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="p-8 w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-xl text-center">Redefinir senha</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleReset} className="space-y-4">
                        <div>
                            <Label htmlFor="password">Nova senha</Label>
                            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="passwordConfirm">Confirme a nova senha</Label>
                            <Input id="passwordConfirm" type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} required />
                        </div>
                        {error && <div className="text-red-500">{error}</div>}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Salvando..." : "Redefinir Senha"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

// O page.tsx EXPORTA o componente dentro de <Suspense>
export default function Page() {
    return (
        <Suspense>
            <ResetPasswordConfirmPage />
        </Suspense>
    );
}
