'use client';

// §04 — Step 1: a 10-day technical answer.
//
// Presented as a 3-stage pipeline:
//   INPUTS   →   PROCESS (10-day cadence)   →   OUTPUTS
//   what you bring                              what comes back
//
// Below: a single line — decisions enabled.
//
// White ground, clean operational diagram, no SaaS UI mocks.

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import type { SprintBlock as SprintBlockContent } from '@/content/schema';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';

type SprintEntryProps = {
  section: SprintBlockContent;
  id?: string;
};

// 10-day cadence — derived from Slide 5 ("technical report and walkdown" closes
// the engagement) and the 10-day SLA confirmed in Phase 4 review.
const CADENCE = [
  { range: 'Day 1–2', label: 'Intake & data request' },
  { range: 'Day 3–7', label: 'Variance · assay · leverage analysis' },
  { range: 'Day 8–9', label: 'Synthesis · prioritisation' },
  { range: 'Day 10', label: 'Walkdown with your team' },
];

const DECISIONS = ['Optimize now', 'Fix baseline', 'Defer'];

export function SprintEntry({ section, id = 'engagement-entry' }: SprintEntryProps) {
  return (
    <section id={id} className="relative bg-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <hr className="border-0 bg-line-hairline-cool h-px" />
      </div>
      <div className="mx-auto max-w-[1200px] px-6 pt-24 pb-32 md:pt-32 md:pb-40">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Section {section.number} · Engagement · Step 1</Eyebrow>
            <h2 className="display-section mt-6 max-w-[14ch] text-ink-black">
              {section.headline}
            </h2>
          </div>
          <p className="body-l mt-2 max-w-[52ch] text-ink-graphite md:col-span-6 md:col-start-7 md:mt-1">
            {section.blockLabel}. A fast diagnostic engagement that decides whether, and how, paid optimization is justified.
          </p>
        </div>

        {/* 3-stage pipeline */}
        <Pipeline section={section} />

        {/* Decisions enabled */}
        <DecisionsEnabled />

        {/* Closing output line */}
        {section.outputLine && (
          <p className="mono-s mt-12 max-w-[64ch] text-ink-graphite">
            {section.outputLine}
          </p>
        )}
      </div>
    </section>
  );
}

// ─── 3-stage pipeline ───────────────────────────────────────────────────────

function Pipeline({ section }: { section: SprintBlockContent }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  const trigger = inView || Boolean(reduced);

  return (
    <div ref={ref} className="mt-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-4">
        {/* Stage 1 — Inputs */}
        <PipelineColumn
          stage="INPUTS"
          title="What you bring"
          trigger={trigger}
          reduced={Boolean(reduced)}
          delay={0}
        >
          <ul className="space-y-3">
            {section.whatYouBring.items.map((item) => (
              <li key={item} className="mono-m flex items-baseline gap-3 text-ink-black">
                <span aria-hidden className="text-blue-500">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </PipelineColumn>

        <PipelineArrow trigger={trigger} reduced={Boolean(reduced)} delay={150} />

        {/* Stage 2 — Process */}
        <PipelineColumn
          stage="PROCESS"
          title="10-day cadence"
          trigger={trigger}
          reduced={Boolean(reduced)}
          delay={250}
        >
          <ul className="space-y-3.5">
            {CADENCE.map((c) => (
              <li key={c.range} className="flex items-baseline gap-3">
                <span className="mono-s tabular w-[68px] shrink-0 text-ink-ash">{c.range}</span>
                <span className="body-s text-ink-black">{c.label}</span>
              </li>
            ))}
          </ul>
        </PipelineColumn>

        <PipelineArrow trigger={trigger} reduced={Boolean(reduced)} delay={400} />

        {/* Stage 3 — Outputs */}
        <PipelineColumn
          stage="OUTPUTS"
          title="What comes back"
          trigger={trigger}
          reduced={Boolean(reduced)}
          delay={500}
        >
          <ul className="space-y-3">
            {section.deliverables.map((d) => (
              <li key={d.index} className="flex items-baseline gap-3">
                <span className="mono-s tabular w-6 shrink-0 text-ink-ash">{d.index}</span>
                <span className="body-s font-medium text-ink-black">{d.title}</span>
              </li>
            ))}
          </ul>
        </PipelineColumn>
      </div>
    </div>
  );
}

function PipelineColumn({
  stage,
  title,
  trigger,
  reduced,
  delay,
  children,
}: {
  stage: string;
  title: string;
  trigger: boolean;
  reduced: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="rounded-md border border-line-hairline-cool bg-white p-6 md:p-7"
      initial={{ opacity: 0, y: 8 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="mono-s text-blue-500" style={{ letterSpacing: '0.08em' }}>{stage}</p>
      <p className="mt-2 text-[15px] font-medium text-ink-black">{title}</p>
      <div className="mt-6">{children}</div>
    </motion.div>
  );
}

function PipelineArrow({ trigger, reduced, delay }: { trigger: boolean; reduced: boolean; delay: number }) {
  return (
    <div className="flex items-center justify-center">
      <motion.svg
        viewBox="0 0 60 12"
        className="hidden h-3 w-12 md:block"
        initial={{ opacity: 0, x: -4 }}
        animate={trigger ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay / 1000 }}
        aria-hidden
      >
        <line x1={2} y1={6} x2={50} y2={6} stroke="#A1A1FE" strokeWidth={1} strokeDasharray="2 3" />
        <path d="M 50 2 L 58 6 L 50 10" fill="none" stroke="#4140FC" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
      {/* Mobile down-arrow */}
      <motion.svg
        viewBox="0 0 12 40"
        className="h-10 w-3 md:hidden"
        initial={{ opacity: 0, y: -4 }}
        animate={trigger ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay / 1000 }}
        aria-hidden
      >
        <line x1={6} y1={2} x2={6} y2={30} stroke="#A1A1FE" strokeWidth={1} strokeDasharray="2 3" />
        <path d="M 2 30 L 6 38 L 10 30" fill="none" stroke="#4140FC" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </div>
  );
}

// ─── Decisions enabled bar ──────────────────────────────────────────────────

function DecisionsEnabled() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  const trigger = inView || Boolean(reduced);

  return (
    <motion.div
      ref={ref}
      className="mt-16 flex flex-col items-start gap-5 rounded-md border border-line-hairline-cool bg-white p-7 md:flex-row md:items-center md:gap-10 md:p-8"
      initial={{ opacity: 0, y: 8 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="md:shrink-0">
        <p className="mono-s text-ink-ash" style={{ letterSpacing: '0.08em' }}>DECISIONS ENABLED</p>
        <p className="mt-2 text-[15px] font-medium text-ink-black">After Day 10</p>
      </div>
      <ul className="flex flex-wrap items-center gap-3">
        {DECISIONS.map((d, i) => (
          <li key={d}>
            <span className="mono-m inline-flex items-center gap-2 rounded-full border border-line-hairline-cool bg-white px-4 py-1.5 text-ink-black">
              <span className="text-blue-500 opacity-70">{String(i + 1).padStart(2, '0')}</span>
              <span>{d}</span>
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
