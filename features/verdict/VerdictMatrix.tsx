'use client';

// §04 — The verdict.
//
// The sprint resolves into one of five readiness states. Each state determines
// whether — and how — paid optimization is justified.
//
// Five rows. Each row carries a small readiness gauge, a finding, what it
// means, and a next-step badge. Rows 1–4 are optimize tracks (forward).
// Row 5 is the revisit track (the system needs work first).

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import type { DecisionTable as DecisionTableContent } from '@/content/schema';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';

type VerdictMatrixProps = {
  section: DecisionTableContent;
  id?: string;
};

// Readiness signal levels per row — derived from each row's diagnostic state.
// 0–4 = optimize tracks (signal increasingly strong); -1 = revisit (negative).
const TRACKS: Array<'optimize' | 'revisit'> = [
  'optimize', // baseline reproducible
  'optimize', // assay validated, drivers compete
  'optimize', // controllable levers
  'optimize', // scale-up constraints visible early
  'revisit',  // CV high, drift, sparse runs
];
const SIGNAL_LEVELS = [3, 4, 3, 2, 0]; // 0..4 lit segments

export function VerdictMatrix({ section, id = 'engagement-verdict' }: VerdictMatrixProps) {
  return (
    <section id={id} className="relative bg-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <hr className="border-0 bg-line-hairline-cool h-px" />
      </div>
      <div className="mx-auto max-w-[1200px] px-6 pt-24 pb-32 md:pt-32 md:pb-40">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Section {section.number} · Engagement · Verdict</Eyebrow>
            <h2 className="display-section mt-6 max-w-[14ch] text-ink-black">
              {section.headline}
            </h2>
          </div>
          <p className="body-l mt-2 max-w-[52ch] text-ink-graphite md:col-span-6 md:col-start-7 md:mt-1">
            {section.caption}
          </p>
        </div>

        {/* Tracks legend */}
        <div className="mt-16 flex items-center gap-6 md:gap-10">
          <div className="flex items-center gap-2">
            <span aria-hidden className="block h-2 w-6 rounded-sm bg-blue-500" />
            <span className="mono-s text-ink-graphite" style={{ letterSpacing: '0.06em' }}>
              OPTIMIZE TRACKS · 4
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span aria-hidden className="block h-2 w-6 rounded-sm border border-line-hairline-cool bg-white" />
            <span className="mono-s text-ink-graphite" style={{ letterSpacing: '0.06em' }}>
              REVISIT · 1
            </span>
          </div>
        </div>

        {/* Verdict rows */}
        <div className="mt-8">
          {/* Column headers — desktop only */}
          <div className="hidden grid-cols-[40px_120px_1fr_1fr_220px] gap-6 border-b border-line-hairline-cool pb-3 md:grid">
            <span />
            <p className="mono-s text-ink-ash" style={{ letterSpacing: '0.08em' }}>STATE</p>
            <p className="mono-s text-ink-ash" style={{ letterSpacing: '0.08em' }}>{section.columns[0]}</p>
            <p className="mono-s text-ink-ash" style={{ letterSpacing: '0.08em' }}>{section.columns[1]}</p>
            <p className="mono-s text-ink-ash" style={{ letterSpacing: '0.08em' }}>{section.columns[2]}</p>
          </div>

          <ul>
            {section.rows.map((row, i) => (
              <VerdictRow
                key={row.finding}
                index={i + 1}
                row={row}
                track={TRACKS[i]}
                signalLevel={SIGNAL_LEVELS[i]}
                delay={i * 100}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Verdict row ────────────────────────────────────────────────────────────

function VerdictRow({
  index,
  row,
  track,
  signalLevel,
  delay,
}: {
  index: number;
  row: { finding: string; meaning: string; nextStep: string };
  track: 'optimize' | 'revisit';
  signalLevel: number;
  delay: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  const trigger = inView || Boolean(reduced);

  const isRevisit = track === 'revisit';

  return (
    <motion.li
      ref={ref}
      className="border-b border-line-hairline-cool"
      initial={{ opacity: 0, y: 8 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid grid-cols-1 gap-3 py-7 md:grid-cols-[40px_120px_1fr_1fr_220px] md:gap-6 md:py-8">
        {/* Index + track stripe */}
        <div className="flex items-start gap-3 md:flex-col md:items-stretch md:gap-2">
          <span className="mono-s tabular text-ink-ash">
            {String(index).padStart(2, '0')}
          </span>
          <span
            aria-hidden
            className={`mt-1 block h-1 w-10 rounded-sm md:w-full ${isRevisit ? 'bg-line-hairline-cool' : 'bg-blue-500'}`}
          />
        </div>

        {/* Readiness gauge */}
        <div>
          <p className="mono-s text-ink-ash md:hidden" style={{ letterSpacing: '0.08em' }}>STATE</p>
          <ReadinessGauge level={signalLevel} negative={isRevisit} />
        </div>

        {/* Finding */}
        <div>
          <p className="mono-s text-ink-ash md:hidden" style={{ letterSpacing: '0.08em' }}>FINDING</p>
          <p className="body-m mt-1 max-w-[36ch] text-ink-black md:mt-0">
            {row.finding}
          </p>
        </div>

        {/* What it means */}
        <div>
          <p className="mono-s text-ink-ash md:hidden" style={{ letterSpacing: '0.08em' }}>MEANS</p>
          <p className="body-m mt-1 max-w-[36ch] text-ink-graphite md:mt-0">
            {row.meaning}
          </p>
        </div>

        {/* Next step badge */}
        <div>
          <p className="mono-s text-ink-ash md:hidden" style={{ letterSpacing: '0.08em' }}>NEXT</p>
          <NextStepBadge label={row.nextStep} negative={isRevisit} />
        </div>
      </div>
    </motion.li>
  );
}

// ─── Readiness gauge — small 5-segment signal indicator ─────────────────────

function ReadinessGauge({ level, negative }: { level: number; negative: boolean }) {
  return (
    <div className="flex items-end gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const lit = i < level;
        return (
          <span
            key={i}
            aria-hidden
            className="block w-[6px] rounded-sm"
            style={{
              height: 6 + i * 3,
              background: lit
                ? negative
                  ? '#A9A9AE'
                  : '#0A07D4'
                : '#E5E5E7',
              opacity: lit ? 1 : 0.6,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Next step badge ────────────────────────────────────────────────────────

function NextStepBadge({ label, negative }: { label: string; negative: boolean }) {
  return (
    <span
      className={`mt-1 inline-flex items-baseline gap-2 rounded-md border px-3.5 py-2 text-[13px] font-medium leading-snug md:mt-0 ${
        negative
          ? 'border-line-hairline-cool bg-neutral-50 text-ink-graphite'
          : 'border-blue-200 bg-white text-ink-black'
      }`}
      style={{
        boxShadow: negative
          ? 'none'
          : '0 1px 0 rgba(20,17,14,0.02), 0 8px 18px -12px rgba(65,64,252,0.18)',
      }}
    >
      <span aria-hidden className={negative ? 'text-ink-ash' : 'text-blue-500'}>→</span>
      <span>{label}</span>
    </span>
  );
}
