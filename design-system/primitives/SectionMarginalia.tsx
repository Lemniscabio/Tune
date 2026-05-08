import Link from 'next/link';
import type { SectionTocItem } from '@/content/schema';

type SectionMarginaliaProps = {
  items: readonly SectionTocItem[];
  activeNumber: string;
};

// Mono-typed mini-TOC. Active item set in ink-black; others in ink-ash.
// Visible only at md+ — collapses on mobile to keep the hero tight.
export function SectionMarginalia({ items, activeNumber }: SectionMarginaliaProps) {
  return (
    <nav aria-label="Page sections" className="hidden md:block">
      <p className="label-s text-ink-ash mb-6">— Sections</p>
      <ul className="space-y-3.5">
        {items.map((item) => {
          const isActive = item.number === activeNumber;
          return (
            <li key={item.number}>
              <Link
                href={item.anchor ?? `#${item.number}`}
                className={`mono-s tabular flex items-baseline gap-4 transition-colors duration-200 ${
                  isActive
                    ? 'text-ink-black'
                    : 'text-ink-ash hover:text-ink-graphite'
                }`}
              >
                <span className="w-6 shrink-0">{item.number}</span>
                <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
