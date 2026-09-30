import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/products";

export default function CategoryTiles() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/shop?category=${c.slug}`}
          className="group relative block h-[70vh] min-h-[460px] overflow-hidden bg-mist md:h-[800px]"
        >
          <Image
            src={c.cover}
            alt={c.name}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover object-[center_30%] transition duration-[1400ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10 transition-colors duration-700 group-hover:bg-black/15" />
          <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12">
            <h2 className="text-[28px] leading-none font-extrabold tracking-[0.08em] text-white uppercase lg:text-[34px]">
              {c.name}
            </h2>
            <p className="mt-3 max-h-0 max-w-xs overflow-hidden text-sm text-white/85 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
              {c.blurb}
            </p>
            <span className="mt-4 inline-block border-b border-white pb-0.5 text-[11px] font-bold tracking-[0.3em] text-white uppercase">
              Shop now
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
