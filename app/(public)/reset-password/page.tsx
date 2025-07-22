"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DealerLogo } from "@/components/DealerLogo";
import { ModeToggle } from "@/components/ThemeToggle";
import { Mail, ArrowLeft, CheckCircle, Send } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsEmailSent(true);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      alert("Erro ao enviar email de redefinição");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
        <div className="flex justify-end p-4">
          <ModeToggle />
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="flex justify-center">
                <DealerLogo width={240} height={80} />
              </div>
            </div>

            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-center">
              <CardHeader className="space-y-4 pb-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Email enviado com sucesso!
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Enviamos as instruções para redefinir sua senha para o email:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {email}
                  </p>
                </div>

                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    Verifique sua caixa de entrada e siga as instruções do email
                    para redefinir sua senha.
                  </p>
                  <p>
                    Não recebeu o email? Verifique sua pasta de spam ou solicite
                    um novo envio.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => setIsEmailSent(false)}
                    variant="outline"
                    className="w-full"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Reenviar email
                  </Button>

                  <Link href="/login">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar para o login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              © 2024 DealerSpace. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      <div className="flex justify-end p-4">
        <ModeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <DealerLogo width={240} height={80} />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Redefinir senha
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Digite seu email para receber as instruções de redefinição
              </p>
            </div>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center font-semibold">
                Esqueceu sua senha?
              </CardTitle>
              <CardDescription className="text-center text-sm">
                Não se preocupe, isso acontece. Digite seu email abaixo e
                enviaremos as instruções para redefinir sua senha.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Digite seu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Enviar instruções</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center pt-4">
                <Link
                  href="/login"
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors inline-flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Voltar para o login
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Precisa de ajuda?
              </p>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Se você continuar tendo problemas para acessar sua conta, entre em
              contato com o suporte em{" "}
              <span className="font-medium">suporte@dealerspace.com</span>
            </p>
          </div>

          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            © 2024 DealerSpace. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}
