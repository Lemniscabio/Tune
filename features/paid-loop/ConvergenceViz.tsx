'use client';

// Convergence — Tune's signature viz. Per Phase 2 motion spec:
//  - Eight candidate-variable chips converge from scattered offsets into a ranked stack
//    with spring physics (stiffness 280, damping 26).
//  - After chips settle, five pentagonal loop nodes appear and edges draw sequentially.
//  - prefers-reduced-motion: render final state instantly.

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import type { CandidateChip, LoopNode } from '@/content/schema';

type ConvergenceVizProps = {
  nodes: readonly LoopNode[];
  candidates: readonly CandidateChip[];
  chipsLabel: string;
};

// Pentagonal node positions, computed once.
const PENTAGON = (() => {
  const cx = 240;
  const cy = 220;
  const r = 145;
  return Array.from({ length: 5 }, (_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      cos: Math.cos(angle),
      sin: Math.sin(angle),
    };
  });
})();

// Multi-line labels — long names split across two tspan rows.
const NODE_LABEL_LINES: ReadonlyArray<readonly string[]> = [
  ['Initial design'],
  ['Run experiments'],
  ['Train hybrid model', '+ uncertainty'],
  ['Recommend next', 'experiments'],
  ['Update feasible', 'region'],
];

// Deterministic scatter offsets — same on server and client (no Math.random in render).
const CHIP_OFFSETS = [
  { x: -22, y: 14 },
  { x: 28, y: -10 },
  { x: -16, y: 22 },
  { x: 18, y: 18 },
  { x: -26, y: -16 },
  { x: 22, y: 10 },
  { x: -18, y: -22 },
  { x: 14, y: -18 },
];

export function ConvergenceViz({ nodes, candidates, chipsLabel }: ConvergenceVizProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-120px 0px' });
  const reduced = useReducedMotion();

  // Reduced motion: skip animation, render final state.
  const trigger = inView || Boolean(reduced);
  const animated = !reduced;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-12"
    >
      {/* Loop diagram — left column */}
      <div className="md:col-span-7">
        <svg
          viewBox="0 0 480 440"
          className="block h-auto w-full"
          role="img"
          aria-labelledby="loop-title"
        >
          <title id="loop-title">
            {`Hybrid-model optimization loop: ${nodes.map((n) => n.label).join(' → ')}.`}
          </title>

          {/* Edges */}
          {PENTAGON.map((p, i) => {
            const next = PENTAGON[(i + 1) % 5];
            return (
              <motion.line
                key={`edge-${i}`}
                x1={p.x}
                y1={p.y}
                x2={next.x}
                y2={next.y}
                stroke="#14110E"
                strokeOpacity={0.5}
                strokeWidth={1.25}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={trigger ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  duration: 0.5,
                  delay: animated ? 0.7 + i * 0.12 : 0,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            );
          })}

          {/* Nodes */}
          {PENTAGON.map((p, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={p.x}
              cy={p.y}
              r={5.5}
              fill="#F0EAD8"
              stroke="#14110E"
              strokeWidth={1.5}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={
                trigger ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }
              }
              transition={{
                duration: 0.4,
                delay: animated ? 0.45 + i * 0.08 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                transformOrigin: `${p.x}px ${p.y}px`,
                transformBox: 'fill-box',
              }}
            />
          ))}

          {/* Labels */}
          {PENTAGON.map((p, i) => {
            const lines = NODE_LABEL_LINES[i];
            const anchor =
              p.cos > 0.3 ? 'start' : p.cos < -0.3 ? 'end' : 'middle';
            const xOffset = anchor === 'start' ? 14 : anchor === 'end' ? -14 : 0;
            const yBase =
              p.sin > 0.3
                ? p.y + 22
                : p.sin < -0.3
                  ? p.y - 14 - (lines.length - 1) * 14
                  : p.y + 4;

            return (
              <motion.text
                key={`label-${i}`}
                x={p.x + xOffset}
                y={yBase}
                textAnchor={anchor}
                fontSize={11}
                fontFamily="var(--font-inter), Inter, sans-serif"
                fontWeight={500}
                fill="#14110E"
                initial={{ opacity: 0 }}
                animate={trigger ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.35,
                  delay: animated ? 0.55 + i * 0.08 : 0,
                }}
              >
                {lines.map((line, j) => (
                  <tspan key={j} x={p.x + xOffset} dy={j === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </motion.text>
            );
          })}
        </svg>
      </div>

      {/* Candidate chips — right column */}
      <div className="md:col-span-5">
        <p className="label-m text-ink-graphite">{chipsLabel}</p>
        <ul className="mt-6 space-y-3">
          {candidates.map((chip, i) => (
            <motion.li
              key={chip.label}
              className="mono-m flex items-baseline gap-4"
              initial={{
                opacity: 0,
                x: CHIP_OFFSETS[i].x,
                y: CHIP_OFFSETS[i].y,
              }}
              animate={
                trigger
                  ? { opacity: 1, x: 0, y: 0 }
                  : {
                      opacity: 0,
                      x: CHIP_OFFSETS[i].x,
                      y: CHIP_OFFSETS[i].y,
                    }
              }
              transition={
                animated
                  ? {
                      type: 'spring',
                      stiffness: 280,
                      damping: 26,
                      delay: i * 0.05,
                    }
                  : { duration: 0 }
              }
            >
              <span className="tabular w-6 shrink-0 text-ink-ash">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-ink-black">{chip.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
