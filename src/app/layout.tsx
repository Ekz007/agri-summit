import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Fonte variável: um arquivo cobre 400–700; títulos usam 500.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

// Só nos detalhes: eyebrows, rótulos de KPI, números de passos, horários.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agri Summit Brazil 2027 · Produzindo a inovação. Inovando a produção.",
  description:
    "O Brasil no centro da transformação global do agro. 15 a 17 de junho de 2027 · Royal Palm Hall, Campinas, SP. Realização CNA/SENAR, Sebrae e Juntos Pelo Agro.",
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
      "O agro que move o futuro. Startups encontram escala, investidores encontram futuro.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${instrument.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
