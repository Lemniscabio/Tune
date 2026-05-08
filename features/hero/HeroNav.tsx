'use client';

// Tune-specific top nav. Lives inside the hero atmosphere — transparent ground,
// light text against the deep blue field. No hard chrome separator.
//
// On scroll past the hero, the nav becomes a thin sticky bar with a subtle blur
// so it remains usable as the user moves through subsequent sections without
// breaking the atmospheric continuity at the top of the page.

import Link from 'next/link';
import { useEffect, useState } from 'react';

type HeroNavProps = {
  brand: string;
  brandSuffix?: string;
  items: ReadonlyArray<{ label: string; href: string }>;
};

export function HeroNav({ brand, brandSuffix, items }: HeroNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,box-shadow] duration-300 ${
        scrolled
          ? 'bg-white/72 backdrop-blur-xl shadow-[0_18px_54px_-38px_rgba(3,8,42,0.32)]'
          : 'bg-transparent shadow-none'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-10 lg:px-14">
        <Link
          href="/"
          className="group inline-flex items-baseline gap-2.5 transition-opacity duration-200 hover:opacity-85"
        >
          <span
            className={`text-[30px] leading-none font-semibold tracking-[-0.02em] transition-colors duration-300 ${
              scrolled ? 'text-blue-900' : 'text-white'
            }`}
          >
            {brand}
          </span>
          {brandSuffix && (
            <span
              className={`text-[12px] font-medium tracking-[0.02em] transition-colors duration-300 ${
                scrolled ? 'text-blue-900/70' : 'text-white'
              }`}
            >
              {brandSuffix}
            </span>
          )}
        </Link>
        <nav className="flex items-center gap-7">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative text-[14px] transition-colors duration-200 ${
                scrolled ? 'text-blue-900 hover:text-blue-700' : 'text-white hover:text-white/85'
              }`}
            >
              <span>{item.label}</span>
              <span
                aria-hidden
                className={`absolute -bottom-1 left-0 h-px w-0 transition-[width] duration-200 ease-out group-hover:w-full ${
                  scrolled ? 'bg-blue-900/70' : 'bg-white'
                }`}
              />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
