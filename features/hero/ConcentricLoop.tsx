'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

type LoopStep = {
  number: string;
  label: string;
};

const STEPS: readonly LoopStep[] = [
  { number: '01', label: 'Initial design' },
  { number: '02', label: 'Run experiments' },
  { number: '03', label: 'Train hybrid model' },
  { number: '04', label: 'Adaptive optimization' },
  { number: '05', label: 'Recommend next runs' },
  { number: '06', label: 'Update feasible region' },
] as const;

const STEP_NOTES: readonly string[] = [
  'Select the first design from current process evidence.',
  'Capture structured run data against the active design.',
  'Fit the hybrid model and update uncertainty.',
  'Choose the highest-learning move inside constraints.',
  'Return the next experiment set with rationale.',
  'Narrow the operating region for the next cycle.',
] as const;

const STEP_HOLD_MS = 3200;
const ARC_TRAVEL_MS = 1250;
const STEP_COUNT = STEPS.length;
const VIEW_BOX = 560;
const CENTER = VIEW_BOX / 2;
const LOOP_RADIUS = 196;
const NODE_RADIUS = 13;
const INNER_RINGS = [70, 104, 138] as const;
const TICK_COUNT = 96;
const EASE = [0.4, 0, 0.2, 1] as const;

function roundCoord(value: number) {
  return Number(value.toFixed(3));
}

const ticks = Array.from({ length: TICK_COUNT }, (_, index) => {
  const angle = (index / TICK_COUNT) * 360 - 90;
  const major = index % 6 === 0;
  return {
    angle,
    major,
    inner: LOOP_RADIUS + (major ? 13 : 17),
    outer: LOOP_RADIUS + 24,
  };
});

const gridDots = Array.from({ length: 13 * 13 }, (_, index) => {
  const col = index % 13;
  const row = Math.floor(index / 13);
  return {
    x: CENTER - 156 + col * 26,
    y: CENTER - 156 + row * 26,
  };
}).filter(({ x, y }) => {
  const dx = x - CENTER;
  const dy = y - CENTER;
  return Math.sqrt(dx * dx + dy * dy) < LOOP_RADIUS - 22;
});

function pointAt(radius: number, angleDeg: number) {
  const angle = (angleDeg * Math.PI) / 180;
  return {
    x: roundCoord(CENTER + radius * Math.cos(angle)),
    y: roundCoord(CENTER + radius * Math.sin(angle)),
  };
}

function arcPath(radius: number, fromDeg: number, toDeg: number) {
  const normalizedToDeg = toDeg <= fromDeg ? toDeg + 360 : toDeg;
  const start = pointAt(radius, fromDeg);
  const end = pointAt(radius, normalizedToDeg);
  const largeArc = Math.abs(normalizedToDeg - fromDeg) > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export function ConcentricLoop() {
  return <OptimizationLoopVisual />;
}

function OptimizationLoopVisual() {
  const reduced = useReducedMotion();
  const [state, setState] = useState<{
    activeIndex: number;
    targetIndex: number | null;
    iteration: number;
  }>({ activeIndex: 0, targetIndex: null, iteration: 0 });

  useEffect(() => {
    if (reduced) return;
    if (state.targetIndex !== null) return;

    const holdTimer = window.setTimeout(() => {
      setState((current) => ({
        ...current,
        targetIndex: (current.activeIndex + 1) % STEP_COUNT,
      }));
    }, STEP_HOLD_MS);

    return () => window.clearTimeout(holdTimer);
  }, [reduced, state.activeIndex, state.targetIndex]);

  const activeStep = STEPS[state.activeIndex];
  const previousStepIndex = (state.activeIndex + STEP_COUNT - 1) % STEP_COUNT;
  const restingArcStart = -90 + previousStepIndex * 60 + 8;
  const restingArcEnd = -90 + state.activeIndex * 60 - 8;
  const travelTargetIndex = state.targetIndex ?? state.activeIndex;
  const activeArcStart = -90 + state.activeIndex * 60 + 8;
  const activeArcEnd = -90 + travelTargetIndex * 60 - 8;
  const confidenceScale = 1 - state.activeIndex * 0.035;
  const isUpdateStep = state.activeIndex === STEP_COUNT - 1;
  const isTraveling = state.targetIndex !== null;

  function commitTargetStep() {
    setState((current) => {
      const { targetIndex, iteration } = current;
      if (targetIndex === null) {
        return current;
      }

      return {
        activeIndex: targetIndex,
        targetIndex: null,
        iteration: iteration + (targetIndex === 0 ? 1 : 0),
      };
    });
  }

  return (
    <figure
      className="relative mx-auto aspect-square w-full max-w-[380px] sm:max-w-[460px] md:max-w-[520px]"
      aria-label="Six-step closed-loop optimization process"
    >
      <svg
        viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        role="img"
      >
        <title>OPTDOE closed-loop optimization instrument</title>

        <circle
          cx={CENTER}
          cy={CENTER}
          r={LOOP_RADIUS + 38}
          fill="rgba(3,2,122,0.16)"
          stroke="rgba(205,205,254,0.16)"
          strokeWidth={1.1}
        />

        {gridDots.map((dot) => (
          <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r={1.1} fill="#A1A1FE" opacity={0.18} />
        ))}

        {ticks.map((tick) => {
          const start = pointAt(tick.inner, tick.angle);
          const end = pointAt(tick.outer, tick.angle);
          return (
            <line
              key={tick.angle}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="#CDCDFE"
              strokeOpacity={tick.major ? 0.48 : 0.26}
              strokeWidth={tick.major ? 1.05 : 0.7}
              strokeLinecap="round"
            />
          );
        })}

        <circle
          cx={CENTER}
          cy={CENTER}
          r={LOOP_RADIUS}
          fill="none"
          stroke="rgba(205,205,254,0.52)"
          strokeWidth={1.45}
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={LOOP_RADIUS + 8}
          fill="none"
          stroke="rgba(161,161,254,0.26)"
          strokeWidth={0.95}
          strokeDasharray="2 7"
        />

        {STEPS.map((_, index) => {
          const from = -90 + index * 60 + 10;
          const to = -90 + ((index + 1) % STEP_COUNT) * 60 - 10;
          return (
            <path
              key={index}
              d={arcPath(LOOP_RADIUS, from, to)}
              fill="none"
              stroke="#A1A1FE"
              strokeOpacity={0.58}
              strokeWidth={1.45}
            />
          );
        })}

        <AnimatePresence mode="wait">
          {isTraveling ? (
            <g key={`travel-${state.iteration}-${state.activeIndex}-${travelTargetIndex}`}>
              <motion.path
                d={arcPath(LOOP_RADIUS, activeArcStart, activeArcEnd)}
                fill="none"
                stroke="#FBFC40"
                strokeWidth={2.4}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: ARC_TRAVEL_MS / 1000, ease: EASE }}
                onAnimationComplete={commitTargetStep}
              />
            </g>
          ) : (
            <motion.path
              key={`rest-${state.iteration}-${state.activeIndex}`}
              d={arcPath(LOOP_RADIUS, restingArcStart, restingArcEnd)}
              fill="none"
              stroke="#FBFC40"
              strokeWidth={2.4}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
            />
          )}
        </AnimatePresence>

        <FeasibleRegionRings scale={confidenceScale} reduced={Boolean(reduced)} />

        {STEPS.map((step, index) => (
          <StepNode
            key={step.number}
            step={step}
            index={index}
            active={index === state.activeIndex}
            reduced={Boolean(reduced)}
          />
        ))}

      </svg>

      <CurrentStepCard
        step={activeStep}
        note={STEP_NOTES[state.activeIndex]}
        isUpdateStep={isUpdateStep}
        reduced={Boolean(reduced)}
      />
    </figure>
  );
}

function StepNode({
  step,
  index,
  active,
  reduced,
}: {
  step: LoopStep;
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  const angle = -90 + index * 60;
  const node = pointAt(LOOP_RADIUS, angle);
  const label = pointAt(LOOP_RADIUS + 34, angle);
  const anchor = label.x < CENTER - 30 ? 'end' : label.x > CENTER + 30 ? 'start' : 'middle';
  const labelNudgeY = index === 0 ? -4 : index === 3 ? 13 : 5;
  const words = step.label.split(' ');

  return (
    <g>
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={NODE_RADIUS + 6}
        fill="#FBFC40"
        initial={false}
        animate={{ opacity: active ? 0.16 : 0, scale: active ? 1 : 0.9 }}
        transition={{ duration: reduced ? 0 : 0.8, ease: EASE }}
        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
      />
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={NODE_RADIUS}
        fill={active ? '#FBFC40' : '#03027A'}
        stroke={active ? '#FBFC40' : '#A1A1FE'}
        initial={false}
        animate={{
          opacity: active ? 1 : 0.82,
          scale: active ? 1.03 : 1,
          strokeWidth: active ? 1.7 : 1.15,
        }}
        transition={{ duration: reduced ? 0 : 0.8, ease: EASE }}
        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
      />
      <text
        x={node.x}
        y={node.y + 4}
        textAnchor="middle"
        className="select-none font-mono text-[12px] font-medium tabular-nums"
        fill={active ? '#14110E' : '#CDCDFE'}
      >
        {step.number}
      </text>
      <motion.text
        x={label.x}
        y={label.y + labelNudgeY}
        textAnchor={anchor}
        className="select-none font-mono text-[13px] tabular-nums"
        fill={active ? '#FBFC40' : '#CDCDFE'}
        initial={false}
        animate={{ opacity: active ? 1 : 0.7 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
      >
        {words.map((word, wordIndex) => (
          <tspan
            key={wordIndex}
            x={label.x}
            dy={wordIndex === 0 ? 0 : 12}
          >
            {word}
          </tspan>
        ))}
      </motion.text>
    </g>
  );
}

function CurrentStepCard({
  step,
  note,
  isUpdateStep,
  reduced,
}: {
  step: LoopStep;
  note: string;
  isUpdateStep: boolean;
  reduced: boolean;
}) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 size-[156px] -translate-x-1/2 -translate-y-1/2 sm:size-[176px] md:size-[188px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: reduced ? 0 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -4 }}
          transition={{ duration: reduced ? 0 : 0.62, ease: EASE }}
          className="flex size-full flex-col items-center justify-center rounded-full border px-6 text-center shadow-[0_18px_40px_-26px_rgba(3,2,122,0.78)]"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' }}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-blue-700/72">
            {step.number} / 06
          </p>
          <p className="mt-3 text-[15px] font-medium leading-tight tracking-[-0.005em] text-blue-900 sm:text-[16px]">
            {step.label}
          </p>
          <p className="mt-3 line-clamp-3 text-[10px] leading-snug text-blue-900/58 sm:text-[11px]">
            {note}
          </p>
          <p className="mt-3 font-mono text-[7px] uppercase tracking-[0.12em] text-blue-700/48 sm:text-[8px]">
            {isUpdateStep ? 'MODEL UPDATE' : 'ITERATIVE LOOP'}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function FeasibleRegionRings({ scale, reduced }: { scale: number; reduced: boolean }) {
  return (
    <g>
      {INNER_RINGS.map((radius, index) => (
        <motion.circle
          key={index}
          cx={CENTER}
          cy={CENTER}
          r={radius}
          fill="none"
          stroke="#A1A1FE"
          strokeOpacity={0.2 - index * 0.025}
          strokeWidth={0.9}
          strokeDasharray="1 4"
          initial={false}
          animate={{ scale }}
          transition={{ duration: reduced ? 0 : 1.05, ease: EASE }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />
      ))}
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={42}
        fill="none"
        stroke="#FBFC40"
        strokeOpacity={0.2}
        strokeWidth={1}
        initial={false}
        animate={{ scale: 0.86 + scale * 0.14 }}
        transition={{ duration: reduced ? 0 : 1.05, ease: EASE }}
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
      />
    </g>
  );
}
