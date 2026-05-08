'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import type { ProblemSection } from '@/content/schema';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';

type ProblemAtStageProps = {
  section: ProblemSection;
  accent?: 'tune' | 'thrust' | 'lemnisca';
};

const EVIDENCE_CHIPS = [
  'Scattered experiments. Low learning per run.',
  'Optimization on a shifting baseline.',
  'Debate, not derivation, picks the next experiment.',
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProblemAtStage({ section }: ProblemAtStageProps) {
  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-[1240px] px-6 pt-24 pb-32 md:px-10 md:pt-32 md:pb-40 lg:px-14">
        <div className="max-w-[1040px]">
          <Eyebrow>Section {section.number} · The problem</Eyebrow>
          <h2 className="display-section mt-5 max-w-[14ch] text-ink-black md:max-w-none">
            {section.headline}
          </h2>
          <p className="body-xl mt-8 max-w-[980px] text-ink-graphite/78">
            {section.lead}
          </p>
        </div>

        <div className="mt-16 flex items-center gap-3">
          <span aria-hidden className="block h-px w-10 bg-line-hairline-cool" />
          <p className="mono-s tabular text-ink-ash">{section.itemsLabel}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {section.items.map((item, index) => (
            <DiagnosticCard
              key={item.index}
              index={item.index}
              title={item.title}
              caption={item.caption ?? item.body}
              visual={item.index}
              delayMs={index * 90}
            />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {EVIDENCE_CHIPS.map((chip) => (
            <div
              key={chip}
              className="border border-line-hairline-cool bg-neutral-50 px-5 py-4 text-[15px] leading-[1.45] tracking-[-0.008em] text-ink-black"
            >
              {chip}
            </div>
          ))}
        </div>

        {section.pivotLine && (
          <div className="mt-10 border-l-4 border-blue-500 bg-blue-50 px-6 py-5 text-[18px] font-medium tracking-[-0.01em] text-blue-900">
            {section.pivotLine}
          </div>
        )}
      </div>
    </section>
  );
}

function DiagnosticCard({
  index,
  title,
  caption,
  visual,
  delayMs,
}: {
  index: string;
  title: string;
  caption: string;
  visual: string;
  delayMs: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: reduced ? 0 : 0.55,
        delay: reduced ? 0 : delayMs / 1000,
        ease: EASE,
      }}
      className="rounded-md border border-line-hairline-cool bg-white p-6"
      style={{
        boxShadow: '0 1px 0 rgba(20,17,14,0.03), 0 18px 36px -24px rgba(65,64,252,0.16)',
      }}
    >
      <div className="flex items-center gap-3">
        <span aria-hidden className="block h-px w-8 bg-line-hairline-cool" />
        <span className="mono-s tabular text-ink-ash">{index}</span>
      </div>

      <div className="mt-6 flex h-[148px] items-center justify-center border-y border-line-hairline-cool/70">
        <Instrument visual={visual} />
      </div>

      <div className="mt-6">
        <h3 className="text-[20px] font-medium leading-tight tracking-[-0.016em] text-ink-black">
          {title}
        </h3>
        <p className="mono-s mt-3 text-ink-graphite">{caption}</p>
      </div>
    </motion.article>
  );
}

function Instrument({ visual }: { visual: string }) {
  switch (visual) {
    case '01':
      return <VariableLattice />;
    case '02':
      return <SignalNoise />;
    case '03':
      return <AssayDrift />;
    case '04':
      return <DesignMatrix />;
    default:
      return null;
  }
}

function VariableLattice() {
  const nodes = [
    { x: 36, y: 84, l: 'pH' },
    { x: 78, y: 52, l: 'DO' },
    { x: 118, y: 88, l: 'F' },
    { x: 160, y: 58, l: 'T' },
    { x: 198, y: 84, l: 'I' },
    { x: 240, y: 54, l: 'M' },
  ] as const;
  const edges: Array<[number, number]> = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 3], [1, 4], [2, 5],
  ];

  return (
    <svg viewBox="0 0 280 120" className="h-full w-full" role="img" aria-label="Coupled variables">
      {edges.map(([a, b], idx) => (
        <line
          key={idx}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#7473FD"
          strokeOpacity="0.32"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
      ))}
      {nodes.map((node) => (
        <g key={node.l}>
          <circle cx={node.x} cy={node.y} r="5" fill="#A1A1FE" stroke="#4140FC" strokeWidth="1" />
          <text x={node.x} y={node.y + 18} textAnchor="middle" fontSize="9" fontFamily="var(--font-jetbrains)" fill="#4A453E">
            {node.l}
          </text>
        </g>
      ))}
    </svg>
  );
}

function SignalNoise() {
  const points = [
    [24, 68], [44, 44], [64, 86], [84, 58], [104, 94], [124, 50],
    [144, 78], [164, 38], [184, 90], [204, 56], [224, 82], [244, 48],
  ] as const;
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point[0]} ${point[1]}`).join(' ');

  return (
    <svg viewBox="0 0 280 120" className="h-full w-full" role="img" aria-label="Signal hidden in noise">
      <rect x="20" y="34" width="236" height="56" fill="#A1A1FE" fillOpacity="0.18" />
      <rect x="20" y="60" width="236" height="6" fill="#14110E" fillOpacity="0.82" />
      <path d={path} fill="none" stroke="#0A07D4" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20" y1="104" x2="260" y2="104" stroke="#D1D1D3" strokeWidth="0.75" />
      <text x="264" y="62" fontSize="10" fontFamily="var(--font-newsreader)" fontStyle="italic" fill="#4A453E">σ</text>
      <text x="264" y="70" fontSize="10" fontFamily="var(--font-newsreader)" fontStyle="italic" fill="#14110E">ε</text>
    </svg>
  );
}

function AssayDrift() {
  const points = [
    [34, 34], [60, 40], [88, 48], [116, 55], [144, 62], [172, 71], [200, 79], [228, 86],
  ] as const;

  return (
    <svg viewBox="0 0 280 120" className="h-full w-full" role="img" aria-label="Assay drift">
      <line x1="20" y1="102" x2="260" y2="102" stroke="#D1D1D3" strokeWidth="0.75" />
      <line x1="20" y1="20" x2="20" y2="102" stroke="#D1D1D3" strokeWidth="0.75" />
      <line x1="26" y1="30" x2="250" y2="92" stroke="#0A07D4" strokeWidth="1.1" strokeDasharray="4 4" />
      {points.map((point, idx) => (
        <circle key={idx} cx={point[0]} cy={point[1]} r="3.2" fill="#4140FC" />
      ))}
      <line x1="84" y1="47" x2="84" y2="56" stroke="#14110E" strokeWidth="1.4" />
      <line x1="196" y1="76" x2="196" y2="85" stroke="#14110E" strokeWidth="1.4" />
      <text x="92" y="54" fontSize="9" fontFamily="var(--font-newsreader)" fontStyle="italic" fill="#14110E">Δε</text>
      <text x="204" y="83" fontSize="9" fontFamily="var(--font-newsreader)" fontStyle="italic" fill="#14110E">Δε</text>
    </svg>
  );
}

function DesignMatrix() {
  const cells = [
    [0, 0], [1, 0], [3, 0],
    [0, 1], [2, 1],
    [1, 2], [3, 2],
    [0, 3], [2, 3],
  ] as const;

  return (
    <svg viewBox="0 0 280 120" className="h-full w-full" role="img" aria-label="Sparse design matrix">
      <g transform="translate(56 18)">
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: 4 }, (_, col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 38}
              y={row * 22}
              width="26"
              height="14"
              fill={cells.some(([c, r]) => c === col && r === row) ? '#4140FC' : '#EFEFFF'}
              fillOpacity={cells.some(([c, r]) => c === col && r === row) ? '0.86' : '1'}
              stroke="#CDCDFE"
              strokeWidth="1"
            />
          )),
        )}
      </g>
      <path d="M220 30L242 30L242 92L220 92" fill="none" stroke="#8C8579" strokeWidth="1" strokeDasharray="3 3" />
      <text x="248" y="64" fontSize="9" fontFamily="var(--font-jetbrains)" fill="#4A453E">NO PRIOR</text>
    </svg>
  );
}
