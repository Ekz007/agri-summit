import { PageHeader } from "@/components/portal/ui";
import { EventMap } from "@/components/portal/EventMap";

export const metadata = { title: "Mapa do Evento · Agri Summit Brazil 2027" };

export default function MapaPage() {
  return (
    <div>
      <PageHeader
        title="Mapa do Evento"
        subtitle="Royal Palm Hall · Campinas, SP. Toque numa área da legenda para localizar no mapa."
      />
      <EventMap />
    </div>
  );
}
