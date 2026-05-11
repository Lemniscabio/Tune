'use client';

import { useState } from 'react';
import type { DeliverablesSection as DeliverablesSectionContent } from '@/content/schema';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';

type DeliverablesSectionProps = {
  section: DeliverablesSectionContent;
  id?: string;
};

export function DeliverablesSection({
  section,
  id = 'what-tune-delivers',
}: DeliverablesSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const hasActive = activeIndex !== null;

  return (
    <section id={id} className="bg-white">
      <div className="mx-auto max-w-[1320px] px-6 py-18 md:py-22">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
          <div>
            <Eyebrow className="border-blue-100 bg-[rgba(244,245,255,0.92)] text-blue-500 shadow-none backdrop-blur-0">
              {section.eyebrow}
            </Eyebrow>
            <h2 className="mt-7 max-w-[12ch] text-[clamp(2.5rem,4.4vw,4.55rem)] font-medium leading-[0.96] tracking-[-0.058em] text-ink-black">
              {section.headline}
            </h2>
            <p className="mt-7 max-w-[25ch] text-[18px] leading-[1.6] tracking-[-0.018em] text-[#50607D] md:text-[19px]">
              {section.intro}
            </p>

          </div>

          <div className="rounded-[30px] border border-line-hairline-cool bg-white p-4 shadow-[0_24px_70px_-46px_rgba(20,17,14,0.2)] md:p-5">
            <div
              className={`rounded-[999px] border border-dashed px-5 py-3.5 text-center transition-[border-color,background-color,box-shadow] duration-200 ease-out ${
                hasActive
                  ? 'border-blue-200 bg-[rgba(244,245,255,0.76)] shadow-[0_16px_30px_-24px_rgba(65,64,252,0.18)]'
                  : 'border-blue-100 bg-[rgba(244,245,255,0.58)]'
              }`}
            >
              <p className={`text-[19px] font-medium leading-[1.2] tracking-[-0.03em] transition-colors duration-200 ease-out md:text-[21px] ${hasActive ? 'text-blue-500' : 'text-blue-700'}`}>
                {section.packageLabel}
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {section.cards.map((card, index) => {
                const active = activeIndex === index;
                return (
                  <button
                    key={card.title}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onFocus={() => setActiveIndex(index)}
                    onBlur={() => setActiveIndex(null)}
                    onClick={() => setActiveIndex(index)}
                    className={`group flex h-full min-h-[390px] flex-col rounded-[28px] border bg-white px-5 py-5 text-left transition-[border-color,background-color,transform,box-shadow] duration-300 ease-out md:min-h-[450px] md:px-6 md:py-6 ${
                      active
                        ? 'border-blue-300 bg-[linear-gradient(180deg,rgba(243,245,255,0.9)_0%,rgba(255,255,255,0.98)_100%)] shadow-[0_24px_60px_-42px_rgba(65,64,252,0.18)]'
                        : hasActive
                          ? 'border-[rgba(205,205,254,0.66)] bg-white opacity-92 shadow-[0_18px_44px_-42px_rgba(20,17,14,0.1)]'
                          : 'border-[rgba(205,205,254,0.78)] bg-white shadow-[0_18px_44px_-42px_rgba(20,17,14,0.16)]'
                    }`}
                  >
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#050A1E] shadow-[0_20px_38px_-28px_rgba(5,10,30,0.78)] transition-[transform,box-shadow] duration-220 ease-out md:h-18 md:w-18 ${
                        active
                          ? 'scale-[1.03] shadow-[0_24px_42px_-26px_rgba(5,10,30,0.86)]'
                          : ''
                      }`}
                    >
                      <DeliverableIcon index={index} />
                    </div>

                    <h3 className="mt-7 max-w-[11ch] text-[20px] font-medium leading-[1.08] tracking-[-0.035em] text-[#060B23] md:text-[22px]">
                      {card.title}
                    </h3>

                    <p className="mt-5 text-[14px] leading-[1.58] tracking-[-0.012em] text-[#50607D] md:text-[15px]">
                      {card.body}
                    </p>

                    <div
                      className={`mt-auto overflow-hidden rounded-[26px] bg-white shadow-[0_16px_34px_-26px_rgba(20,17,14,0.18)] transition-all duration-300 ease-out ${
                        active
                          ? 'translate-y-0 scale-100 border border-[rgba(229,229,231,0.8)] px-4 py-4 opacity-100'
                          : 'pointer-events-none translate-y-3 scale-[0.98] border border-transparent px-4 py-0 opacity-0'
                      }`}
                    >
                      <p className="text-[13px] leading-[1.48] tracking-[-0.014em] text-[#3F4E6A] md:text-[14px]">
                        {card.hoverNote}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliverableIcon({ index }: { index: number }) {
  const common = {
    fill: 'none',
    stroke: 'white',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden>
        <rect x="6" y="4.5" width="12" height="15" rx="2" {...common} />
        <path d="M9 8.5h6" {...common} />
        <path d="M9 12l2 2 4-4" {...common} />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden>
        <path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 7 19V6A1.5 1.5 0 0 1 8.5 4.5Z" {...common} />
        <path d="M14 4.5V9h4.5" {...common} />
        <path d="M10 13h4" {...common} />
        <path d="M10 16.5h4" {...common} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden>
      <path d="M12 5.2 20 19H4L12 5.2Z" {...common} />
      <path d="M12 10v4.5" {...common} />
      <circle cx="12" cy="17.2" r="0.9" fill="white" />
    </svg>
  );
}
