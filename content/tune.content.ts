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
    headlinePre: 'Move from promising biology to a ',
    headlineAccent: 'pilot-ready',
    headlinePost: ' fermentation process.',
    sub: 'Lemnisca’s Tune accelerates early-stage fermentation, moving teams from shake flask to pilot scale 2x faster. It handles the technical heavy lifting, transforming data into precise process decisions. Stop wasting runs on blind optimization and start scaling with absolute confidence."',
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
    eyebrow: 'PROBLEM',
    headline: 'The 0 → pilot gap',
    lead: 'Most teams are not starting from zero. They have signal, runs, and data — but not a process system that can reliably move them to pilot.',
    items: [
      {
        index: '01',
        label: 'ACUTE TRIGGER',
        title:
          "Your fermentation process isn't hitting the productivity target that makes your molecule commercially viable.",
        body: '',
      },
      {
        index: '02',
        label: 'DATA GAP',
        title: "You can't fix what you can't diagnose.",
        body: "You have fermentation data. It doesn't tell you why productivity has stalled, or where to start.",
      },
      {
        index: '03',
        label: 'MODEL GAP',
        title: 'Trial and error takes years.',
        body: "Every cycle of guess-and-check costs months. Competitors don't wait.",
      },
      {
        index: '04',
        label: 'COST OF THE GAP',
        title: 'Wet-lab runs are expensive.',
        body: 'Without direction, most of your R&D budget goes to experiments that teach you nothing.',
        punchline: 'Budget goes in. Clarity does not come out.',
      },
    ],
  },

  engagementJourney: {
    number: '04',
    eyebrow: 'CUSTOMER JOURNEY',
    headline: 'A guided learning loop for fermentation process development.',
    intro:
      'Tune combines bioprocess engineering, process data, modelling, and experimental strategy to make each run more useful than the last.',
    trustLine:
      'Diagnose the process → Run the learning loops → Validate recommendations → Build the pilot-ready package',
    steps: [
      {
        index: '01',
        title: 'Diagnose the process',
        body: 'Read the baseline, the assay noise, and the operating constraints before the team spends another round guessing.',
      },
      {
        index: '02',
        title: 'Build the learning loop',
        body: 'Combine biology, process logic, and run history into a model that keeps learning between wet-lab rounds.',
      },
      {
        index: '03',
        title: 'Choose the next experiments',
        body: 'Rank the next conditions by expected yield, uncertainty reduction, and pilot relevance before the next run starts.',
      },
      {
        index: '04',
        title: 'Build the pilot-ready package',
        body: 'Turn repeated learning into a process package your team can defend, transfer, and carry into scale-up.',
      },
    ],
    transitionLine: 'Each pass through the loop makes the next run more targeted and more legible.',
    programHeadline: 'A guided path from diagnosis to pilot readiness.',
    programIntro:
      'Tune carries the process reasoning between rounds, so the team stops spending time re-learning what the last experiment should already have settled.',
    loopNodes: ['Wet experiment', 'Data', 'Predictive model', 'Recommendation', 'Next run'],
    modelLabel: 'PREDICTIVE MODEL',
    modelPoints: [
      'Learns from each run',
      'Ranks process variables',
      'Tracks uncertainty',
      'Recommends the next experiment',
      'Narrows the feasible region',
    ],
    heavyLiftingTitle: 'Lemnisca carries the technical heavy lifting.',
    heavyLiftingBody:
      'We handle the modelling, experimental design, interpretation, and next-run recommendation so your team does not burn months in unguided iteration.',
    modes: [
      {
        letter: 'A',
        title: 'Partner wet lab + Lemnisca dry lab',
        description:
          'Your team or wet-lab partner runs the experiments. Lemnisca designs, models, interprets, and recommends each next run.',
        bestFit: 'Best when you already have lab capacity.',
      },
      {
        letter: 'B',
        title: 'Lemnisca integrated wet + dry lab',
        description:
          'Lemnisca runs the wet lab and modelling loop together as one integrated team.',
        bestFit: 'Best when speed or lab capacity is the bottleneck.',
      },
    ],
  },

  // §03 — Solution / system explanation.
  // The section now explains the decision layer in a static 3-part structure:
  // Evidence In -> Hybrid Model -> Decisions Out.
  paidLoop: {
    number: '03',
    headline: 'Tune builds the decision layer your process is missing.',
    intro:
      'Your team may already have runs, assays, recipes, deviations, and promising biology. Tune connects those signals into a hybrid model that can rank variables, expose uncertainty, and derive the next experiment.',
    solutionBento: {
      featureTitle:
        'Tune is a predictive model of your fermentation process. It changes how you find a commercial recipe.',
      children: [
        {
          title: 'Every wet-lab run earns its keep.',
          body:
            'Tune picks the experiments most likely to increase productivity. No exploratory runs. No wasted batches.',
        },
        {
          title: "Tune tells you what's wrong.",
          body:
            'Its predictive model finds the bottleneck in your process, so you stop guessing and start fixing.',
        },
        {
          title: 'Months, not years.',
          body:
            'Tune explores 100x more conditions between wet-lab rounds than your team could. Years of search compress into months.',
        },
      ],
    },
    vizCaption: 'Every experiment updates the model. Every model update improves the next experiment.',
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
    evidenceInputs: [
      { label: 'Run history' },
      { label: 'Recipes' },
      { label: 'Feed strategy' },
      { label: 'Assay notes' },
      { label: 'Metadata' },
      { label: 'Deviations' },
    ],
    modelComponents: [
      { label: 'Biological constraints' },
      { label: 'Process logic' },
      { label: 'Experimental data' },
      { label: 'Uncertainty tracking' },
    ],
    decisionOutputs: [
      { label: 'Readiness verdict' },
      { label: 'Variable ranking' },
      { label: 'Next-run recommendation' },
      { label: 'Uncertainty map' },
      { label: 'Feasible-region update' },
      { label: 'Pilot-readiness confidence' },
    ],
    modelTagline: 'MECHANISTIC + STATISTICAL · UNCERTAINTY-AWARE',
    microcopy: 'Every experiment updates the model. Every model update improves the next experiment.',
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

  deliverablesSection: {
    eyebrow: 'What Tune delivers',
    headline: 'A process package ready for the first pilot run.',
    intro:
      'The end outcome of Tune is not more analysis. It is a practical, technically grounded package that helps your team execute the first pilot run with confidence.',
    note:
      'Tune does not replace your wet lab. It helps your wet lab learn faster, decide better, and arrive at a process that is ready to be tested at pilot scale.',
    packageLabel: 'Pilot-Ready Process Package',
    cards: [
      {
        title: 'Process recipe and operating window',
        body:
          'A defined bench-scale process recipe with critical ranges, control logic, and process window.',
        hoverNote:
          'Helps the team know what to run and where the process has room to operate.',
      },
      {
        title: 'Pilot run protocol',
        body:
          'A practical execution plan for the first pilot run: what to run, measure, watch, and decide.',
        hoverNote:
          'Turns bench learning into a practical first pilot execution plan.',
      },
      {
        title: 'Model-backed expectations and risks',
        body:
          'Expected pilot performance ranges, key uncertainties, early warning signals, and success criteria.',
        hoverNote:
          'Sets expected ranges, warning signs, and success criteria before the batch begins.',
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
    headline: 'Start with a focused free 10-day technical pilot.',
    body: [
      'The first step into Tune is a 10-day technical pilot. We review your current program, available run data, and scale-up context to determine whether a longer Tune engagement can create a meaningful path toward a pilot-ready process.',
      'If your biology works but your process is not yet pilot-ready, Tune may be the next step.',
      'Request a Tune fit conversation. If the program is a strong fit, we begin with a 10-day technical pilot and then define the longer engagement required to build the process package for your first pilot run.',
    ],
    steps: [
      'Understand the program',
      'Review the data',
      'Identify the uncertainty',
      'Recommend the next move',
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
