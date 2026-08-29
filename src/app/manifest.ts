import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Agri Summit Brazil 2027",
    short_name: "Agri Summit",
    description:
      "O agro que move o futuro. 15 a 17 de junho de 2027 · Royal Palm Hall, Campinas, SP. Portal de startups, investidores e rodadas de negócio.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#073a2c",
    theme_color: "#073a2c",
    lang: "pt-BR",
    categories: ["business", "productivity", "events"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Minha agenda de rodadas", url: "/portal/rodadas" },
      { name: "Agenda do evento", url: "/portal/agenda" },
    ],
  };
}
