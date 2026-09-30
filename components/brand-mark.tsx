import Image from "next/image";
import Reveal from "./reveal";

export default function BrandMark() {
  return (
    <section className="dot-grid overflow-hidden bg-white py-24 lg:py-32">
      <Reveal className="mx-auto flex max-w-[1440px] flex-col items-center px-4">
        <p className="flex items-center gap-6 text-[11px] font-bold tracking-[0.45em] text-muted uppercase">
          <span className="h-px w-16 bg-black/15" /> Archive 2026 <span className="h-px w-16 bg-black/15" />
        </p>
        <h2 className="sr-only">Eleganto — Different is Beautiful</h2>
        <div className="relative mt-10 aspect-[720/210] w-full max-w-[760px] mix-blend-multiply">
          <Image src="/images/logo-wordmark.jpg" alt="Eleganto — Different is Beautiful" fill sizes="(min-width: 800px) 760px, 100vw" className="object-contain" />
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-x-7 gap-y-3 text-[11px] font-bold tracking-[0.3em] text-neutral-600 uppercase">
          <span>Oversized Streetwear</span>
          <span className="text-black/20">/</span>
          <span>Different is Beautiful</span>
          <span className="text-black/20">/</span>
          <span className="text-muted">Acid Wash Series</span>
        </div>
      </Reveal>
    </section>
  );
}
