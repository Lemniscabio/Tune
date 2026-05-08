import type { Metadata } from 'next';
import tune from '@/content/tune.content';
import { Hero } from '@/features/hero/Hero';
import { ProblemAtStage } from '@/features/problem-at-stage/ProblemAtStage';
import { MethodSystem } from '@/features/method/MethodSystem';
import { SystemOutputs } from '@/features/system-outputs/SystemOutputs';
import { SprintEntry } from '@/features/sprint-entry/SprintEntry';
import { VerdictMatrix } from '@/features/verdict/VerdictMatrix';
import { EngagementModes } from '@/features/engagement-modes/EngagementModes';
import { SprintCta } from '@/features/sprint-cta/SprintCta';

export const metadata: Metadata = {
  title: tune.meta.title,
  description: tune.meta.description,
  alternates: { canonical: tune.meta.canonical },
  openGraph: {
    title: tune.meta.title,
    description: tune.meta.description,
    url: tune.meta.canonical,
    type: 'website',
  },
};

// Tune is the canonical root experience.
// Narrative architecture:
//   §01 Hero
//   §02 Problem space            — diagnostic instrument panel
//   §03 How Tune works           — method (process flow + evolution) → outputs (artifact rows)
//   §04 Engagement model         — entry pipeline · verdict · modes · start (atmospheric return)
export default function HomePage() {
  return (
    <>
      <Hero hero={tune.hero} sectionToc={tune.sectionToc} accent="tune" />

      <div id="problem">
        <ProblemAtStage section={tune.problemSection} accent="tune" />
      </div>

      <div id="how">
        <MethodSystem section={tune.paidLoop} />
        <SystemOutputs section={tune.paidDeliverables} />
      </div>

      <div id="engagement">
        <SprintEntry section={tune.sprintReturns} />
        <VerdictMatrix section={tune.decisionTable} />
        <EngagementModes section={tune.paidLoop} />
        <SprintCta section={tune.sprintCta} product="tune" />
      </div>
    </>
  );
}
