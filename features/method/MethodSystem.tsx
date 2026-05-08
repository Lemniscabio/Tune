'use client';

// §03 — Tune's method, presented as an evolving technical system.
//
// Two stacked visualizations:
//   1. PROCESS FLOW — 5 stations of the optimization loop in a horizontal sequence
//      with arrows. Each station carries a small scientific glyph, not an icon.
//   2. EVOLUTION  — 4 cycle panels showing the feasible region narrowing across
//      iterations. The point: each cycle improves learning per experiment.
//
// White ground, blue-ramp instruments, ink type. No yellow inside the system —
// reserved for the hero pill, §02 pivot, and §04 CTA.

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import type { PaidLoop as PaidLoopContent } from '@/content/schema';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';

type MethodSystemProps = {
  section: PaidLoopContent;
  id?: string;
};

export function MethodSystem({ section, id = 'how-method' }: MethodSystemProps) {
  return (
    <section id={id} className="relative bg-white">
      <div className="mx-auto max-w-[1200px] px-6 pt-24 pb-32 md:pt-32 md:pb-40">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Section {section.number} · Method</Eyebrow>
            <h2 className="display-section mt-6 max-w-[14ch] text-ink-black">
              {section.headline}
            </h2>
          </div>
          <p className="body-l mt-2 max-w-[52ch] text-ink-graphite md:col-span-6 md:col-start-7 md:mt-1">
            {section.intro}
          </p>
        </div>

        {/* Process flow — 5 stations */}
        <ProcessFlow stations={section.loopNodes.map((n, i) => ({ index: i + 1, label: n.label }))} />

        {/* Feasible region evolution */}
        <FeasibleRegionEvolution />

        {/* Caption */}
        <p className="mono-s mt-12 text-center text-ink-ash">
          {section.vizCaption}
        </p>
      </div>
    </section>
  );
}

// ─── Process flow ───────────────────────────────────────────────────────────

type Station = { index: number; label: string };

function ProcessFlow({ stations }: { stations: Station[] }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  const trigger = inView || Boolean(reduced);

  return (
    <div ref={ref} className="mt-20">
      <p className="mono-s text-ink-ash">The loop</p>

      {/* Desktop: horizontal 5-station strip with arrows */}
      <div className="mt-6 hidden md:block">
        <ol className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-0">
          {stations.map((s, i) => (
            <ProcessFlowItem key={s.index} station={s} trigger={trigger} reduced={Boolean(reduced)} delay={i * 110}>
              {i < stations.length - 1 ? <FlowArrow trigger={trigger} reduced={Boolean(reduced)} delay={i * 110 + 80} /> : null}
            </ProcessFlowItem>
          ))}
        </ol>
      </div>

      {/* Mobile: vertical stack with down-arrows */}
      <ol className="mt-6 space-y-4 md:hidden">
        {stations.map((s, i) => (
          <li key={s.index} className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-hairline-cool">
              <StationGlyph index={s.index} size={20} />
            </div>
            <div>
              <p className="mono-s text-ink-ash">Step {String(s.index).padStart(2, '0')}</p>
              <p className="mt-1 text-[15px] font-medium text-ink-black">{s.label}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProcessFlowItem({
  station,
  trigger,
  reduced,
  delay,
  children,
}: {
  station: Station;
  trigger: boolean;
  reduced: boolean;
  delay: number;
  children?: React.ReactNode;
}) {
  return (
    <>
      <motion.li
        className="flex flex-col items-center gap-3 px-2"
        initial={{ opacity: 0, y: 6 }}
        animate={trigger ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line-hairline-cool bg-white">
          <StationGlyph index={station.index} size={28} />
        </div>
        <p className="mono-s tabular text-ink-ash">
          {String(station.index).padStart(2, '0')}
        </p>
        <p className="text-center text-[13px] font-medium leading-tight text-ink-black">
          {station.label}
        </p>
      </motion.li>
      {children}
    </>
  );
}

function FlowArrow({ trigger, reduced, delay }: { trigger: boolean; reduced: boolean; delay: number }) {
  return (
    <li className="flex h-16 items-center justify-center self-start pt-5" aria-hidden>
      <motion.svg
        viewBox="0 0 40 12"
        className="h-3 w-10"
        initial={{ opacity: 0, x: -4 }}
        animate={trigger ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : delay / 1000 }}
      >
        <line x1={2} y1={6} x2={32} y2={6} stroke="#A1A1FE" strokeWidth={1} strokeDasharray="2 3" />
        <path d="M 32 2 L 38 6 L 32 10" fill="none" stroke="#4140FC" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </li>
  );
}

// Per-station glyph — abstract scientific shapes, not UI icons.
function StationGlyph({ index, size }: { index: number; size: number }) {
  switch (index) {
    case 1:
      // Initial design — small DOE grid
      return (
        <svg viewBox="0 0 32 32" width={size} height={size}>
          {[8, 16, 24].map((y) =>
            [8, 16, 24].map((x) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={1.5} fill="#4140FC" />
            )),
          )}
        </svg>
      );
    case 2:
      // Run experiments — oscilloscope trace
      return (
        <svg viewBox="0 0 32 32" width={size} height={size}>
          <path d="M 4 16 L 8 10 L 12 22 L 16 8 L 20 24 L 24 12 L 28 18" fill="none" stroke="#4140FC" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 3:
      // Train hybrid model — concentric mech+data rings + uncertainty halo
      return (
        <svg viewBox="0 0 32 32" width={size} height={size}>
          <circle cx={16} cy={16} r={11} fill="none" stroke="#A1A1FE" strokeWidth={0.8} strokeDasharray="2 2" />
          <circle cx={16} cy={16} r={7} fill="none" stroke="#4140FC" strokeWidth={1} />
          <circle cx={16} cy={16} r={3} fill="#0A07D4" />
        </svg>
      );
    case 4:
      // Recommend next — branching arrow
      return (
        <svg viewBox="0 0 32 32" width={size} height={size}>
          <path d="M 6 16 L 18 16" stroke="#4140FC" strokeWidth={1.25} strokeLinecap="round" />
          <path d="M 18 16 L 26 8" stroke="#4140FC" strokeWidth={1.25} strokeLinecap="round" />
          <path d="M 18 16 L 26 24" stroke="#A1A1FE" strokeWidth={1} strokeLinecap="round" strokeDasharray="2 2" />
          <path d="M 23 6 L 27 8 L 25 12" fill="none" stroke="#4140FC" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 5:
      // Update feasible region — shrinking polygon inside outer bound
      return (
        <svg viewBox="0 0 32 32" width={size} height={size}>
          <rect x={4} y={4} width={24} height={24} fill="none" stroke="#A1A1FE" strokeWidth={0.8} strokeDasharray="2 2" />
          <polygon points="12,12 22,12 24,20 18,24 10,20" fill="#4140FC" fillOpacity={0.18} stroke="#4140FC" strokeWidth={1} />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Feasible region evolution ──────────────────────────────────────────────
// 4 panels showing the feasible region shrinking across cycles. Sample points
// concentrate as the operating zone narrows toward the optimum.

function FeasibleRegionEvolution() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  const trigger = inView || Boolean(reduced);

  // Per-cycle: feasible polygon (normalized 0-100), sample points, optimum target.
  const cycles = [
    {
      label: 'Cycle 1',
      poly: '15,20 80,18 88,72 78,86 22,82 12,72',
      points: [[28, 32], [62, 28], [70, 68], [38, 78], [22, 56]],
    },
    {
      label: 'Cycle 2',
      poly: '28,32 70,30 76,68 64,80 32,72',
      points: [[40, 42], [58, 40], [66, 64], [42, 70], [50, 50], [60, 56]],
    },
    {
      label: 'Cycle 3',
      poly: '38,42 64,42 68,62 56,72 42,68',
      points: [[44, 50], [56, 48], [62, 58], [48, 64], [52, 56], [58, 52], [50, 60]],
    },
    {
      label: 'Cycle 4',
      poly: '46,50 60,50 62,60 54,66 48,62',
      points: [[50, 54], [56, 54], [54, 58], [52, 56], [55, 56], [53, 60], [57, 56], [51, 58], [55, 60]],
    },
  ];

  return (
    <div ref={ref} className="mt-24">
      <p className="mono-s text-ink-ash">Feasible region narrows across cycles</p>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {cycles.map((c, i) => (
          <motion.div
            key={c.label}
            className="rounded-md border border-line-hairline-cool bg-white p-4"
            initial={{ opacity: 0, y: 8 }}
            animate={trigger ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : 0.1 + i * 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <svg viewBox="0 0 100 100" className="h-auto w-full">
              {/* axes */}
              <line x1={6} y1={94} x2={94} y2={94} stroke="#D1D1D3" strokeWidth={0.5} />
              <line x1={6} y1={6} x2={6} y2={94} stroke="#D1D1D3" strokeWidth={0.5} />
              {/* outer prior region (faint) */}
              <rect x={6} y={6} width={88} height={88} fill="none" stroke="#E5E5E7" strokeWidth={0.5} strokeDasharray="2 2" />
              {/* current feasible region */}
              <motion.polygon
                points={c.poly}
                fill="#A1A1FE"
                fillOpacity={0.22}
                stroke="#4140FC"
                strokeWidth={0.8}
                initial={{ opacity: 0 }}
                animate={trigger ? { opacity: 1 } : {}}
                transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.25 + i * 0.18 }}
              />
              {/* optimum marker on cycle 4 */}
              {i === 3 && (
                <g>
                  <circle cx={54} cy={56} r={2} fill="#FBFC40" stroke="#0A07D4" strokeWidth={0.7} />
                </g>
              )}
              {/* sample points */}
              {c.points.map((p, j) => (
                <motion.circle
                  key={j}
                  cx={p[0]}
                  cy={p[1]}
                  r={1.6}
                  fill="#0A07D4"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={trigger ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: reduced ? 0 : 0.3,
                    delay: reduced ? 0 : 0.4 + i * 0.18 + j * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ transformOrigin: `${p[0]}px ${p[1]}px`, transformBox: 'fill-box' }}
                />
              ))}
            </svg>
            <p className="mono-s mt-3 text-center text-ink-graphite">{c.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
