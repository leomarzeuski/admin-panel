import { SearchForm } from "@/components/SearchForm";
import { fetchSiteLabels } from "@/lib/fetchSiteLabels";
import { fetchAgentItFolksContent } from "@/lib/fetchAgentItFolksContent";

export default async function AgentePage() {
    // Busca os textos globais do Strapi
    const labels = await fetchSiteLabels();
    // Busca o conteúdo dinâmico do agente
    const apiData = await fetchAgentItFolksContent();

    // Aqui montamos o objeto de conteúdo do agente
    const agentContent = apiData?.AgentITFolksContent?.[0]
        ? {
            ...apiData.AgentITFolksContent[0],
            quickExample: apiData.quickExample || [],
            comoFunciona: apiData.comoFunciona,
        }
        : null;

    // Título principal e subtítulo vindos do Strapi
    const mainTitle = labels?.headerTitle?.trim() || "Agentes DealerSpace";
    const subTitle = agentContent?.subITFolks || labels?.siteSubtitle || "";

    return (
        <div className="flex-1 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50/30 via-white to-blue-50/30 dark:from-gray-950/30 dark:via-gray-900 dark:to-blue-950/30">
            <div className="container mx-auto px-4 py-8 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        {mainTitle}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {subTitle}
                    </p>
                </div>
                {/* Fallback se não vier nada da API */}
                {agentContent ? (
                    <SearchForm agentContent={agentContent} />
                ) : (
                    <div className="text-center text-red-500">
                        Conteúdo do agente não disponível. Verifique se o conteúdo está publicado no Strapi.
                    </div>
                )}
            </div>
        </div>
    );
}
