import { Suspense } from "react";
import Link from "next/link";
import { OrganicBg } from "@/components/brand/OrganicBg";
import { AuroraBg } from "@/components/brand/AuroraBg";
import { Logo } from "@/components/brand/Logo";
import { Realizadores } from "@/components/brand/Realizadores";
import { AuthPanel } from "@/components/auth/AuthPanel";

export const metadata = {
  title: "Portal · Agri Summit Brazil 2027",
};

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Brand side */}
      <aside className="relative hidden overflow-hidden bg-forest-950 lg:flex lg:flex-col lg:justify-between p-12">
        <AuroraBg />
        <OrganicBg variant="hero" />
        <div className="relative">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="relative max-w-md">
          <h2 className="font-display font-800 leading-tight tracking-tight text-[clamp(2rem,3.4vw,3rem)] text-cream">
            Onde a inovação encontra{" "}
            <span className="text-gold-gradient">aplicação real.</span>
          </h2>
          <p className="mt-4 text-cream/70">
            Acesse o portal para gerenciar sua inscrição, baixar materiais e acompanhar sua agenda
            de Rodadas de Negócio, gerada por algoritmo a partir do seu perfil.
          </p>
        </div>
        <div className="relative">
          <Realizadores label="Realização" />
        </div>
      </aside>

      {/* Form side — degradê discreto verde → azul, foco total no formulário */}
      <section className="relative flex items-center justify-center overflow-hidden bg-[linear-gradient(160deg,#0a4436_0%,#0b4550_55%,#0d4f5e_100%)] px-5 py-16">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(55% 40% at 88% 105%, rgba(217,177,90,0.08), transparent 70%)",
          }}
        />
        <div className="relative z-[2] w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <Suspense fallback={<div className="text-cream/60">Carregando…</div>}>
            <AuthPanel />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
