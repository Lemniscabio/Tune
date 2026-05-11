import type { EngagementJourney as EngagementJourneyContent } from '@/content/schema';
import { CALENDLY_URL } from '@/content/shared.content';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { AccentUnderline } from '@/features/hero/AccentUnderline';

type EngagementSectionProps = {
  section: EngagementJourneyContent;
  id?: string;
};

export function EngagementSection({ section, id = 'engagement-journey' }: EngagementSectionProps) {
  return (
    <section id={id} className="relative overflow-hidden bg-white">
      {/* Transitional gradient strip */}
      <div
        className="px-6 py-10 md:px-8 md:py-12"
        style={{
          background:
            'linear-gradient(90deg, #050D34 0%, #03027A 35%, #091C84 60%, #1612B8 82%, #4140FC 100%)',
        }}
      >
        <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="max-w-[58ch]">
            <h3 className="text-[28px] font-medium leading-[1.15] tracking-[-0.028em] text-white md:text-[36px]">
              Preparing for{' '}
              <span className="border-b border-white/85 pb-0.5">pilot scale</span>?
            </h3>
            <p className="mt-3 text-[14px] leading-[1.55] tracking-[-0.01em] text-white/65 md:text-[15px]">
              See what your current data says about your path to pilot.
            </p>
          </div>
          <a
            href={CALENDLY_URL}
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-[#050D34] px-5 py-3 text-[14px] font-medium text-white transition-[background-color,transform] duration-150 ease-out hover:bg-[#0B1A4D] active:scale-[0.97] md:text-[15px]"
          >
            Request a Tune fit conversation
            <span aria-hidden className="text-[16px] leading-none">→</span>
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 pt-24 pb-16 md:pt-32 md:pb-20">
        <Eyebrow className="border-blue-100 bg-[rgba(244,245,255,0.92)] text-blue-500 shadow-none backdrop-blur-0">
          {section.eyebrow}
        </Eyebrow>

        <h2 className="mt-7 max-w-[18ch] text-[clamp(3rem,5.6vw,5.6rem)] font-medium leading-[1.08] tracking-[-0.062em] text-ink-black">
          Audit, model, optimize,{' '}
          <AccentUnderline delayMs={0}><span>deliver</span></AccentUnderline>.
        </h2>

        <p className="mt-10 max-w-[58ch] text-[20px] leading-[1.65] tracking-[-0.02em] text-ink-graphite md:text-[22px]">
          {section.intro}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {section.steps.map((step) => (
            <JourneyStepCard key={step.index} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneyStepCard({
  step,
}: {
  step: EngagementJourneyContent['steps'][number];
}) {
  return (
    <article className="group rounded-[28px] border border-line-hairline-cool bg-white px-7 py-7 shadow-[0_18px_44px_-38px_rgba(20,17,14,0.18)] transition-[transform,box-shadow,border-color] duration-180 ease-out hover:border-blue-100 hover:shadow-[0_24px_56px_-38px_rgba(65,64,252,0.16)] active:scale-[0.985] md:min-h-[260px] md:px-8 md:py-8">
      <div className="flex items-center justify-between gap-4">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-[18px] bg-[linear-gradient(180deg,#1B2640_0%,#17233B_100%)] text-[12px] font-medium tracking-[0.12em] text-white shadow-[0_16px_30px_-22px_rgba(27,38,64,0.42)]">
          STEP
        </div>
        <p className="mono-s text-blue-500" style={{ letterSpacing: '0.08em' }}>
          {step.index}
        </p>
      </div>

      <h3 className="mt-14 max-w-[16ch] text-[28px] font-medium leading-[1.06] tracking-[-0.04em] text-ink-black md:text-[30px]">
        {step.title}
      </h3>
      <p className="mt-5 max-w-[28ch] text-[16px] leading-[1.62] tracking-[-0.012em] text-ink-graphite">
        {step.body}
      </p>
    </article>
  );
}
