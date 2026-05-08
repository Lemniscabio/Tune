'use client';

// Calibration / progress instrument. Restraint over decoration.
//
// Geometry: hub → needle → tick → leader → label, as one continuous reading.
// All ticks share a horizontal leader line ending at a strict label column;
// labels sit in a fixed-width column with vertical alignment to their tick.
//
// Behavior in §01:
//  - Scroll across the page sets the active tick via IntersectionObserver.
//  - Clicking a tick/label is LOCAL ONLY — sweeps the needle, illuminates the
//    tick. No route navigation, no scroll-jump.

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import type { SectionTocItem } from '@/content/schema';

type RadialDialProps = {
  items: readonly SectionTocItem[];
  activeNumber: string;
};

// Geometry — hub is positioned inside the viewBox so the reading
// hub → needle → tick → leader → label is visible end-to-end.
const VIEW_W = 460;
const VIEW_H = 520;
const CENTER_X = 50;
const CENTER_Y = 260;
const R_ARC = 260;
const R_GUIDE = 215;
const R_TICK_OUTER = 270;
const R_TICK_OUTER_ACTIVE = 276;

const LEADER_END_X = 322;
const LABEL_LEFT_X = 332;

const ANGLE_START = -70;
const ANGLE_END = 70;

const r3 = (n: number) => Math.round(n * 1000) / 1000;
const deg = (d: number) => (d * Math.PI) / 180;

function pointAt(radius: number, angleDeg: number) {
  const a = deg(angleDeg);
  return {
    x: r3(CENTER_X + radius * Math.cos(a)),
    y: r3(CENTER_Y + radius * Math.sin(a)),
  };
}

function arcPath(radius: number, fromDeg: number, toDeg: number) {
  const start = pointAt(radius, fromDeg);
  const end = pointAt(radius, toDeg);
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  const sweep = toDeg > fromDeg ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} ${sweep} ${end.x} ${end.y}`;
}

export function RadialDial({ items, activeNumber }: RadialDialProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(activeNumber);

  const count = items.length;
  const angles = useMemo(
    () =>
      items.map((_, i) => {
        if (count === 1) return (ANGLE_START + ANGLE_END) / 2;
        return ANGLE_START + (i / (count - 1)) * (ANGLE_END - ANGLE_START);
      }),
    [items, count],
  );

  const activeIndex = Math.max(0, items.findIndex((i) => i.number === active));
  const activeAngle = angles[activeIndex];

  // Needle: hub → exactly the active tick's outer tip. One continuous line.
  const needleEnd = pointAt(R_TICK_OUTER_ACTIVE, activeAngle);

  // Drive `active` via IntersectionObserver — narrative-flow tracking.
  useEffect(() => {
    const observed: { id: string; number: string; el: HTMLElement }[] = [];
    items.forEach((item) => {
      if (!item.anchor) return;
      const id = item.anchor.replace('#', '');
      const el = document.getElementById(id);
      if (el) observed.push({ id, number: item.number, el });
    });
    if (observed.length === 0) return;

    const visible = new Map<string, number>();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        });
        if (visible.size > 0) {
          const [topId] = [...visible.entries()].sort((a, b) => a[1] - b[1])[0];
          const match = observed.find((o) => o.id === topId);
          if (match) setActive(match.number);
        }
      },
      { rootMargin: '-30% 0px -65% 0px', threshold: 0 },
    );

    observed.forEach((o) => obs.observe(o.el));
    return () => obs.disconnect();
  }, [items]);

  // Local-only click — no navigation, no scroll-jump.
  const handleTickClick = (number: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActive(number);
  };

  return (
    <div
      className="relative ml-auto h-[520px] w-[460px] max-w-full"
      aria-label="Page sections"
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full overflow-visible"
        role="presentation"
      >
        {/* Guide arc — one subtle dashed line behind the primary arc. */}
        <motion.path
          d={arcPath(R_GUIDE, ANGLE_START - 2, ANGLE_END + 2)}
          fill="none"
          stroke="#A1A1FE"
          strokeOpacity={0.22}
          strokeWidth={0.6}
          strokeDasharray="2 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        />

        {/* Primary arc — the spine. */}
        <motion.path
          d={arcPath(R_ARC, ANGLE_START - 1, ANGLE_END + 1)}
          fill="none"
          stroke="#A1A1FE"
          strokeOpacity={0.7}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
        />

        {/* Major ticks + leader lines — every tick has a leader to the label column,
            so the relationship tick ↔ label reads as one structural element. */}
        {items.map((item, i) => {
          const angle = angles[i];
          const isActive = item.number === active;
          const tickInner = pointAt(R_ARC - 3, angle);
          const tickOuter = pointAt(isActive ? R_TICK_OUTER_ACTIVE : R_TICK_OUTER, angle);
          // Leader horizontal line at the same y as the tick.
          const leaderY = pointAt(R_ARC, angle).y;

          return (
            <g key={item.number}>
              <motion.line
                x1={tickInner.x}
                y1={tickInner.y}
                x2={tickOuter.x}
                y2={tickOuter.y}
                stroke={isActive ? '#FBFC40' : '#A1A1FE'}
                strokeOpacity={isActive ? 1 : 0.85}
                strokeWidth={isActive ? 2 : 1}
                strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{
                  duration: reduced ? 0 : 0.35,
                  delay: reduced ? 0 : 0.55 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
              <motion.line
                x1={tickOuter.x}
                y1={leaderY}
                x2={LEADER_END_X}
                y2={leaderY}
                stroke={isActive ? '#FBFC40' : '#A1A1FE'}
                strokeOpacity={isActive ? 0.55 : 0.22}
                strokeWidth={0.6}
                strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{
                  duration: reduced ? 0 : 0.35,
                  delay: reduced ? 0 : 0.65 + i * 0.06,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </g>
          );
        })}

        {/* Needle — hub center to active tick's outer tip. Continuous line. */}
        <motion.line
          stroke="#FBFC40"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{
            opacity: 0,
            x1: CENTER_X,
            y1: CENTER_Y,
            x2: needleEnd.x,
            y2: needleEnd.y,
          }}
          animate={{
            opacity: 1,
            x1: CENTER_X,
            y1: CENTER_Y,
            x2: needleEnd.x,
            y2: needleEnd.y,
          }}
          transition={{
            opacity: { duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.95 },
            default: reduced
              ? { duration: 0 }
              : { type: 'spring', stiffness: 70, damping: 18, mass: 0.8 },
          }}
        />

        {/* Hub — pivot point. Filled core ring sits on the needle's origin. */}
        <circle cx={CENTER_X} cy={CENTER_Y} r={5} fill="none" stroke="#A1A1FE" strokeWidth={0.75} />
        <circle cx={CENTER_X} cy={CENTER_Y} r={2} fill="#FBFC40" />
      </svg>

      {/* Labels — strict column, vertically aligned to each tick.
          Container is a 400×520 surface so the SVG-unit positions map 1:1 to pixels
          (preserveAspectRatio: xMidYMid meet — same aspect ratio as the container). */}
      <div className="absolute inset-0">
        {items.map((item, i) => {
          const angle = angles[i];
          const tickY = pointAt(R_ARC, angle).y;
          const isActive = item.number === active;
          return (
            <motion.div
              key={item.number}
              className="absolute"
              style={{
                left: `${(LABEL_LEFT_X / VIEW_W) * 100}%`,
                top: `${(tickY / VIEW_H) * 100}%`,
                width: `${((VIEW_W - LABEL_LEFT_X - 8) / VIEW_W) * 100}%`,
                transform: 'translateY(-50%)',
              }}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: reduced ? 0 : 0.3,
                delay: reduced ? 0 : 0.7 + i * 0.06,
              }}
            >
              <a
                href={item.anchor ?? `#${item.number}`}
                onClick={handleTickClick(item.number)}
                className={`mono-s tabular flex items-baseline gap-2 rounded-sm px-1 py-0.5 leading-tight transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-yellow-50'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                <span className="w-5 shrink-0 opacity-70">{item.number}</span>
                <span
                  className={isActive ? 'font-medium' : ''}
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.label}
                </span>
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
