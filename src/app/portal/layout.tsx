import { requireProfile } from "@/lib/auth";
import { PortalShell } from "@/components/portal/PortalShell";

export const metadata = { title: "Portal · Agri Summit Brazil 2027" };

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, email } = await requireProfile();
  return (
    <PortalShell profile={profile} email={email}>
      {children}
    </PortalShell>
  );
}
