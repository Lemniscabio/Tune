// Tune page content. Edit this file to change page copy.
// Narrative architecture (post-IA recomposition):
//   §01 Hero
//   §02 Problem space — diagnostic tension
//   §03 How Tune works — methodology / system
//   §04 Engagement model — how to start
//
// Source content traces back to Lemnisca_Tune_Thrust_v1.2.html (the original deck).
// No source content has been removed in the recomposition — pieces have been
// reordered and reframed only.

import { productPageSchema, type ProductPageContent } from './schema';

const tuneContent: ProductPageContent = {
  product: 'tune',

  meta: {
    title: 'Tune · fermentation readiness and optimization · Lemnisca',
    description:
      'A 10-day sprint reads your strain, baseline, and assay drift, then returns a prioritized experiment plan, variance decomposition, and paid-fit verdict.',
    canonical: 'https://lemnisca.bio/',
  },

  // Mini-TOC reflects the new 4-section narrative architecture.
  sectionToc: [
    { number: '01', label: 'Tune', anchor: '#hero' },
    { number: '02', label: 'Problem', anchor: '#problem' },
    { number: '03', label: 'How Tune works', anchor: '#how' },
    { number: '04', label: 'Engagement', anchor: '#engagement' },
  ],

  // §01 — Hero. Pure value-prop framing: bridge the 0→pilot gap.
  hero: {
    eyebrow: '',
    headlinePre: 'From biology that works to a ',
    headlineAccent: 'pilot-ready',
    headlinePost: ' process.',
    sub: 'Most fermentation programs lose 12–24 months between proving the biology and producing an optimizable process. Tune is the senior wet+dry team, fermentation biologists, process engineers, and modellers under one roof, that closes the gap with model-guided optimization.',
    primaryCta: {
      label: 'Apply',
      // TODO: swap to live Calendly URL when ready (see CALENDLY_URL in shared.content.ts).
      href: 'https://calendly.com/lemnisca',
      variant: 'primary',
    },
    secondaryCta: {
      label: 'Read the methodology',
      href: '#how',
      variant: 'ghost',
    },
  },

  // §02 — Problem space. Diagnostic tension; 4 linked problems verbatim from Slide 4.
  // Lead second sentence from Slide 2 ("noise drowns the signal"). Renumbered to 02.
  problemSection: {
    number: '02',
    headline: 'The 0 → pilot gap',
    lead: 'Most fermentation programs lose 12–24 months between proving biology and producing a pilot-ready process, not because of effort, because there is no system.',
    itemsLabel: 'Four linked problems',
    items: [
      {
        index: '01',
        title: 'Variables to prioritise',
        body: '8–12 candidate variables, no clear ranking of which ones move the KPI.',
        caption: '8–12 variables · unranked · coupled',
      },
      {
        index: '02',
        title: 'Baseline to stabilise',
        body: 'Replicate-to-replicate CV often above 15%; effect size hidden in noise.',
        caption: 'CV ≥ 15% · effect drowned by noise',
      },
      {
        index: '03',
        title: 'Assays to qualify',
        body: 'Method drift larger than the effect size you are trying to rank.',
        caption: 'method drift > effect size',
      },
      {
        index: '04',
        title: 'Experiments to redesign',
        body: 'Strain, media, feed, induction, inoculum. Structured optimization is premature.',
        caption: 'no design prior · premature optimization',
      },
    ],
    // Pivot line — distilled from Slide 6 row 5 ("Paid optimization would learn
    // noise, not biology") and Slide 2's "noise drowns the signal."
    // pivotLine: 'Tune is the system that bridges the gap.',
    // pivotAccent: 'noise',
  },

  // §03 — How Tune works · Method.
  // Reframed from "How paid Tune runs" to method-agnostic systems explanation.
  // Loop nodes + candidates remain the visual core (Slide 7). Mode A/B content
  // is preserved on this object but rendered in §04 as the engagement modes.
  paidLoop: {
    number: '03',
    headline: "Tune's method.",
    intro:
      'Tune runs an iterative hybrid-model optimization loop. Each cycle isolates leverage, ranks variables by uncertainty-weighted effect, and proposes the next experiment.',
    vizCaption: 'Each cycle improves learning per experiment.',
    chipsLabel: 'Candidate variables',
    loopNodes: [
      { label: 'Initial design' },
      { label: 'Run experiments' },
      { label: 'Train hybrid model + uncertainty' },
      { label: 'Recommend next experiments' },
      { label: 'Update feasible region' },
    ],
    candidates: [
      { label: 'pH' },
      { label: 'DO' },
      { label: 'Feed rate' },
      { label: 'Temperature' },
      { label: 'Induction' },
      { label: 'Media' },
      { label: 'Agitation' },
      { label: 'Inoculum' },
    ],
    // The mode cards are rendered in §04 (Engagement) — the structure of the
    // partnership belongs with the engagement narrative, not the method.
    modesLabel: 'Two engagement modes',
    modes: [
      {
        letter: 'A',
        title: 'Partner wet lab + Lemnisca dry lab',
        body: 'Customer or partner runs experiments. Lemnisca designs, models, interprets, and recommends.',
      },
      {
        letter: 'B',
        title: 'Lemnisca integrated wet + dry lab',
        body: 'Lemnisca runs the wet lab and the modelling loop together as one team.',
      },
    ],
  },

  // §03 — How Tune works · System outputs.
  // Reframed from "What the paid engagement delivers" → what the method produces.
  // Same 5 deliverables (verbatim from Slide 5 paid column). "What you bring"
  // for the paid tier moves out of focus here — kept for schema continuity but
  // visual placement is reconsidered in the §03 redesign pass.
  paidDeliverables: {
    number: '03',
    headline: 'What the method produces.',
    blockLabel: 'System outputs',
    deliverables: [
      {
        index: '01',
        title: 'Trained hybrid model',
        body: 'Mechanistic + data-driven + uncertainty model of your process.',
      },
      {
        index: '02',
        title: 'Validated operating region',
        body: 'Design space where KPIs are met, validated by experiment.',
      },
      {
        index: '03',
        title: 'Adaptive experiment campaigns',
        body: '3–6 iterations: design → run → model update → recommend.',
      },
      {
        index: '04',
        title: 'Measured KPI uplift',
        body: 'Titre / yield / productivity improvement, with confidence.',
      },
      {
        index: '05',
        title: 'Operating recipe + envelope',
        body: 'SOP-ready recipe with scale-aware operating limits.',
      },
    ],
    whatYouBring: {
      label: 'Operating prerequisites',
      items: [
        'Locked baseline w/ CV target met',
        'Defined variable ranges',
        'Assay precision data',
        'Structured experiment records template',
      ],
    },
  },

  // §04 — Engagement · Step 1: the 10-day technical answer.
  // All deliverables and "what you bring" verbatim from Slide 5 (free column).
  // Reframed from "What the sprint returns" → first conversation / entry point.
  sprintReturns: {
    number: '04',
    headline: 'Step 1: A 10-day technical answer.',
    blockLabel: 'Free · Tune Readiness Sprint · 10 days',
    deliverables: [
      {
        index: '01',
        title: 'Readiness verdict',
        body: 'Ready / partially ready / not ready, with blockers.',
      },
      {
        index: '02',
        title: 'Risk map',
        body: 'Variance decomposition: biology, process, assay, data.',
      },
      {
        index: '03',
        title: 'Data gap summary',
        body: 'Minimum dataset: run types, measurements, frequency.',
      },
      {
        index: '04',
        title: 'Prioritised experiment plan',
        body: 'Top 5 variables and ranges, with effect direction.',
      },
      {
        index: '05',
        title: 'Paid-fit recommendation',
        body: 'Optimize now / fix baseline / defer.',
      },
    ],
    outputLine:
      'Output: technical report and an expert walkdown of findings with your team.',
    whatYouBring: {
      label: 'What you bring',
      items: [
        'Strain ID + version',
        '≥ 3–5 baseline runs',
        '≥ 5 perturbation runs',
        'Assay calibration',
        'Deviations & lots',
      ],
    },
  },

  // §04 — Engagement · The verdict.
  // Reframed from "When the sprint moves to paid" → unified decision artifact.
  // Caption + 5 rows verbatim from Slide 6.
  decisionTable: {
    number: '04',
    headline: 'The verdict.',
    caption:
      'The sprint resolves into one of five readiness states. Each state determines whether, and how, paid optimization is justified.',
    columns: ['Sprint finding', 'What it means', 'Engagement next step'],
    rows: [
      {
        finding: 'Baseline reproducible (CV ≤ target), titre below target',
        meaning: 'System is stable enough to isolate true effects from noise',
        nextStep: 'Hybrid-model-driven optimization on prioritised variables',
      },
      {
        finding: 'Assay validated; ≥ 3 candidate drivers compete for top effect',
        meaning: 'Data can rank variable importance and interactions',
        nextStep: 'Hybrid model + adaptive experiment design',
      },
      {
        finding: 'Controllable levers exist (feed, induction, DO setpoint, T)',
        meaning: 'Optimization can move titre/yield with measurable effect',
        nextStep: 'Iterative wet/dry optimization loop',
      },
      {
        finding: 'DO or kₐ limits already visible at small scale',
        meaning: 'Design space must respect scale-up constraints from day one',
        nextStep: 'Scale-aware hybrid-model optimization',
      },
      {
        finding: 'Replicate CV high, assay drift, or sparse runs',
        meaning: 'Paid optimization would learn noise, not biology',
        nextStep: 'Fix baseline or assays first; revisit in 4–6 weeks',
      },
    ],
  },

  // §04 — Engagement · Start.
  sprintCta: {
    number: '04',
    headline: 'Start with one program and one 10-day technical answer.',
    body: [
      'Share one fermentation program. Lemnisca confirms fit, sends a data request, and runs a 10-day Tune sprint. You receive a technical report and an expert walkdown with your team.',
      'If there is no fit, you keep the report. If there is fit, Lemnisca proposes a focused paid engagement around the highest-value technical decision.',
    ],
    formLabels: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      program: 'Tell us about your program',
      programHelp: '5–10 lines is plenty: strain, scale, current data, and the decision in front of you.',
      source: 'How did you hear about us',
      submit: 'Share one program',
      submitting: 'Sending…',
    },
    sources: [
      { value: 'linkedin', label: 'LinkedIn' },
      { value: 'referral', label: 'Referral' },
      { value: 'search', label: 'Search engine' },
      { value: 'event', label: 'Event or conference' },
      { value: 'other', label: 'Other' },
    ],
    successHeadline: 'Received.',
    successBody:
      'Lemnisca will reply with a data request within two business days. Pushkar',
    errorMessage:
      'Something went wrong sending that. Please try again, or email us directly.',
    fallbackContact: 'pushkar@lemnisca.bio',
  },
};

export default productPageSchema.parse(tuneContent);
