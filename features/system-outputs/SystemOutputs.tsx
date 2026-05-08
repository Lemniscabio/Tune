'use client';

// §03 — What the method produces.
//
// 5 system artifacts presented as alternating left/right rows. Each artifact
// gets its own scientific signature visual — model schematic, operating region,
// campaign cadence, KPI uplift, recipe envelope. Strong rhythm via alternation.

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import type { SprintBlock as SprintBlockContent } from '@/content/schema';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';

type SystemOutputsProps = {
  section: SprintBlockContent;
  id?: string;
};

export function SystemOutputs({ section, id = 'how-outputs' }: SystemOutputsProps) {
  return (
    <section id={id} className="relative bg-white">
      {/* Top hairline as a structural break from §03 method */}
      <div className="mx-auto max-w-[1200px] px-6">
        <hr className="border-0 bg-line-hairline-cool h-px" />
      </div>
      <div className="mx-auto max-w-[1200px] px-6 pt-24 pb-32 md:pt-32 md:pb-40">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Section {section.number} · Outputs</Eyebrow>
            <h2 className="display-section mt-6 max-w-[16ch] text-ink-black">
              {section.headline}
            </h2>
          </div>
          <p className="body-l mt-2 max-w-[52ch] text-ink-graphite md:col-span-6 md:col-start-7 md:mt-1">
            {section.blockLabel === 'System outputs'
              ? 'Validated artifacts a paid engagement walks away with: the trained model, the operating region, and the recipe that captures both.'
              : section.blockLabel}
          </p>
        </div>

        {/* 5 artifact rows */}
        <div className="mt-20 space-y-16 md:mt-24 md:space-y-24">
          {section.deliverables.map((d, i) => (
            <ArtifactRow
              key={d.index}
              index={d.index}
              title={d.title}
              body={d.body}
              flipped={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Artifact row ───────────────────────────────────────────────────────────

function ArtifactRow({
  index,
  title,
  body,
  flipped,
}: {
  index: string;
  title: string;
  body: string;
  flipped: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px 0px' });
  const trigger = inView || Boolean(reduced);

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 ${flipped ? 'md:[&>:first-child]:order-2' : ''}`}
      initial={{ opacity: 0, y: 12 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Visual */}
      <div className={`md:col-span-6 ${flipped ? 'md:col-start-7' : ''}`}>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-line-hairline-cool bg-white">
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <ArtifactVisual index={index} trigger={trigger} reduced={Boolean(reduced)} />
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className={`md:col-span-5 md:self-center ${flipped ? 'md:col-start-1' : 'md:col-start-7'}`}>
        <p className="mono-s tabular text-ink-ash">
          output {index}
        </p>
        <h3 className="mt-4 max-w-[18ch] text-[28px] font-medium leading-[1.15] tracking-[-0.018em] text-ink-black">
          {title}
        </h3>
        <p className="body-m mt-5 max-w-[44ch] text-ink-graphite">{body}</p>
      </div>
    </motion.div>
  );
}

// ─── Per-artifact visual ────────────────────────────────────────────────────

function ArtifactVisual({
  index,
  trigger,
  reduced,
}: {
  index: string;
  trigger: boolean;
  reduced: boolean;
}) {
  switch (index) {
    case '01':
      return <HybridModelSchematic trigger={trigger} reduced={reduced} />;
    case '02':
      return <OperatingRegion trigger={trigger} reduced={reduced} />;
    case '03':
      return <CampaignCadence trigger={trigger} reduced={reduced} />;
    case '04':
      return <KpiUplift trigger={trigger} reduced={reduced} />;
    case '05':
      return <OperatingRecipe trigger={trigger} reduced={reduced} />;
    default:
      return null;
  }
}

// 01 · Trained hybrid model — three layered components: mechanistic priors,
// data-driven residuals, uncertainty halo. Connected by signal arrows.
function HybridModelSchematic({ trigger, reduced }: { trigger: boolean; reduced: boolean }) {
  return (
    <svg viewBox="0 0 400 280" className="h-full w-full">
      {/* Uncertainty halo */}
      <motion.ellipse
        cx={200}
        cy={140}
        rx={150}
        ry={108}
        fill="none"
        stroke="#A1A1FE"
        strokeWidth={0.7}
        strokeDasharray="3 4"
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 0.55 } : {}}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.05 }}
      />
      <motion.text
        x={350}
        y={62}
        fontSize={10}
        fontFamily="var(--font-jetbrains)"
        fill="#8C8579"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.7 }}
      >
        uncertainty
      </motion.text>

      {/* Mechanistic block (left) */}
      <motion.g
        initial={{ opacity: 0, x: -8 }}
        animate={trigger ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x={70} y={108} width={88} height={64} rx={4} fill="#FFFFFF" stroke="#4140FC" strokeWidth={1.2} />
        <text x={114} y={132} fontSize={11} fontFamily="var(--font-newsreader), serif" fontStyle="italic" fill="#14110E" textAnchor="middle">μ(x, θ)</text>
        <text x={114} y={150} fontSize={9} fontFamily="var(--font-jetbrains)" fill="#8C8579" textAnchor="middle" letterSpacing="0.05em">MECHANISTIC</text>
      </motion.g>

      {/* Data-driven residual block (right) */}
      <motion.g
        initial={{ opacity: 0, x: 8 }}
        animate={trigger ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x={242} y={108} width={88} height={64} rx={4} fill="#FFFFFF" stroke="#4140FC" strokeWidth={1.2} />
        <text x={286} y={132} fontSize={11} fontFamily="var(--font-newsreader), serif" fontStyle="italic" fill="#14110E" textAnchor="middle">f̂(x)</text>
        <text x={286} y={150} fontSize={9} fontFamily="var(--font-jetbrains)" fill="#8C8579" textAnchor="middle" letterSpacing="0.05em">DATA-DRIVEN</text>
      </motion.g>

      {/* Plus operator */}
      <motion.text
        x={200}
        y={147}
        fontSize={22}
        fontFamily="var(--font-newsreader), serif"
        fill="#0A07D4"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.5 }}
      >
        +
      </motion.text>

      {/* Output flow */}
      <motion.path
        d="M 200 178 L 200 222"
        fill="none"
        stroke="#4140FC"
        strokeWidth={1.2}
        markerEnd="url(#arrow-end)"
        initial={{ pathLength: 0 }}
        animate={trigger ? { pathLength: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.6 }}
      />
      <motion.text
        x={200}
        y={244}
        fontSize={10}
        fontFamily="var(--font-jetbrains)"
        fill="#0A07D4"
        textAnchor="middle"
        letterSpacing="0.05em"
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.85 }}
      >
        ŷ(x) ± σ
      </motion.text>

      <defs>
        <marker id="arrow-end" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={6} markerHeight={6} orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#4140FC" />
        </marker>
      </defs>
    </svg>
  );
}

// 02 · Validated operating region — 2D phase space (x₁, x₂) with a clearly
// bounded design space, KPI level contours inside, sample points densely
// covering the region. The opposite of §02's chaos.
function OperatingRegion({ trigger, reduced }: { trigger: boolean; reduced: boolean }) {
  const samples: Array<[number, number]> = [
    [110, 180], [140, 165], [170, 150], [200, 140], [230, 145], [260, 158],
    [290, 175], [320, 195], [180, 175], [220, 168], [250, 185], [200, 195],
    [230, 200], [160, 190], [280, 200], [210, 155], [240, 175], [270, 170],
  ];
  return (
    <svg viewBox="0 0 400 280" className="h-full w-full">
      {/* axes */}
      <line x1={40} y1={250} x2={370} y2={250} stroke="#D1D1D3" strokeWidth={0.75} />
      <line x1={40} y1={30} x2={40} y2={250} stroke="#D1D1D3" strokeWidth={0.75} />
      <text x={368} y={266} fontSize={10} fontFamily="var(--font-newsreader), serif" fontStyle="italic" fill="#8C8579" textAnchor="end">x₁</text>
      <text x={28} y={36} fontSize={10} fontFamily="var(--font-newsreader), serif" fontStyle="italic" fill="#8C8579">x₂</text>

      {/* design space outline */}
      <rect x={40} y={30} width={330} height={220} fill="none" stroke="#E5E5E7" strokeWidth={0.5} strokeDasharray="2 2" />

      {/* validated operating region — convex blob */}
      <motion.path
        d="M 100 200 Q 80 165 130 130 Q 180 100 240 110 Q 320 125 340 175 Q 330 220 270 220 Q 180 230 100 200 Z"
        fill="#A1A1FE"
        fillOpacity={0.3}
        stroke="#0A07D4"
        strokeWidth={1.2}
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.1 }}
      />
      {/* inner KPI contour */}
      <motion.path
        d="M 170 175 Q 160 150 210 142 Q 280 145 290 180 Q 250 200 210 195 Q 175 195 170 175 Z"
        fill="none"
        stroke="#0A07D4"
        strokeOpacity={0.6}
        strokeWidth={0.8}
        strokeDasharray="3 3"
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.3 }}
      />

      {/* sample points */}
      {samples.map((p, i) => (
        <motion.circle
          key={i}
          cx={p[0]}
          cy={p[1]}
          r={2.5}
          fill="#0A07D4"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={trigger ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: reduced ? 0 : 0.3,
            delay: reduced ? 0 : 0.45 + i * 0.025,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: `${p[0]}px ${p[1]}px`, transformBox: 'fill-box' }}
        />
      ))}

      {/* Optimum marker */}
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={trigger ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 1.1 }}
        style={{ transformOrigin: '230px 168px', transformBox: 'fill-box' }}
      >
        <circle cx={230} cy={168} r={5} fill="#FBFC40" stroke="#0A07D4" strokeWidth={1.2} />
        <text x={244} y={172} fontSize={10} fontFamily="var(--font-jetbrains)" fill="#0A07D4" letterSpacing="0.05em">OPTIMUM</text>
      </motion.g>

      <text x={70} y={60} fontSize={10} fontFamily="var(--font-jetbrains)" fill="#0A07D4" letterSpacing="0.05em">VALIDATED</text>
    </svg>
  );
}

// 03 · Adaptive experiment campaigns — 3-6 iteration markers along a horizontal
// timeline, each iteration: design → run → update annotated.
function CampaignCadence({ trigger, reduced }: { trigger: boolean; reduced: boolean }) {
  const cycles = [1, 2, 3, 4, 5, 6];
  return (
    <svg viewBox="0 0 400 280" className="h-full w-full">
      {/* timeline */}
      <motion.line
        x1={40}
        y1={140}
        x2={360}
        y2={140}
        stroke="#A1A1FE"
        strokeWidth={1}
        strokeDasharray="3 3"
        initial={{ pathLength: 0 }}
        animate={trigger ? { pathLength: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.05 }}
      />

      {/* cycles */}
      {cycles.map((c, i) => {
        const x = 60 + i * 56;
        return (
          <motion.g
            key={c}
            initial={{ opacity: 0, y: 6 }}
            animate={trigger ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: reduced ? 0 : 0.4,
              delay: reduced ? 0 : 0.2 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <circle cx={x} cy={140} r={9} fill="#FFFFFF" stroke="#4140FC" strokeWidth={1.2} />
            <text x={x} y={144} fontSize={10} fontFamily="var(--font-jetbrains)" fill="#0A07D4" textAnchor="middle">{c}</text>

            {/* design → run → update mini-tags above the cycle marker */}
            <line x1={x} y1={130} x2={x} y2={108} stroke="#A1A1FE" strokeWidth={0.6} strokeDasharray="2 2" />
            <text x={x} y={102} fontSize={7.5} fontFamily="var(--font-jetbrains)" fill="#4A453E" textAnchor="middle" letterSpacing="0.05em">DESIGN</text>
            <text x={x} y={91} fontSize={7.5} fontFamily="var(--font-jetbrains)" fill="#4A453E" textAnchor="middle" letterSpacing="0.05em">RUN</text>
            <text x={x} y={80} fontSize={7.5} fontFamily="var(--font-jetbrains)" fill="#4A453E" textAnchor="middle" letterSpacing="0.05em">UPDATE</text>

            {/* learning indicator below — line shrinking with each cycle (uncertainty narrows) */}
            <line
              x1={x - 10 + i * 0.8}
              y1={170}
              x2={x + 10 - i * 0.8}
              y2={170}
              stroke="#0A07D4"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </motion.g>
        );
      })}

      {/* range bracket */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.95 }}
      >
        <line x1={60} y1={208} x2={340} y2={208} stroke="#8C8579" strokeWidth={0.6} />
        <line x1={60} y1={208} x2={60} y2={214} stroke="#8C8579" strokeWidth={0.6} />
        <line x1={340} y1={208} x2={340} y2={214} stroke="#8C8579" strokeWidth={0.6} />
        <text x={200} y={228} fontSize={10} fontFamily="var(--font-jetbrains)" fill="#4A453E" textAnchor="middle" letterSpacing="0.05em">3–6 ITERATIONS</text>
      </motion.g>

      {/* learning per cycle label */}
      <text x={200} y={260} fontSize={9} fontFamily="var(--font-newsreader), serif" fontStyle="italic" fill="#8C8579" textAnchor="middle">uncertainty narrows per cycle</text>
    </svg>
  );
}

// 04 · Measured KPI uplift — before/after bars with confidence interval.
function KpiUplift({ trigger, reduced }: { trigger: boolean; reduced: boolean }) {
  return (
    <svg viewBox="0 0 400 280" className="h-full w-full">
      {/* axes */}
      <line x1={50} y1={240} x2={370} y2={240} stroke="#D1D1D3" strokeWidth={0.75} />
      <line x1={50} y1={40} x2={50} y2={240} stroke="#D1D1D3" strokeWidth={0.75} />
      <text x={28} y={46} fontSize={10} fontFamily="var(--font-newsreader), serif" fontStyle="italic" fill="#8C8579">KPI</text>

      {/* baseline bar */}
      <motion.rect
        x={120}
        y={170}
        width={60}
        height={70}
        fill="#A1A1FE"
        fillOpacity={0.4}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={trigger ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.1 }}
        style={{ transformOrigin: '120px 240px', transformBox: 'fill-box' }}
      />
      {/* baseline error bar */}
      <line x1={150} y1={148} x2={150} y2={192} stroke="#4A453E" strokeWidth={1} />
      <line x1={142} y1={148} x2={158} y2={148} stroke="#4A453E" strokeWidth={1} />
      <line x1={142} y1={192} x2={158} y2={192} stroke="#4A453E" strokeWidth={1} />

      {/* uplift bar */}
      <motion.rect
        x={240}
        y={70}
        width={60}
        height={170}
        fill="#0A07D4"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={trigger ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.4 }}
        style={{ transformOrigin: '240px 240px', transformBox: 'fill-box' }}
      />
      {/* uplift error bar */}
      <line x1={270} y1={56} x2={270} y2={86} stroke="#FFFFFF" strokeWidth={1.2} />
      <line x1={262} y1={56} x2={278} y2={56} stroke="#FFFFFF" strokeWidth={1.2} />
      <line x1={262} y1={86} x2={278} y2={86} stroke="#FFFFFF" strokeWidth={1.2} />

      {/* labels */}
      <text x={150} y={258} fontSize={10} fontFamily="var(--font-jetbrains)" fill="#4A453E" textAnchor="middle" letterSpacing="0.05em">BASELINE</text>
      <text x={270} y={258} fontSize={10} fontFamily="var(--font-jetbrains)" fill="#0A07D4" textAnchor="middle" letterSpacing="0.05em">VALIDATED</text>

      {/* uplift arrow */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 1.05 }}
      >
        <line x1={200} y1={150} x2={232} y2={120} stroke="#0A07D4" strokeWidth={1.25} strokeLinecap="round" />
        <path d="M 226 116 L 234 118 L 232 126" fill="none" stroke="#0A07D4" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
        <text x={196} y={104} fontSize={10} fontFamily="var(--font-jetbrains)" fill="#0A07D4" letterSpacing="0.05em">UPLIFT</text>
      </motion.g>

      <text x={210} y={28} fontSize={9} fontFamily="var(--font-newsreader), serif" fontStyle="italic" fill="#8C8579" textAnchor="middle">titre · yield · productivity (with confidence)</text>
    </svg>
  );
}

// 05 · Operating recipe + envelope — process timeline strip with parameter
// boundaries (upper/lower limits) and setpoint trace through it.
function OperatingRecipe({ trigger, reduced }: { trigger: boolean; reduced: boolean }) {
  const phases = [
    { x: 60, w: 70, label: 'INOC' },
    { x: 130, w: 90, label: 'GROWTH' },
    { x: 220, w: 90, label: 'INDUCTION' },
    { x: 310, w: 50, label: 'HARVEST' },
  ];
  return (
    <svg viewBox="0 0 400 280" className="h-full w-full">
      {/* axis */}
      <line x1={40} y1={220} x2={370} y2={220} stroke="#D1D1D3" strokeWidth={0.75} />
      <text x={28} y={102} fontSize={10} fontFamily="var(--font-newsreader), serif" fontStyle="italic" fill="#8C8579">μ</text>
      <text x={368} y={240} fontSize={9} fontFamily="var(--font-jetbrains)" fill="#8C8579" textAnchor="end">time →</text>

      {/* envelope band — upper/lower limits */}
      <motion.path
        d="M 60 60 L 130 70 L 220 90 L 310 110 L 360 105 L 360 175 L 310 165 L 220 150 L 130 130 L 60 125 Z"
        fill="#A1A1FE"
        fillOpacity={0.22}
        stroke="#A1A1FE"
        strokeWidth={0.7}
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.1 }}
      />

      {/* setpoint trace through the envelope */}
      <motion.path
        d="M 60 92 L 90 88 L 130 100 L 170 96 L 220 120 L 270 130 L 310 138 L 350 135"
        fill="none"
        stroke="#0A07D4"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={trigger ? { pathLength: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.35, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* setpoint markers */}
      {[60, 130, 220, 310].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={i === 0 ? 92 : i === 1 ? 100 : i === 2 ? 120 : 138}
          r={2.5}
          fill="#0A07D4"
          initial={{ opacity: 0 }}
          animate={trigger ? { opacity: 1 } : {}}
          transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.6 + i * 0.1 }}
        />
      ))}

      {/* phase labels */}
      {phases.map((p, i) => (
        <motion.g
          key={p.label}
          initial={{ opacity: 0 }}
          animate={trigger ? { opacity: 1 } : {}}
          transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.95 + i * 0.05 }}
        >
          <line x1={p.x} y1={220} x2={p.x} y2={228} stroke="#8C8579" strokeWidth={0.6} />
          <text x={p.x + p.w / 2} y={244} fontSize={8.5} fontFamily="var(--font-jetbrains)" fill="#4A453E" textAnchor="middle" letterSpacing="0.05em">{p.label}</text>
        </motion.g>
      ))}

      {/* envelope label */}
      <motion.text
        x={336}
        y={105}
        fontSize={9}
        fontFamily="var(--font-jetbrains)"
        fill="#4A453E"
        letterSpacing="0.05em"
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 1.2 }}
        textAnchor="end"
      >
        ENVELOPE
      </motion.text>

      <text x={70} y={36} fontSize={9} fontFamily="var(--font-newsreader), serif" fontStyle="italic" fill="#8C8579">SOP-ready · scale-aware</text>
    </svg>
  );
}
