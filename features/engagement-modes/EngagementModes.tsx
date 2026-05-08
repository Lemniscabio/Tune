'use client';

// §04 — Engagement modes (paid).
//
// Two partnership structures, presented as boundary diagrams:
//   Mode A — Partner wet lab / Lemnisca dry lab (cross-organizational)
//   Mode B — Lemnisca integrated wet + dry (single-organization)
//
// Each card carries a small structural diagram showing who owns wet vs dry,
// and the experiment data ↔ recommendation flow that closes the loop.

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import type { PaidLoop as PaidLoopContent } from '@/content/schema';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';

type EngagementModesProps = {
  section: PaidLoopContent;
  id?: string;
};

export function EngagementModes({ section, id = 'engagement-modes' }: EngagementModesProps) {
  return (
    <section id={id} className="relative bg-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <hr className="border-0 bg-line-hairline-cool h-px" />
      </div>
      <div className="mx-auto max-w-[1200px] px-6 pt-24 pb-32 md:pt-32 md:pb-40">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Section {section.number} · Engagement · Modes</Eyebrow>
            <h2 className="display-section mt-6 max-w-[16ch] text-ink-black">
              Two ways to run paid Tune.
            </h2>
          </div>
          <p className="body-l mt-2 max-w-[52ch] text-ink-graphite md:col-span-6 md:col-start-7 md:mt-1">
            Paid engagement runs as a closed loop between wet experiments and dry modeling. Two structures depending on who runs the bench.
          </p>
        </div>

        {/* Mode cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          {section.modes.map((mode, i) => (
            <ModeCard key={mode.letter} mode={mode} delay={i * 140} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Mode card ──────────────────────────────────────────────────────────────

function ModeCard({
  mode,
  delay,
}: {
  mode: { letter: 'A' | 'B'; title: string; body: string };
  delay: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  const trigger = inView || Boolean(reduced);

  return (
    <motion.article
      ref={ref}
      className="rounded-md border border-line-hairline-cool bg-white p-7 md:p-8"
      style={{
        boxShadow: '0 1px 0 rgba(20,17,14,0.03), 0 22px 44px -28px rgba(65,64,252,0.18)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-baseline gap-3">
        <span aria-hidden className="block h-px w-6 bg-line-hairline-cool" />
        <p className="mono-s tabular text-ink-ash">MODE {mode.letter}</p>
      </div>

      <h3 className="mt-5 max-w-[24ch] text-[22px] font-medium leading-tight tracking-[-0.014em] text-ink-black">
        {mode.title}
      </h3>

      {/* Boundary diagram */}
      <div className="mt-7 rounded-sm border border-line-hairline-cool bg-white p-5">
        <BoundaryDiagram mode={mode.letter} trigger={trigger} reduced={Boolean(reduced)} />
      </div>

      <p className="body-m mt-7 max-w-[44ch] text-ink-graphite">{mode.body}</p>
    </motion.article>
  );
}

// ─── Boundary diagram ───────────────────────────────────────────────────────
// Mode A: customer side hosts wet, Lemnisca side hosts dry. Two separate
// org boundaries with a data ↔ recommendation handoff between them.
// Mode B: single Lemnisca-side boundary contains both wet and dry — tighter,
// integrated loop.

function BoundaryDiagram({
  mode,
  trigger,
  reduced,
}: {
  mode: 'A' | 'B';
  trigger: boolean;
  reduced: boolean;
}) {
  if (mode === 'A') {
    return (
      <svg viewBox="0 0 360 160" className="h-auto w-full" role="img" aria-label="Partner wet lab + Lemnisca dry lab">
        {/* Customer boundary */}
        <motion.rect
          x={10}
          y={20}
          width={140}
          height={120}
          rx={4}
          fill="none"
          stroke="#A1A1FE"
          strokeWidth={0.8}
          strokeDasharray="3 3"
          initial={{ opacity: 0 }}
          animate={trigger ? { opacity: 1 } : {}}
          transition={{ duration: reduced ? 0 : 0.5 }}
        />
        <motion.text
          x={80}
          y={14}
          fontSize={9}
          fontFamily="var(--font-jetbrains)"
          fill="#8C8579"
          textAnchor="middle"
          letterSpacing="0.08em"
          initial={{ opacity: 0 }}
          animate={trigger ? { opacity: 1 } : {}}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.1 }}
        >
          PARTNER
        </motion.text>

        {/* Wet lab block */}
        <motion.g
          initial={{ opacity: 0, y: 4 }}
          animate={trigger ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.2 }}
        >
          <rect x={32} y={56} width={96} height={48} rx={4} fill="#FFFFFF" stroke="#4140FC" strokeWidth={1.2} />
          <text x={80} y={78} fontSize={11} fontFamily="var(--font-jetbrains)" fill="#0A07D4" textAnchor="middle" letterSpacing="0.05em">WET LAB</text>
          <text x={80} y={94} fontSize={9} fontFamily="var(--font-newsreader), serif" fontStyle="italic" fill="#4A453E" textAnchor="middle">runs experiments</text>
        </motion.g>

        {/* Lemnisca boundary */}
        <motion.rect
          x={210}
          y={20}
          width={140}
          height={120}
          rx={4}
          fill="none"
          stroke="#A1A1FE"
          strokeWidth={0.8}
          strokeDasharray="3 3"
          initial={{ opacity: 0 }}
          animate={trigger ? { opacity: 1 } : {}}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.05 }}
        />
        <motion.text
          x={280}
          y={14}
          fontSize={9}
          fontFamily="var(--font-jetbrains)"
          fill="#8C8579"
          textAnchor="middle"
          letterSpacing="0.08em"
          initial={{ opacity: 0 }}
          animate={trigger ? { opacity: 1 } : {}}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.15 }}
        >
          LEMNISCA
        </motion.text>

        {/* Dry lab block */}
        <motion.g
          initial={{ opacity: 0, y: 4 }}
          animate={trigger ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.3 }}
        >
          <rect x={232} y={56} width={96} height={48} rx={4} fill="#FFFFFF" stroke="#4140FC" strokeWidth={1.2} />
          <text x={280} y={78} fontSize={11} fontFamily="var(--font-jetbrains)" fill="#0A07D4" textAnchor="middle" letterSpacing="0.05em">DRY LAB</text>
          <text x={280} y={94} fontSize={9} fontFamily="var(--font-newsreader), serif" fontStyle="italic" fill="#4A453E" textAnchor="middle">designs · models</text>
        </motion.g>

        {/* Handoff arrows */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={trigger ? { opacity: 1 } : {}}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.5 }}
        >
          <path d="M 132 70 L 226 70" stroke="#0A07D4" strokeWidth={1.2} markerEnd="url(#mode-arrow-r)" />
          <path d="M 226 92 L 132 92" stroke="#4140FC" strokeWidth={1.2} markerEnd="url(#mode-arrow-l)" />
          <text x={180} y={64} fontSize={8} fontFamily="var(--font-jetbrains)" fill="#0A07D4" textAnchor="middle" letterSpacing="0.05em">DATA</text>
          <text x={180} y={106} fontSize={8} fontFamily="var(--font-jetbrains)" fill="#4140FC" textAnchor="middle" letterSpacing="0.05em">RECOMMEND</text>
        </motion.g>

        <defs>
          <marker id="mode-arrow-r" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={6} markerHeight={6} orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0A07D4" />
          </marker>
          <marker id="mode-arrow-l" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={6} markerHeight={6} orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#4140FC" />
          </marker>
        </defs>
      </svg>
    );
  }

  // Mode B — single Lemnisca boundary, integrated.
  return (
    <svg viewBox="0 0 360 160" className="h-auto w-full" role="img" aria-label="Lemnisca integrated wet + dry">
      {/* Lemnisca boundary — wraps both blocks */}
      <motion.rect
        x={10}
        y={20}
        width={340}
        height={120}
        rx={4}
        fill="#EFEFFF"
        fillOpacity={0.6}
        stroke="#4140FC"
        strokeWidth={1}
        strokeDasharray="3 3"
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.5 }}
      />
      <motion.text
        x={180}
        y={14}
        fontSize={9}
        fontFamily="var(--font-jetbrains)"
        fill="#0A07D4"
        textAnchor="middle"
        letterSpacing="0.08em"
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.1 }}
      >
        LEMNISCA · INTEGRATED
      </motion.text>

      {/* Wet block */}
      <motion.g
        initial={{ opacity: 0, y: 4 }}
        animate={trigger ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.2 }}
      >
        <rect x={42} y={56} width={114} height={48} rx={4} fill="#FFFFFF" stroke="#4140FC" strokeWidth={1.2} />
        <text x={99} y={78} fontSize={11} fontFamily="var(--font-jetbrains)" fill="#0A07D4" textAnchor="middle" letterSpacing="0.05em">WET LAB</text>
        <text x={99} y={94} fontSize={9} fontFamily="var(--font-newsreader), serif" fontStyle="italic" fill="#4A453E" textAnchor="middle">runs experiments</text>
      </motion.g>

      {/* Dry block */}
      <motion.g
        initial={{ opacity: 0, y: 4 }}
        animate={trigger ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.3 }}
      >
        <rect x={204} y={56} width={114} height={48} rx={4} fill="#FFFFFF" stroke="#4140FC" strokeWidth={1.2} />
        <text x={261} y={78} fontSize={11} fontFamily="var(--font-jetbrains)" fill="#0A07D4" textAnchor="middle" letterSpacing="0.05em">DRY LAB</text>
        <text x={261} y={94} fontSize={9} fontFamily="var(--font-newsreader), serif" fontStyle="italic" fill="#4A453E" textAnchor="middle">designs · models</text>
      </motion.g>

      {/* Tight closed-loop arrows */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.5 }}
      >
        <path d="M 158 70 L 200 70" stroke="#0A07D4" strokeWidth={1.2} markerEnd="url(#mode-arrow-r2)" />
        <path d="M 202 92 L 160 92" stroke="#4140FC" strokeWidth={1.2} markerEnd="url(#mode-arrow-l2)" />
      </motion.g>

      <defs>
        <marker id="mode-arrow-r2" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={6} markerHeight={6} orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0A07D4" />
        </marker>
        <marker id="mode-arrow-l2" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={6} markerHeight={6} orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#4140FC" />
        </marker>
      </defs>
    </svg>
  );
}
