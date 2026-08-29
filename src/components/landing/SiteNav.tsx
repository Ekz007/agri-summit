"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#rodadas", label: "Rodadas" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#programacao", label: "Programação" },
  { href: "#palestrantes", label: "Palestrantes" },
  { href: "#patrocinio", label: "Patrocínio" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-forest-950/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <Link href="/" aria-label="Agri Summit Brazil 2027">
          <Logo compact />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-cream/75 transition-colors hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/login" variant="ghost" size="sm">
            Entrar
          </ButtonLink>
          <ButtonLink href="/login?tab=inscricao" variant="primary" size="sm">
            Inscreva-se <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <button
          className="lg:hidden text-cream p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-forest-950/95 backdrop-blur-xl">
          <div className="flex flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-cream/80 hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex gap-3">
              <ButtonLink href="/login" variant="ghost" size="sm" className="flex-1">
                Entrar
              </ButtonLink>
              <ButtonLink href="/login?tab=inscricao" variant="primary" size="sm" className="flex-1">
                Inscreva-se
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
