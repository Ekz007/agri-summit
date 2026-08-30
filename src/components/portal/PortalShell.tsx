"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Gift,
  CalendarDays,
  CalendarRange,
  UserCog,
  Settings2,
  ClipboardList,
  Eye,
  ShieldCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { OrganicBg } from "@/components/brand/OrganicBg";
import { cn } from "@/lib/utils";
import type { Profile, UserRole } from "@/lib/supabase/types";
import { signOut, toggleView } from "@/app/portal/actions";

const roleLabel: Record<UserRole, string> = {
  startup: "Startup",
  investidor: "Investidor",
  admin: "Administrador",
  staff: "Equipe",
};

export function PortalShell({
  profile,
  email,
  realRole,
  children,
}: {
  profile: Profile | null;
  email: string;
  realRole?: UserRole | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isAdmin = profile?.role === "admin" || profile?.role === "staff";
  const isRealAdmin = realRole === "admin" || realRole === "staff";
  const viewingAsUser = isRealAdmin && !isAdmin;

  const nav = [
    { href: "/portal", label: "Início", icon: LayoutDashboard, exact: true },
    { href: "/portal/agenda", label: "Agenda", icon: CalendarDays },
    { href: "/portal/arquivos", label: "Arquivos", icon: FolderOpen },
    { href: "/portal/beneficios", label: "Benefícios", icon: Gift },
    { href: "/portal/rodadas", label: "Rodadas", icon: CalendarRange },
    { href: "/portal/perfil", label: "Meu perfil", icon: UserCog },
    ...(isAdmin
      ? [
          { href: "/portal/admin", label: "Administração", icon: Settings2, exact: true },
          { href: "/portal/admin/inscricoes", label: "Inscrições", icon: ClipboardList },
        ]
      : []),
  ];

  const name = profile?.full_name || email.split("@")[0];

  const NavLinks = () => (
    <nav className="flex flex-col gap-2.5">
      {nav.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3.5 rounded-xl border-l-2 px-5 py-3.5 text-sm font-medium transition-colors",
              active
                ? "border-gold-400 bg-gold-500/10 text-cream"
                : "border-transparent text-cream/65 hover:bg-white/5 hover:text-cream"
            )}
          >
            <item.icon
              className={cn(
                "h-4.5 w-4.5",
                active ? "text-gold-400" : "text-sky-400/90"
              )}
            />
            <span className="u-gold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="portal-theme relative min-h-screen bg-forest-900 text-cream">
      {/* raízes nas cores do Brasil espalhadas pelo fundo */}
      <OrganicBg variant="brasil" className="fixed inset-0 opacity-[0.35]" />
      {/* Top bar (mobile) */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/15 bg-white/[0.06] px-4 py-3 backdrop-blur-2xl lg:hidden">
        <Link href="/portal">
          <Logo compact showYear={false} />
        </Link>
        <button onClick={() => setOpen((v) => !v)} className="p-2" aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1400px]">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 flex-col justify-between border-r border-white/15 bg-white/[0.06] p-5 backdrop-blur-2xl transition-transform lg:static lg:flex lg:translate-x-0",
            open ? "flex translate-x-0" : "hidden -translate-x-full lg:flex"
          )}
        >
          <div>
            <div className="mb-8 hidden lg:block">
              <Link href="/portal">
                <Logo />
              </Link>
            </div>
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <Logo compact />
              <button onClick={() => setOpen(false)} aria-label="Fechar">
                <X className="h-6 w-6" />
              </button>
            </div>
            <NavLinks />
          </div>

          <div className="mt-6">
            <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/20 font-display font-700 text-gold-400">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-cream">{name}</p>
                  <p className="truncate text-xs text-cream/50">
                    {profile ? roleLabel[profile.role] : email}
                  </p>
                </div>
              </div>
            </div>
            {isRealAdmin && (
              <form action={toggleView}>
                <button
                  type="submit"
                  className={cn(
                    "mb-1.5 flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-colors",
                    viewingAsUser
                      ? "border-gold-400/40 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20"
                      : "border-white/10 text-cream/70 hover:bg-white/5 hover:text-cream"
                  )}
                >
                  {viewingAsUser ? (
                    <ShieldCheck className="h-4.5 w-4.5 text-gold-400" />
                  ) : (
                    <Eye className="h-4.5 w-4.5 text-sky-400/90" />
                  )}
                  {viewingAsUser ? "Voltar à visão admin" : "Ver como participante"}
                </button>
              </form>
            )}
            <form action={signOut}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-cream/65 transition-colors hover:bg-white/5 hover:text-cream"
              >
                <LogOut className="h-4.5 w-4.5" /> Sair
              </button>
            </form>
          </div>
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Content */}
        <main className="min-w-0 flex-1 px-5 py-8 lg:px-10 lg:py-10 scroll-slim">
          {children}
        </main>
      </div>
    </div>
  );
}
