import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { HairlineRule } from '@/design-system/primitives/HairlineRule';
import { NumeralGhost } from '@/design-system/primitives/NumeralGhost';
import type { DecisionTable as DecisionTableContent } from '@/content/schema';

type DecisionTableProps = {
  section: DecisionTableContent;
  accent?: 'tune' | 'thrust' | 'lemnisca';
};

const accentTextMap = {
  tune: 'text-accent-tune',
  thrust: 'text-accent-thrust',
  lemnisca: 'text-accent-lemnisca',
} as const;

export function DecisionTable({ section, accent = 'tune' }: DecisionTableProps) {
  const accentText = accentTextMap[accent];

  return (
    <section
      id="move-to-paid"
      className="relative overflow-hidden bg-surface-parchment"
    >
      <div className="pointer-events-none absolute -right-12 top-8 md:-right-20 md:top-12">
        <NumeralGhost value={section.number} accent={accent} />
      </div>
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        <Eyebrow>§ {section.number}</Eyebrow>
        <h2 className="display-section mt-6 max-w-[20ch] text-ink-black">
          {section.headline}
        </h2>
        <p className="body-l mt-8 max-w-[64ch] text-ink-graphite">
          {section.caption}
        </p>

        {/* Desktop table — 4/4/4 columns, hairline rules between rows, no zebra. */}
        <div className="mt-16 hidden md:block">
          <div className="grid grid-cols-12 gap-8 pb-6">
            <p className="label-m col-span-4 text-ink-ash">{section.columns[0]}</p>
            <p className="label-m col-span-4 text-ink-ash">{section.columns[1]}</p>
            <p className="label-m col-span-4 text-ink-ash">{section.columns[2]}</p>
          </div>
          <HairlineRule />
          <ul>
            {section.rows.map((row, i) => (
              <li key={row.finding}>
                <div
                  className="grid grid-cols-12 gap-8 py-8 motion-settle"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <p className="body-m col-span-4 max-w-[36ch] text-ink-black">
                    {row.finding}
                  </p>
                  <p className="body-m col-span-4 max-w-[36ch] text-ink-graphite">
                    {row.meaning}
                  </p>
                  <p
                    className={`body-m col-span-4 max-w-[36ch] font-medium text-ink-black`}
                  >
                    <span className={`underline decoration-2 underline-offset-4 ${accentText} decoration-current`}>
                      {row.nextStep}
                    </span>
                  </p>
                </div>
                <HairlineRule />
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile reflow — stacked cards, one per row. */}
        <ul className="mt-12 space-y-6 md:hidden">
          {section.rows.map((row) => (
            <li
              key={row.finding}
              className="bg-surface-paper rounded-md border-[1.5px] border-line-hairline p-6"
            >
              <div>
                <p className="label-s text-ink-ash">{section.columns[0]}</p>
                <p className="body-m mt-2 text-ink-black">{row.finding}</p>
              </div>
              <HairlineRule className="my-5" />
              <div>
                <p className="label-s text-ink-ash">{section.columns[1]}</p>
                <p className="body-m mt-2 text-ink-graphite">{row.meaning}</p>
              </div>
              <HairlineRule className="my-5" />
              <div>
                <p className="label-s text-ink-ash">{section.columns[2]}</p>
                <p
                  className={`body-m mt-2 font-medium text-ink-black`}
                >
                  <span className={`underline decoration-2 underline-offset-4 ${accentText} decoration-current`}>
                    {row.nextStep}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto max-w-[1200px] px-6">
        <HairlineRule />
      </div>
    </section>
  );
}
