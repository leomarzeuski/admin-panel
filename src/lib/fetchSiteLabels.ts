export async function fetchSiteLabels() {
    const res = await fetch("https://api.itfolkstech.com/api/site-ui-label?populate=*");
    if (!res.ok) throw new Error("Erro ao buscar labels do Strapi");
    const json = await res.json();
    return json.data; // ou .data.attributes, se quiser só o objeto de campos
}
