import type { ProblemSection } from '@/content/schema';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';

type ProblemAtStageProps = {
  section: ProblemSection;
  accent?: 'tune' | 'thrust' | 'lemnisca';
};

const DESKTOP_LAYOUT = [
  'lg:col-span-5 lg:row-span-2',
  'lg:col-span-4',
  'lg:col-span-3',
  'lg:col-span-7',
] as const;

export function ProblemAtStage({ section }: ProblemAtStageProps) {
  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-[1240px] px-6 pt-24 pb-32 md:px-10 md:pt-32 md:pb-40 lg:px-14">
        <div className="max-w-[1040px]">
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <h2 className="display-section mt-5 max-w-[14ch] text-ink-black md:max-w-none">
            {section.headline}
          </h2>
          <p className="body-xl mt-8 max-w-[60ch] text-ink-graphite/82">
            {section.lead}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {section.items.map((item, index) => (
            <ProblemBentoCard
              key={item.index}
              title={item.title}
              body={item.body}
              punchline={item.punchline}
              tone={index === 0 ? 'anchor' : index === 3 ? 'consequence' : 'default'}
              className={DESKTOP_LAYOUT[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemBentoCard({
  title,
  body,
  punchline,
  tone,
  className,
}: {
  title: string;
  body: string;
  punchline?: string;
  tone: 'anchor' | 'default' | 'consequence';
  className?: string;
}) {
  const cardClass =
    tone === 'anchor'
      ? 'border-blue-100 bg-[linear-gradient(180deg,rgba(239,239,255,0.86)_0%,rgba(255,255,255,1)_62%)] shadow-[0_28px_84px_-60px_rgba(3,2,122,0.3)]'
      : tone === 'consequence'
        ? 'border-line-hairline-cool bg-neutral-50/72 shadow-[0_20px_64px_-56px_rgba(20,17,14,0.32)]'
        : 'border-line-hairline-cool bg-white shadow-[0_20px_64px_-58px_rgba(20,17,14,0.24)]';

  const titleClass =
    tone === 'anchor'
      ? 'max-w-[10ch] text-[clamp(2rem,4vw,3rem)] leading-[0.98] tracking-[-0.045em]'
      : tone === 'consequence'
        ? 'max-w-[26ch] text-[clamp(1.7rem,2.4vw,2.35rem)] leading-[1.02] tracking-[-0.032em]'
        : 'max-w-[14ch] text-[clamp(1.55rem,2vw,2rem)] leading-[1.06] tracking-[-0.026em]';

  const bodyClass =
    tone === 'anchor'
      ? 'max-w-[28ch] text-[16px] leading-[1.62] text-ink-graphite md:text-[17px]'
      : tone === 'consequence'
        ? 'max-w-[64ch] text-[15px] leading-[1.62] text-ink-graphite md:text-[16px]'
        : 'max-w-[32ch] text-[15px] leading-[1.62] text-ink-graphite md:text-[16px]';

  return (
    <article
      className={`motion-settle flex min-h-[220px] flex-col rounded-[24px] border px-6 py-6 md:px-7 md:py-7 ${cardClass} ${className ?? ''}`}
    >
      <h3 className={`whitespace-pre-line font-medium text-ink-black ${titleClass}`}>
        {tone === 'anchor' ? <AnchorTitle title={title} /> : title}
      </h3>
      {body ? <p className={`mt-4 ${bodyClass}`}>{body}</p> : null}

      {punchline ? (
        <p className="mt-auto max-w-[28ch] pt-8 text-[24px] font-medium leading-none tracking-[-0.03em] text-blue-900">
          {punchline}
        </p>
      ) : null}
    </article>
  );
}

function AnchorTitle({ title }: { title: string }) {
  return (
    <>
      <span className="block text-[0.84em]" style={{ letterSpacing: '0.02em' }}>
        Your fermentation process
      </span>
      <span className="text-[0.84em]" style={{ letterSpacing: '0.02em' }}>
        isn&apos;t hitting the{' '}
      </span>
      <span
        className="text-blue-700"
        style={{ textShadow: '0 0 18px rgba(65,64,252,0.08)' }}
      >
        productivity target
      </span>{' '}
      <span className="text-[0.84em]" style={{ letterSpacing: '0.02em' }}>
        that makes your molecule{' '}
      </span>
      <span
        className="text-blue-700"
        style={{ textShadow: '0 0 16px rgba(65,64,252,0.06)' }}
      >
        commercially viable
      </span>
      .
    </>
  );
}
