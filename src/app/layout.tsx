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
    <html lang="pt-BR" className={`${sora.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
