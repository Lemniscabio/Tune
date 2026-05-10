import type { PaidLoop as PaidLoopContent } from '@/content/schema';
import { AccentUnderline } from '@/features/hero/AccentUnderline';

type MethodSystemProps = {
  section: PaidLoopContent;
  id?: string;
};

const BENTO_LAYOUT = [
  'lg:col-span-4',
  'lg:col-span-3',
  'lg:col-span-7',
] as const;

export function MethodSystem({ section, id = 'how-method' }: MethodSystemProps) {
  return (
    <section id={id} className="relative bg-white">
      <div className="mx-auto max-w-[1240px] px-6 pt-24 pb-32 md:px-10 md:pt-32 md:pb-40 lg:px-14">
        <div className="max-w-[1040px]">
          <TransitionPill>THE SOLUTION</TransitionPill>
          <h2 className="display-section mt-5 max-w-[14ch] text-ink-black md:max-w-none">
            {section.headline}
          </h2>
          <p className="body-xl mt-8 max-w-[60ch] text-ink-graphite/82">
            {section.intro}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {section.solutionBento.children.map((card, index) => (
            <SolutionChildCard
              key={card.title}
              title={card.title}
              body={card.body}
              className={BENTO_LAYOUT[index]}
            />
          ))}

          <SolutionFeatureCard
            title={section.solutionBento.featureTitle}
            className="lg:col-span-5 lg:row-span-2 lg:col-start-8 lg:row-start-1"
          />
        </div>

        <div className="mt-20 md:mt-24">
          <div className="max-w-[860px]">
            <p className="mono-s text-ink-ash" style={{ letterSpacing: '0.08em' }}>
              LEARNING LOOPS
            </p>
            <h3 className="mt-5 max-w-[16ch] text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.04] tracking-[-0.03em] text-ink-black">
              Two ways a fermentation program learns.
            </h3>
            <p className="mt-5 max-w-[58ch] text-[16px] leading-[1.65] text-ink-graphite md:text-[18px]">
              One loop burns wet-lab rounds to discover what happened. The other uses Tune
              to learn between runs, then chooses the next experiment with intent.
            </p>
          </div>

          <LearningLoopComparison />
        </div>
      </div>
    </section>
  );
}

function TransitionPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="engagement-transition-pill">
      <span className="engagement-transition-pill__surface px-4 py-2 mono-s text-blue-700">
        {children}
      </span>
    </span>
  );
}

function SolutionChildCard({
  title,
  body,
  className,
}: {
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <article
      className={`group motion-settle flex min-h-[220px] flex-col rounded-[24px] border border-line-hairline-cool bg-white px-6 py-6 shadow-[0_20px_64px_-58px_rgba(20,17,14,0.24)] transition-[transform,box-shadow,border-color] duration-180 ease-out hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_24px_68px_-52px_rgba(20,17,14,0.22)] active:scale-[0.995] md:px-7 md:py-7 ${className ?? ''}`}
    >
      {title !== 'Months, not years.' ? (
        <h3 className="max-w-[14ch] text-[clamp(1.55rem,2vw,2rem)] font-medium leading-[1.06] tracking-[-0.026em] text-ink-black">
          {title}
        </h3>
      ) : null}
      {title === 'Months, not years.' ? (
        <div className="mt-4 max-w-[72ch] text-ink-graphite">
          <h3 className="max-w-[16ch] text-[clamp(1.7rem,2.6vw,2.7rem)] font-medium leading-[1.02] tracking-[-0.032em] text-ink-black">
            <AccentUnderline delayMs={200}>
              <span>Months</span>
            </AccentUnderline>
            , not years.
          </h3>
          <p className="mt-5 max-w-[26ch] text-[clamp(1.05rem,1.55vw,1.28rem)] leading-[1.5] text-ink-graphite md:text-[19px]">
            Tune explores{' '}
            <span className="inline-block align-[-0.12em] text-[clamp(2.7rem,5vw,4.6rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-ink-black transition-transform duration-180 ease-out group-hover:-translate-y-0.5">
              100x
            </span>{' '}
            more conditions between wet-lab rounds than your team could.
          </p>
          <p className="mt-4 max-w-[38ch] text-[15px] leading-[1.62] md:text-[16px]">
            Years of search compress into months.
          </p>
        </div>
      ) : (
        <p className="mt-4 max-w-[32ch] text-[15px] leading-[1.62] text-ink-graphite md:text-[16px]">
          {body}
        </p>
      )}
    </article>
  );
}

function SolutionFeatureCard({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <article
      className={`group motion-settle relative flex min-h-[220px] flex-col overflow-hidden rounded-[24px] border border-blue-200/45 px-6 py-6 shadow-[0_28px_84px_-60px_rgba(3,2,122,0.42)] transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_34px_92px_-56px_rgba(3,2,122,0.5)] active:scale-[0.995] md:px-8 md:py-8 lg:px-9 lg:py-9 ${className ?? ''}`}
      style={{
        backgroundImage: 'linear-gradient(135deg, #03027A 0%, #1612B8 52%, #4140FC 100%)',
      }}
    >
      <div
        aria-hidden
        className="blue-sheen-drift motion-safe:animate-[blue-sheen-drift_10s_ease-in-out_infinite] pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 72% 18%, rgba(205,205,254,0.22) 0%, transparent 28%), radial-gradient(circle at 28% 86%, rgba(205,205,254,0.16) 0%, transparent 32%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 58%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <p className="mono-s text-blue-100" style={{ letterSpacing: '0.08em' }}>
          PREDICTIVE MODEL
        </p>
        <h3 className="mt-5 max-w-[13ch] text-[clamp(2rem,4.2vw,3.15rem)] font-medium leading-[1.02] tracking-[-0.038em] text-white">
          {title}
        </h3>
      </div>
    </article>
  );
}

function LearningLoopComparison() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
      <LearningLoopPanel
        variant="without"
        label="WITHOUT TUNE"
        headline="Runs chase clarity."
        summary="Each experiment mainly answers what should have been obvious earlier, so the team spends wet-lab time buying diagnosis."
        rows={[
          {
            label: 'Between runs',
            value: 'Wait for data, then interpret manually',
          },
          {
            label: 'Next run is based on',
            value: 'Debate, intuition, and incomplete readouts',
          },
          {
            label: 'What each run buys',
            value: 'Clarity about the last run',
          },
        ]}
      />
      <LearningLoopPanel
        variant="with"
        label="WITH TUNE"
        headline="Runs compound learning."
        summary="Model updates happen between wet-lab rounds, so each experiment starts from a better hypothesis than the last one."
        rows={[
          {
            label: 'Between runs',
            value: 'Tune updates the model and narrows uncertainty',
          },
          {
            label: 'Next run is based on',
            value: 'Model-ranked experiments with expected yield',
          },
          {
            label: 'What each run buys',
            value: 'A better next decision',
          },
        ]}
      />
    </div>
  );
}

function LearningLoopPanel({
  variant,
  label,
  headline,
  summary,
  rows,
}: {
  variant: 'without' | 'with';
  label: string;
  headline: string;
  summary: string;
  rows: Array<{ label: string; value: string }>;
}) {
  const isWith = variant === 'with';

  return (
    <article
      className={`motion-settle relative overflow-hidden rounded-[28px] border px-6 py-6 shadow-[0_16px_42px_-36px_rgba(20,17,14,0.14)] md:px-8 md:py-8 ${
        isWith
          ? 'border-blue-100 bg-[linear-gradient(180deg,rgba(239,239,255,0.86)_0%,rgba(255,255,255,1)_62%)]'
          : 'border-[#E6E6E8] bg-[linear-gradient(180deg,rgba(244,244,245,0.92)_0%,rgba(241,241,242,0.88)_100%)]'
      }`}
    >
      <div className="relative z-10">
        <h4
          className="mt-4 max-w-[12ch] text-[clamp(1.7rem,2.4vw,2.35rem)] font-medium leading-[1.03] tracking-[-0.03em] text-ink-black"
        >
          {headline}
        </h4>

        <div
          className={`mt-8 overflow-hidden rounded-[22px] ${
            isWith
              ? 'bg-[linear-gradient(180deg,#F8FAFF_0%,#EEF3FF_100%)]'
              : 'bg-[linear-gradient(180deg,#F8F8F9_0%,#F1F1F2_100%)]'
          }`}
        >
          {rows.map((row, index) => (
            <div
              key={row.label}
              className={`grid grid-cols-1 gap-3 px-5 py-5 transition-colors duration-150 ease-out hover:bg-white/55 md:grid-cols-[140px_minmax(0,1fr)] md:gap-6 ${
                index > 0
                  ? isWith
                    ? 'border-t border-[#DCE6FF]'
                    : 'border-t border-[#E7E7E9]'
                  : ''
              }`}
            >
              <p
                className={`mono-s ${isWith ? 'text-[#6D7FAF]' : 'text-[#9E9191]'}`}
                style={{ letterSpacing: '0.08em' }}
              >
                {row.label}
              </p>
              <p className="text-[15px] font-medium leading-[1.5] tracking-[-0.012em] text-ink-black md:text-[16px]">
                {row.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <MetricChip
            label="Conditions"
            value={isWith ? '100x' : '1x'}
            tone={isWith ? 'gain' : 'loss'}
          />
          <MetricChip
            label="Time"
            value={isWith ? 'Months' : 'Years'}
            tone={isWith ? 'gain' : 'loss'}
          />
          <MetricChip
            label="Cost"
            value={isWith ? 'Lower' : 'Higher'}
            tone={isWith ? 'gain' : 'loss'}
          />
        </div>

        <div className="mt-8">
          {isWith ? <LoopWithTune /> : <LoopWithoutTune />}
        </div>

        <p className="mt-8 max-w-[38ch] text-[15px] leading-[1.65] text-ink-graphite md:text-[16px]">
          {summary}
        </p>
      </div>
    </article>
  );
}

function FragmentStep({
  label,
  value,
  showArrow,
  arrowTone,
}: {
  label: string;
  value: string;
  showArrow: boolean;
  arrowTone: 'with' | 'without';
}) {
  return (
    <>
      <div className="rounded-[22px] bg-[#F3F3F4] px-5 py-5">
        <p className="mono-s text-[#A5A8B0]" style={{ letterSpacing: '0.12em' }}>
          {label}
        </p>
        <p className="mt-4 max-w-[12ch] text-[15px] font-medium leading-[1.42] tracking-[-0.015em] text-ink-black md:text-[16px]">
          {value}
        </p>
      </div>
      {showArrow ? <FragmentArrow tone={arrowTone} /> : null}
    </>
  );
}

function FragmentArrow({ tone }: { tone: 'with' | 'without' }) {
  return (
    <div className="hidden items-center justify-center lg:flex" aria-hidden>
      <svg viewBox="0 0 36 16" className="h-4 w-9">
        <line
          x1={2}
          y1={8}
          x2={24}
          y2={8}
          stroke={tone === 'with' ? '#FF7A14' : '#C9D3E2'}
          strokeWidth={1}
          strokeDasharray="2 4"
        />
        <path
          d="M 24 4 L 32 8 L 24 12"
          fill="none"
          stroke={tone === 'with' ? '#FF7A14' : '#C9D3E2'}
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function LoopWithoutTune() {
  return (
    <div className="rounded-[22px] bg-[#EFEFF0] p-5 md:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        <LoopStep label="Run experiment" tone="neutral" />
        <LoopArrow tone="neutral" />
        <LoopStep label="Wait for data" tone="neutral" />
        <LoopArrow tone="neutral" />
        <LoopStep label="Debate what happened" tone="neutral" />
      </div>

      <div className="mt-5 flex items-center gap-3 text-ink-ash">
        <span className="mono-s">loop reset</span>
        <svg viewBox="0 0 84 16" className="h-4 w-20" aria-hidden>
          <path
            d="M 82 14 C 52 14 28 12 12 6"
            fill="none"
            stroke="#A9A9AE"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeDasharray="2 4"
          />
          <path
            d="M 18 2 L 10 6 L 18 10"
            fill="none"
            stroke="#A9A9AE"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function LoopWithTune() {
  return (
    <div className="rounded-[22px] bg-[linear-gradient(180deg,#F8FAFF_0%,#EEF3FF_100%)] p-5 md:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        <LoopStep label="Run experiment" tone="bright" />
        <LoopArrow tone="bright" />
        <LoopStep label="Update model" tone="bright" />
        <LoopArrow tone="bright" />
        <LoopStep label="Choose next best run" tone="bright" />
      </div>

      <div className="mt-5 flex items-center gap-3 text-blue-100">
        <span className="mono-s text-[#6D7FAF]">learning compounds</span>
        <svg viewBox="0 0 84 16" className="h-4 w-20" aria-hidden>
          <path
            d="M 82 14 C 52 14 28 12 12 6"
            fill="none"
            stroke="#A9B9E6"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeDasharray="2 4"
          />
          <path
            d="M 18 2 L 10 6 L 18 10"
            fill="none"
            stroke="#4A67D6"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function LoopStep({
  label,
  tone,
}: {
  label: string;
  tone: 'neutral' | 'bright';
}) {
  return (
    <div
      className={`rounded-[18px] border px-4 py-4 text-center ${
        tone === 'bright'
          ? 'border-[#D7E2FF] bg-white text-ink-black'
          : 'border-line-hairline-cool bg-white text-ink-black'
      }`}
    >
      <p className="text-[14px] font-medium leading-[1.4] tracking-[-0.012em]">
        {label}
      </p>
    </div>
  );
}

function LoopArrow({ tone }: { tone: 'neutral' | 'bright' }) {
  return (
    <div className="flex items-center justify-center" aria-hidden>
      <svg viewBox="0 0 36 16" className="h-4 w-9">
        <line
          x1={2}
          y1={8}
          x2={24}
          y2={8}
          stroke={tone === 'bright' ? '#A9B9E6' : '#A9A9AE'}
          strokeWidth={1}
          strokeDasharray="2 4"
        />
        <path
          d="M 24 4 L 32 8 L 24 12"
          fill="none"
          stroke={tone === 'bright' ? '#4A67D6' : '#4140FC'}
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function MetricChip({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'gain' | 'loss';
}) {
  const isGain = tone === 'gain';

  return (
    <div
      className={`rounded-[18px] border px-4 py-4 transition-[transform,box-shadow,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-24px_rgba(20,17,14,0.18)] ${
        isGain
          ? 'border-[#D7E2FF] bg-[linear-gradient(180deg,#FBFCFF_0%,#EEF3FF_100%)]'
          : 'border-[#E7DCDC] bg-[linear-gradient(180deg,#F7F4F4_0%,#F1EEEE_100%)]'
      }`}
    >
      <p
        className={`mono-s ${isGain ? 'text-[#6D7FAF]' : 'text-[#9E9191]'}`}
        style={{ letterSpacing: '0.08em' }}
      >
        {label}
      </p>
      <p
        className={`mt-3 text-[clamp(1.45rem,2vw,2rem)] font-medium leading-none tracking-[-0.03em] ${
          isGain ? 'text-[#3456C5]' : 'text-[#A85D5D]'
        }`}
      >
        {value}
      </p>
    </div>
  );
}
