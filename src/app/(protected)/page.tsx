// src/app/page.tsx
import { fetchSiteLabels } from "@/lib/fetchSiteLabels";

export default async function Home() {
    const labels = await fetchSiteLabels();

    const welcomeTitle = labels?.welcomeTitle || "Bem-vindo ao Dealer Space";
    const welcomeSubtitle =
        labels?.welcomeSubtitle ||
        "Selecione uma ferramenta no menu lateral para começar.";

    return (
        <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50/30 via-white to-blue-50/30 dark:from-gray-950/30 dark:via-gray-900 dark:to-blue-950/30">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {welcomeTitle}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {welcomeSubtitle}
                </p>
            </div>
        </div>
    );
}
