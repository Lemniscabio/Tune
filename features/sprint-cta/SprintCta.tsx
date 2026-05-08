'use client';

// §04 — Start. Atmospheric return to deep blue (bookends the hero).
// The conversion moment: 3-step "what happens next" indicator + intake form
// styled for dark ground, yellow submit pill closes the loop.

import type { SprintCta as SprintCtaContent } from '@/content/schema';
import { CALENDLY_URL } from '@/content/shared.content';
import { Button } from '@/design-system/primitives/Button';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';

type SprintCtaProps = {
  section: SprintCtaContent;
  product: 'tune' | 'thrust' | 'lemnisca';
  accent?: 'tune' | 'thrust' | 'lemnisca';
  id?: string;
};

const STEPS = [
  { label: 'Share one program', detail: 'Strain, scale, and the decision in front of you.' },
  { label: '10-day Tune sprint', detail: 'Variance, assay, leverage analysis.' },
  { label: 'Walkdown with your team', detail: 'Technical report + paid-fit verdict.' },
];

export function SprintCta({ section, id = 'engagement-start' }: SprintCtaProps) {
  return (
    <section
      id={id}
      className="relative isolate overflow-hidden"
      style={{
        // Inverted hero distribution: luminous pale-blue at the top, cobalt
        // through the middle, and near-black navy at the bottom.
        backgroundImage: [
          'radial-gradient(ellipse 90% 58% at 50% 20%, rgba(42,132,235,0.54) 0%, rgba(18,70,203,0.34) 38%, transparent 72%)',
          'radial-gradient(ellipse 70% 60% at 18% 50%, rgba(8,43,143,0.58) 0%, transparent 70%)',
          'radial-gradient(ellipse 82% 46% at 62% 110%, rgba(2,4,28,0.98) 0%, rgba(4,10,55,0.74) 50%, transparent 76%)',
          'linear-gradient(180deg, #FFFFFF 0%, #F4FAFF 8%, #DCEEFF 18%, #9FCBF3 31%, #236BDF 48%, #0B2CB8 62%, #061663 76%, #03082A 90%, #020414 100%)',
        ].join(', '),
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.92) 18%, rgba(236,247,255,0.64) 42%, rgba(159,207,248,0.16) 76%, transparent 100%)',
        }}
      />
      <div className="relative mx-auto max-w-[1200px] px-6 pt-24 pb-32 md:pt-32 md:pb-40">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow className="border-white/18 bg-white/8 text-blue-100">
              Section {section.number} · Engagement · Start
            </Eyebrow>
            <h2 className="display-section mt-6 max-w-[20ch] text-white">
              {section.headline}
            </h2>
            <div className="mt-8 max-w-[58ch] space-y-5">
              {section.body.map((para, i) => (
                <p key={i} className="body-l text-blue-100">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* What happens next — 3-step indicator */}
        <div className="mt-16 md:mt-20">
          <p className="mono-s text-blue-200" style={{ letterSpacing: '0.08em' }}>
            WHAT HAPPENS NEXT
          </p>
          <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {STEPS.map((step, i) => (
              <li
                key={step.label}
                className="rounded-md border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm"
              >
                <div className="flex items-baseline gap-3">
                  <span aria-hidden className="block h-px w-6 bg-white/30" />
                  <span className="mono-s tabular text-blue-200">
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-3 text-[15px] font-medium text-white">{step.label}</p>
                <p className="body-s mt-2 text-blue-100">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Apply CTA — opens Calendly booking */}
        <div className="mt-16 md:mt-20">
          <Button href={CALENDLY_URL} variant="pill">
            Apply
          </Button>
        </div>
      </div>
    </section>
  );
}
