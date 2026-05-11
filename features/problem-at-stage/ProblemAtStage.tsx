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

  const hoverClass =
    tone === 'anchor'
      ? ' hover:shadow-[0_34px_88px_-60px_rgba(3,2,122,0.36)] hover:border-blue-200 active:scale-[0.995]'
      : tone === 'consequence'
        ? ' hover:shadow-[0_26px_72px_-54px_rgba(20,17,14,0.34)] hover:border-neutral-100 active:scale-[0.995]'
        : ' hover:shadow-[0_26px_72px_-54px_rgba(20,17,14,0.28)] hover:border-neutral-100 active:scale-[0.995]';

  return (
    <article
      className={`group motion-settle flex min-h-[220px] flex-col rounded-[24px] border px-6 py-6 transition-[transform,box-shadow,border-color] duration-180 ease-out md:px-7 md:py-7 ${cardClass} ${hoverClass} ${className ?? ''}`}
    >
      <h3 className={`whitespace-pre-line font-medium text-ink-black ${titleClass}`}>
        {tone === 'anchor' ? <AnchorTitle title={title} /> : title}
      </h3>
      {body ? <p className={`mt-4 ${bodyClass}`}>{body}</p> : null}

      {tone === 'anchor' ? <AnchorIcon /> : null}

      {punchline ? (
        <p
          className="motion-settle mt-auto max-w-[28ch] pt-8 text-[24px] font-medium leading-none tracking-[-0.03em] text-blue-900"
          style={{ animationDelay: '140ms' }}
        >
          {punchline}
        </p>
      ) : null}
    </article>
  );
}

function AnchorTitle({ title }: { title: string }) {
  return <>{title}</>;
}

function AnchorIcon() {
  return (
    <div className="mt-auto flex items-end justify-center gap-6 pt-8">
      {/* Molecule — biology proven */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <svg viewBox="0 0 56 56" className="h-32 w-32" aria-hidden>
            {/* Hexagon */}
            <polygon
              points="28,4 50,16 50,40 28,52 6,40 6,16"
              fill="none"
              stroke="rgba(65,64,252,0.22)"
              strokeWidth="1.5"
            />
            {/* Bonds radiating from center */}
            <line x1="28" y1="28" x2="28" y2="4"  stroke="rgba(65,64,252,0.15)" strokeWidth="1.2" />
            <line x1="28" y1="28" x2="50" y2="16" stroke="rgba(65,64,252,0.15)" strokeWidth="1.2" />
            <line x1="28" y1="28" x2="50" y2="40" stroke="rgba(65,64,252,0.15)" strokeWidth="1.2" />
            <line x1="28" y1="28" x2="28" y2="52" stroke="rgba(65,64,252,0.15)" strokeWidth="1.2" />
            <line x1="28" y1="28" x2="6"  y2="40" stroke="rgba(65,64,252,0.15)" strokeWidth="1.2" />
            <line x1="28" y1="28" x2="6"  y2="16" stroke="rgba(65,64,252,0.15)" strokeWidth="1.2" />
            {/* Center node */}
            <circle cx="28" cy="28" r="5" fill="rgba(65,64,252,0.12)" stroke="rgba(65,64,252,0.4)" strokeWidth="1.4" />
            {/* Vertex nodes */}
            {[[28,4],[50,16],[50,40],[28,52],[6,40],[6,16]].map(([cx,cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2.8" fill="white" stroke="rgba(65,64,252,0.3)" strokeWidth="1.2" />
            ))}
            {/* Checkmark */}
            <circle cx="42" cy="42" r="8" fill="#4140FC" />
            <path d="M38.5 42 L41 44.5 L45.5 39.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
        <p className="text-[11px] font-medium tracking-[0.06em] text-blue-600/70 uppercase">Biology</p>
      </div>

      {/* Arrow */}
      <div className="mb-17 text-[28px] text-ink-black/20">→</div>

      {/* Fermenter — process not ready */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <svg viewBox="0 0 56 56" className="h-32 w-32" aria-hidden>
            {/* Vessel body */}
            <rect x="14" y="16" width="28" height="26" rx="4" fill="none" stroke="rgba(20,17,14,0.2)" strokeWidth="1.5" />
            {/* Top cap */}
            <rect x="18" y="11" width="20" height="6" rx="2" fill="none" stroke="rgba(20,17,14,0.2)" strokeWidth="1.4" />
            {/* Bottom outlet */}
            <path d="M24 42 L24 48 M32 42 L32 48" stroke="rgba(20,17,14,0.18)" strokeWidth="1.4" strokeLinecap="round" />
            {/* Side port */}
            <path d="M42 26 L48 26" stroke="rgba(20,17,14,0.18)" strokeWidth="1.4" strokeLinecap="round" />
            {/* Liquid fill hint */}
            <rect x="14" y="30" width="28" height="12" rx="0 0 4 4" fill="rgba(20,17,14,0.05)" />
            {/* Warning badge */}
            <circle cx="42" cy="42" r="8" fill="#F59E0B" />
            <path d="M42 37.5 L42 43" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="42" cy="45.5" r="1" fill="white" />
          </svg>
        </div>
        <p className="text-[11px] font-medium tracking-[0.06em] text-ink-ash uppercase">Process</p>
      </div>
    </div>
  );
}
