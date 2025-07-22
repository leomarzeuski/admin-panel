"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DealerLogo } from "@/components/DealerLogo";
import { ModeToggle } from "@/components/ThemeToggle";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/protected";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === "admin@exemplo.com" && password === "admin123") {
        document.cookie = "auth-token=mock-jwt-token; path=/; max-age=86400";
        router.push(redirect);
      } else {
        alert("Credenciais inválidas. Use admin@exemplo.com / admin123");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      {/* Header com Theme Toggle */}
      <div className="flex justify-end p-4">
        <ModeToggle />
      </div>

      {/* Container Principal */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo e Título */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <DealerLogo width={240} height={80} />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Bem-vindo de volta
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Faça login para acessar o painel administrativo
              </p>
            </div>
          </div>

          {/* Card de Login */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center font-semibold">
                Entrar na sua conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Campo Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                {/* Campo Senha */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Link Esqueci a Senha */}
                <div className="flex justify-end">
                  <Link
                    href="/reset-password"
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>

                {/* Botão de Login */}
                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Entrando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Entrar</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>

              <Separator className="my-4" />

              {/* Credenciais de Teste */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Credenciais de teste
                  </p>
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                  <p>
                    <strong>Email:</strong> admin@exemplo.com
                  </p>
                  <p>
                    <strong>Senha:</strong> admin123
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            © 2024 DealerSpace. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
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
                Bem-vindo de volta
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Carregando...
              </p>
            </div>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoginForm />
    </Suspense>
  );
}
