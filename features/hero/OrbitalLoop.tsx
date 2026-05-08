'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

// OPTDOE technical loop — six iterative stages.
const STEPS = [
  'Initial design',
  'Run experiments',
  'Train hybrid model',
  'Adaptive optimization',
  'Recommend next runs',
  'Update feasible region',
] as const;

const N = STEPS.length;
const CX = 200;
const CY = 200;
const R = 138;
// Start at top (-90°), step clockwise.
const angleAt = (i: number) => (-90 + (360 / N) * i) * (Math.PI / 180);
const pointAt = (i: number) => ({
  x: CX + R * Math.cos(angleAt(i)),
  y: CY + R * Math.sin(angleAt(i)),
});

const STEP_MS = 1900;
const PULSE_DUR = 1.2;

export function OrbitalLoop() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % N);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  // Whether we just wrapped from N-1 → 0 (triggers the model-update flash).
  const wrapped = active === 0;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE45E" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FFE45E" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFE45E" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE45E" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFE45E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Model-update flash — full-circle bloom on wrap (active === 0) */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="#FFE45E"
          strokeWidth={1}
          initial={{ opacity: 0, scale: 1 }}
          animate={
            wrapped && !reduced
              ? { opacity: [0, 0.55, 0], scale: [1, 1.06, 1.1] }
              : { opacity: 0 }
          }
          transition={{ duration: 1.0, ease: 'easeOut' }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Guide ring — hairline */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1}
        />

        {/* Tick segments — subtle dashed inner ring for instrument feel */}
        <circle
          cx={CX}
          cy={CY}
          r={R - 14}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={0.75}
          strokeDasharray="2 6"
        />

        {/* Traveling pulse — animates from previous node to active node */}
        <Pulse activeIndex={active} reduced={Boolean(reduced)} />

        {/* Nodes */}
        {STEPS.map((_, i) => {
          const { x, y } = pointAt(i);
          const isActive = i === active;
          const isPast = !isActive && (i < active || (active === 0 && i === N - 1));
          return (
            <g key={i}>
              {isActive && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r={22}
                  fill="url(#nodeGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                />
              )}
              <motion.circle
                cx={x}
                cy={y}
                r={isActive ? 11 : 8}
                fill={isActive ? '#FFE45E' : 'rgba(10,7,212,0.35)'}
                stroke={isActive ? '#FFE45E' : isPast ? 'rgba(255,228,94,0.55)' : 'rgba(255,255,255,0.5)'}
                strokeWidth={isActive ? 0 : 1.25}
                animate={{
                  r: isActive ? 11 : 8,
                  scale: isActive ? [1, 1.18, 1] : 1,
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
              <text
                x={x}
                y={y + 0.5}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="'JetBrains Mono', monospace"
                fontSize="10"
                fontWeight={500}
                fill={isActive ? '#03027A' : 'rgba(255,255,255,0.65)'}
                style={{ letterSpacing: '0.02em' }}
              >
                {String(i + 1).padStart(2, '0')}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Center readout — crossfades on step change */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <p
          className="font-mono text-[10px] font-medium tracking-[0.18em] uppercase text-blue-200"
          style={{ letterSpacing: '0.18em' }}
        >
          OPTDOE loop
        </p>
        <div className="relative mt-3 h-[64px] w-full max-w-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="font-mono text-[11px] tabular-nums text-blue-200"
                style={{ letterSpacing: '0.12em' }}
              >
                STEP {String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
              </p>
              <p className="mt-2 max-w-[18ch] text-[16px] leading-tight font-medium text-white">
                {STEPS[active]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <p
          className="mt-3 font-mono text-[10px] italic text-blue-200/70"
          style={{ letterSpacing: '0.04em' }}
        >
          model update → next iteration
        </p>
      </div>
    </div>
  );
}

// ─── Traveling pulse ────────────────────────────────────────────────────────
// Animates a bright dot along the arc between consecutive nodes.

function Pulse({ activeIndex, reduced }: { activeIndex: number; reduced: boolean }) {
  // The pulse animates from the previous node into the active node each cycle.
  const prev = (activeIndex - 1 + N) % N;
  const a0 = angleAt(prev);
  const a1 = angleAt(activeIndex);
  // Always sweep forward (clockwise / positive direction); add 2π if needed.
  const sweep = a1 > a0 ? a1 - a0 : a1 - a0 + 2 * Math.PI;

  // Build an SVG path along the arc from prev → active.
  const startX = CX + R * Math.cos(a0);
  const startY = CY + R * Math.sin(a0);
  const endX = CX + R * Math.cos(a1);
  const endY = CY + R * Math.sin(a1);
  const largeArc = sweep > Math.PI ? 1 : 0;
  const arcPath = `M ${startX} ${startY} A ${R} ${R} 0 ${largeArc} 1 ${endX} ${endY}`;

  if (reduced) return null;

  return (
    <g key={activeIndex}>
      {/* Bright tracer dot */}
      <motion.circle r={5} fill="#FFE45E">
        <animateMotion
          dur={`${PULSE_DUR}s`}
          repeatCount="1"
          fill="freeze"
          path={arcPath}
        />
      </motion.circle>
      {/* Glow halo */}
      <motion.circle r={14} fill="url(#pulseGlow)" opacity={0.85}>
        <animateMotion
          dur={`${PULSE_DUR}s`}
          repeatCount="1"
          fill="freeze"
          path={arcPath}
        />
      </motion.circle>
      {/* Arc trail — segment fades in then dims */}
      <motion.path
        d={arcPath}
        fill="none"
        stroke="#FFE45E"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.9 }}
        animate={{ pathLength: 1, opacity: [0.9, 0.9, 0.25] }}
        transition={{ duration: PULSE_DUR, ease: 'easeInOut', times: [0, 0.7, 1] }}
      />
    </g>
  );
}
