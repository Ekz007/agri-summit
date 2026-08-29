import Image from "next/image";
import { cn } from "@/lib/utils";

const logos = [
  { src: "/brand/logo-cna.png", alt: "CNA / SENAR", w: 238, h: 86 },
  { src: "/brand/logo-sebrae.png", alt: "SEBRAE", w: 171, h: 86 },
  { src: "/brand/logo-juntos.png", alt: "Juntos Pelo Agro", w: 81, h: 86 },
];

/** Real partner logos (CNA/SENAR · SEBRAE · Juntos Pelo Agro), keyed from the deck. */
export function Realizadores({
  className,
  label = "Realização",
  size = "md",
}: {
  className?: string;
  label?: string;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? 32 : 44;
  return (
    <div className={cn("my-6 flex flex-col items-center gap-5 px-6 py-2", className)}>
      {label && (
        <span className="text-[0.7rem] uppercase tracking-[0.35em] text-cream/50">
          {label}
        </span>
      )}
      <div
        className={cn(
          "flex flex-wrap items-center justify-center",
          size === "sm" ? "gap-x-10 gap-y-5" : "gap-x-14 gap-y-6"
        )}
      >
        {logos.map((l) => (
          <Image
            key={l.src}
            src={l.src}
            alt={l.alt}
            width={l.w}
            height={l.h}
            style={{ height: h, width: "auto" }}
            className="opacity-95"
          />
        ))}
      </div>
    </div>
  );
}
