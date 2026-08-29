import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agri Summit Brazil 2027 — Produzindo a inovação. Inovando a produção.",
  description:
    "A plataforma que conecta startups, investidores, indústria e ciência do agronegócio. 02 a 04 de março de 2027 · Centro de Eventos Anhembi, São Paulo. Realização CNA/SENAR, Sebrae e Juntos Pelo Agro.",
  keywords: [
    "Agri Summit Brazil",
    "agronegócio",
    "startups agtech",
    "investidores",
    "CNA",
    "SENAR",
    "Sebrae",
  ],
  openGraph: {
    title: "Agri Summit Brazil 2027",
    description:
      "Onde a inovação encontra aplicação real. Startups encontram escala, investidores encontram futuro.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
