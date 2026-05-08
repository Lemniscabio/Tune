import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { HairlineRule } from '@/design-system/primitives/HairlineRule';
import { NumeralGhost } from '@/design-system/primitives/NumeralGhost';
import type { SprintBlock as SprintBlockContent } from '@/content/schema';

type SprintBlockProps = {
  id: string;
  section: SprintBlockContent;
  accent?: 'tune' | 'thrust' | 'lemnisca';
  /** Tints the deliverable index numerals in the active accent. Used on the paid tier. */
  accentNumerals?: boolean;
};

const accentShadowMap = {
  tune: 'rgba(194, 120, 58, 0.18)',
  thrust: 'rgba(31, 74, 107, 0.18)',
  lemnisca: 'rgba(184, 106, 46, 0.18)',
} as const;

const accentTextMap = {
  tune: 'text-accent-tune',
  thrust: 'text-accent-thrust',
  lemnisca: 'text-accent-lemnisca',
} as const;

// Deliverables stack with a "what you bring" side panel.
// Used for §03 (free sprint returns) and §06 (paid engagement deliverables) on /tune.
export function SprintBlock({
  id,
  section,
  accent = 'tune',
  accentNumerals = false,
}: SprintBlockProps) {
  const cardShadow = `0 1px 0 rgba(20,17,14,0.04), 0 18px 36px -18px ${accentShadowMap[accent]}`;
  const numeralColor = accentNumerals ? accentTextMap[accent] : 'text-ink-ash';

  return (
    <section id={id} className="relative overflow-hidden bg-surface-parchment">
      <div className="pointer-events-none absolute -right-12 top-8 md:-right-20 md:top-12">
        <NumeralGhost value={section.number} accent={accent} />
      </div>
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        <Eyebrow>§ {section.number}</Eyebrow>
        <h2 className="display-section mt-6 max-w-[20ch] text-ink-black">
          {section.headline}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p className="label-m text-ink-graphite">{section.blockLabel}</p>
            <ul className="mt-8">
              {section.deliverables.map((d, i) => (
                <li key={d.index}>
                  <div
                    className="motion-settle flex items-baseline gap-6 py-7"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span className={`mono-m tabular w-8 shrink-0 ${numeralColor}`}>
                      {d.index}
                    </span>
                    <div className="flex-1">
                      <p className="display-sub text-ink-black">{d.title}</p>
                      <p className="body-m mt-3 max-w-[48ch] text-ink-graphite">
                        {d.body}
                      </p>
                    </div>
                  </div>
                  {i < section.deliverables.length - 1 && <HairlineRule />}
                </li>
              ))}
            </ul>
          </div>

          <aside className="md:col-span-5">
            <div
              className="motion-settle bg-surface-paper rounded-md border-[1.5px] border-line-hairline p-8"
              style={{ animationDelay: '320ms', boxShadow: cardShadow }}
            >
              <p className="label-m text-ink-graphite">{section.whatYouBring.label}</p>
              <ul className="mt-6 space-y-3">
                {section.whatYouBring.items.map((item) => (
                  <li
                    key={item}
                    className="mono-m flex items-baseline gap-3 text-ink-black"
                  >
                    <span aria-hidden className="text-ink-ash">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {section.outputLine && (
          <div className="mt-16 flex items-baseline gap-4">
            <p className="body-l max-w-[64ch] text-ink-graphite">
              {section.outputLine}
            </p>
          </div>
        )}
      </div>
      <div className="mx-auto max-w-[1200px] px-6">
        <HairlineRule />
      </div>
    </section>
  );
}
