import dynamic from 'next/dynamic';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { HairlineRule } from '@/design-system/primitives/HairlineRule';
import { NumeralGhost } from '@/design-system/primitives/NumeralGhost';
import type { PaidLoop as PaidLoopContent } from '@/content/schema';

// Per Phase 3: Motion for React ships only on the page that owns it.
const ConvergenceViz = dynamic(() =>
  import('./ConvergenceViz').then((m) => m.ConvergenceViz),
);

type PaidLoopProps = {
  section: PaidLoopContent;
  accent?: 'tune' | 'thrust' | 'lemnisca';
  /** Show eyebrow + headline + intro. Default true. */
  showHeader?: boolean;
  /** Show the convergence viz + candidates. Default true. */
  showViz?: boolean;
  /** Show the Mode A / Mode B cards. Default true. */
  showModes?: boolean;
  /** Override section anchor id. Default "how-it-runs". */
  id?: string;
};

const accentShadowMap = {
  tune: 'rgba(194, 120, 58, 0.18)',
  thrust: 'rgba(31, 74, 107, 0.18)',
  lemnisca: 'rgba(184, 106, 46, 0.18)',
} as const;

export function PaidLoop({
  section,
  accent = 'tune',
  showHeader = true,
  showViz = true,
  showModes = true,
  id = 'how-it-runs',
}: PaidLoopProps) {
  const cardShadow = `0 1px 0 rgba(20,17,14,0.04), 0 18px 36px -18px ${accentShadowMap[accent]}`;

  return (
    <section
      id={id}
      className="relative overflow-hidden bg-surface-parchment"
    >
      {showHeader && (
        <div className="pointer-events-none absolute -right-12 top-8 md:-right-20 md:top-12">
          <NumeralGhost value={section.number} accent={accent} />
        </div>
      )}
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        {showHeader && (
          <>
            <Eyebrow>§ {section.number}</Eyebrow>
            <h2 className="display-section mt-6 max-w-[20ch] text-ink-black">
              {section.headline}
            </h2>
            <p className="body-l mt-8 max-w-[64ch] text-ink-graphite">
              {section.intro}
            </p>
          </>
        )}

        {showViz && (
          <>
            <div className={`${showHeader ? 'mt-16' : ''} w-full md:min-h-[460px]`}>
              <ConvergenceViz
                nodes={section.loopNodes}
                candidates={section.candidates}
                chipsLabel={section.chipsLabel}
              />
            </div>
            <p className="mt-10 max-w-[40ch] text-center body-s text-ink-ash mx-auto">
              {section.vizCaption}
            </p>
          </>
        )}

        {showModes && (
          <div className={showViz || showHeader ? 'mt-20' : ''}>
            <p className="label-m text-ink-ash">{section.modesLabel}</p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {section.modes.map((mode) => (
                <article
                  key={mode.letter}
                  className="bg-surface-paper rounded-md border-[1.5px] border-line-hairline p-8"
                  style={{ boxShadow: cardShadow }}
                >
                  <p className="label-m text-ink-ash">Mode {mode.letter}</p>
                  <h3 className="display-sub mt-4 text-ink-black">{mode.title}</h3>
                  <p className="body-m mt-4 text-ink-graphite">{mode.body}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mx-auto max-w-[1200px] px-6">
        <HairlineRule />
      </div>
    </section>
  );
}
