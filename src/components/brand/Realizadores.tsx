import Image from "next/image";
import { cn } from "@/lib/utils";

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
  const h = size === "sm" ? 30 : 40;
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {label && (
        <span className="text-[0.7rem] uppercase tracking-[0.35em] text-cream/50">
          {label}
        </span>
      )}
      <Image
        src="/brand/logos-brancos.png"
        alt="CNA/SENAR, SEBRAE e Juntos Pelo Agro"
        width={585}
        height={132}
        style={{ height: h, width: "auto" }}
        className="opacity-95"
        priority={false}
      />
    </div>
  );
}
