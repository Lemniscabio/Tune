'use client';

import type { SprintCta as SprintCtaContent } from '@/content/schema';
import { CALENDLY_URL } from '@/content/shared.content';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';

type SprintCtaProps = {
  section: SprintCtaContent;
  product: 'tune' | 'thrust' | 'lemnisca';
  accent?: 'tune' | 'thrust' | 'lemnisca';
  id?: string;
};

export function SprintCta({ section, id = 'engagement-start' }: SprintCtaProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-white px-6 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="relative overflow-hidden rounded-[34px] border border-blue-300/30 shadow-[0_34px_90px_-52px_rgba(4,14,52,0.52)]">
          <div className="px-7 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: [
                'radial-gradient(ellipse 68% 50% at 20% 20%, rgba(65,64,252,0.38) 0%, transparent 72%)',
                'radial-gradient(ellipse 82% 58% at 86% 18%, rgba(12,35,173,0.42) 0%, transparent 72%)',
                'radial-gradient(ellipse 90% 56% at 50% 100%, rgba(2,8,38,0.96) 0%, rgba(3,8,44,0.82) 54%, transparent 88%)',
                'linear-gradient(180deg, #1B2943 0%, #143B9D 26%, #0E2FB4 46%, #091C84 68%, #050D34 100%)',
              ].join(', '),
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[180px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 46%, transparent 100%)',
            }}
          />
          <div
            aria-hidden
            className="blue-sheen-drift motion-safe:animate-[blue-sheen-drift_12s_ease-in-out_infinite] pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                'radial-gradient(circle at 26% 14%, rgba(205,205,254,0.2) 0%, transparent 32%)',
            }}
          />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
            <div>
              <Eyebrow className="border-white/14 bg-white/6 text-blue-100 shadow-none backdrop-blur-[10px]">
                Start with a 10-day Tune pilot
              </Eyebrow>

              <h2 className="mt-7 max-w-[11ch] text-[clamp(2.7rem,5vw,5rem)] font-medium leading-[0.96] tracking-[-0.058em] text-white">
                {section.headline}
              </h2>

              <div className="mt-7 max-w-[42rem] space-y-4">
                <p className="text-[18px] leading-[1.62] tracking-[-0.018em] text-blue-50 md:text-[20px]">
                  {section.body[0]}
                </p>
                <p className="text-[18px] leading-[1.56] tracking-[-0.018em] text-white md:text-[20px]">
                  {section.body[1]}
                </p>
              </div>
            </div>

            <div className="relative rounded-[28px] border border-white/10 bg-[rgba(17,25,59,0.4)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-5">
              <div
                aria-hidden
                className="pointer-events-none absolute left-[-20px] top-10 hidden h-[calc(100%-80px)] w-px bg-[linear-gradient(180deg,rgba(205,205,254,0)_0%,rgba(205,205,254,0.3)_18%,rgba(205,205,254,0.55)_50%,rgba(205,205,254,0.3)_82%,rgba(205,205,254,0)_100%)] lg:block"
              />
              <div className="space-y-3">
                {section.steps.map((step, index) => (
                  <div
                    key={step}
                    className="group flex items-center gap-4 rounded-[18px] border border-white/7 bg-[rgba(74,84,122,0.34)] px-4 py-4 transition-[background-color,border-color,transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:border-white/14 hover:bg-[rgba(83,94,138,0.42)] hover:shadow-[0_18px_36px_-28px_rgba(0,0,0,0.38)] md:px-5"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#FF6A1A_0%,#FF5A0A_100%)] text-[14px] font-semibold text-white shadow-[0_10px_24px_-16px_rgba(255,106,26,0.8)] transition-[transform,filter] duration-150 ease-out group-hover:scale-[1.05] group-hover:brightness-110">
                      {index + 1}
                    </span>
                    <p className="text-[17px] font-medium leading-[1.35] tracking-[-0.015em] text-white md:text-[18px]">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[30px] border border-[rgba(205,205,254,0.42)] bg-[linear-gradient(180deg,rgba(244,246,255,0.98)_0%,rgba(255,255,255,0.98)_100%)] px-6 py-7 shadow-[0_24px_58px_-42px_rgba(2,6,22,0.42)] md:px-7 md:py-8">
                <h3 className="max-w-[18ch] text-[clamp(1.45rem,1.7vw,2rem)] font-medium leading-[1.08] tracking-[-0.038em] text-[#060B23]">
                  {section.body[1]}
                </h3>
                <p className="mt-4 max-w-[40ch] text-[13px] leading-[1.56] tracking-[-0.012em] text-[#50607D] md:text-[14px]">
                  {section.body[2]}
                </p>

                <div className="mt-6">
                  <a
                    href={CALENDLY_URL}
                    className="inline-flex items-center rounded-full bg-blue-500 px-5 py-3 text-[14px] font-medium tracking-[-0.015em] text-white shadow-[0_18px_42px_-26px_rgba(65,64,252,0.54)] transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-blue-700 active:scale-[0.97]"
                  >
                    Request a Tune fit conversation
                    <span aria-hidden className="ml-3 text-[20px] leading-none">→</span>
                  </a>
                </div>

                <p className="mt-6 max-w-[42ch] text-[12px] leading-[1.5] tracking-[-0.01em] text-[#607295] md:text-[13px]">
                  We accept a limited number of Tune programs each quarter so the senior technical team can stay directly involved.
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
