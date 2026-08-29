import { FileText, Download, FolderOpen, Star, Video, LinkIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card, EmptyState, Badge } from "@/components/portal/ui";
import type { Arquivo } from "@/lib/supabase/types";

const typeIcon: Record<string, React.ElementType> = {
  pdf: FileText,
  doc: FileText,
  video: Video,
  link: LinkIcon,
};

export default async function ArquivosPage() {
  const supabase = await createClient();
  const { data: arquivos } = await supabase
    .from("arquivos")
    .select("*")
    .order("destaque", { ascending: false })
    .order("created_at", { ascending: false });

  const list = (arquivos ?? []) as Arquivo[];
  const categorias = Array.from(new Set(list.map((a) => a.categoria || "geral")));

  return (
    <div>
      <PageHeader
        title="Arquivos"
        subtitle="Materiais, guias e documentos oficiais do Agri Summit Brazil 2027."
      />

      {list.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="Nenhum arquivo por aqui ainda"
          body="Os materiais oficiais (guia das rodadas, apresentações e regulamentos) aparecem aqui assim que forem publicados pela organização."
        />
      ) : (
        <div className="space-y-10">
          {categorias.map((cat) => (
            <section key={cat}>
              <h2 className="mb-4 font-display font-700 text-lg capitalize text-cream">{cat}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list
                  .filter((a) => (a.categoria || "geral") === cat)
                  .map((a) => {
                    const Icon = typeIcon[a.tipo ?? "pdf"] ?? FileText;
                    return (
                      <Card key={a.id} className="flex flex-col">
                        <div className="flex items-start justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/15">
                            <Icon className="h-5 w-5 text-green-400" />
                          </div>
                          {a.destaque && (
                            <Badge tone="gold">
                              <Star className="h-3 w-3" /> Destaque
                            </Badge>
                          )}
                        </div>
                        <h3 className="mt-4 font-display font-700 text-cream">{a.titulo}</h3>
                        {a.descricao && (
                          <p className="mt-1.5 flex-1 text-sm text-cream/60">{a.descricao}</p>
                        )}
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wide text-cream/40">
                            {a.tipo || "arquivo"} {a.tamanho ? `· ${a.tamanho}` : ""}
                          </span>
                          <a
                            href={a.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3.5 py-1.5 text-sm font-medium text-cream transition-colors hover:bg-green-500/20 hover:text-green-200"
                          >
                            <Download className="h-4 w-4" /> Abrir
                          </a>
                        </div>
                      </Card>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
