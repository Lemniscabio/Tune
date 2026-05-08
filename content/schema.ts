// Content schema — single source of truth.
// Every page's content file is validated against these schemas at module load.

import { z } from 'zod';

export const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  variant: z.enum(['primary', 'ghost']),
});

export const heroSchema = z.object({
  eyebrow: z.string(),
  headlinePre: z.string(),
  headlineAccent: z.string(),
  headlinePost: z.string(),
  sub: z.string(),
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema.optional(),
});

export const problemItemSchema = z.object({
  index: z.string().regex(/^\d{2}$/),
  title: z.string(),
  body: z.string(),
  // Short technical caption used in the diagnostic-card layout.
  // Falls back to a derived single line if absent.
  caption: z.string().optional(),
});

export const problemSectionSchema = z.object({
  number: z.string().regex(/^\d{2}$/),
  headline: z.string(),
  lead: z.string(),
  itemsLabel: z.string(),
  items: z.array(problemItemSchema).length(4),
  // Closing isolated insight line that pivots into §03.
  pivotLine: z.string().optional(),
  // The single word inside `pivotLine` rendered as italic accent + underline.
  pivotAccent: z.string().optional(),
});

export const sectionTocItemSchema = z.object({
  number: z.string().regex(/^\d{2}$/),
  label: z.string(),
  anchor: z.string().optional(),
});

// Deliverables stack — used for §03 (free sprint returns) and §06 (paid deliverables).
export const deliverableSchema = z.object({
  index: z.string().regex(/^\d{2}$/),
  title: z.string(),
  body: z.string(),
});

export const whatYouBringSchema = z.object({
  label: z.string(),
  items: z.array(z.string()).min(1),
});

export const sprintBlockSchema = z.object({
  number: z.string().regex(/^\d{2}$/),
  headline: z.string(),
  blockLabel: z.string(),
  deliverables: z.array(deliverableSchema).min(3),
  outputLine: z.string().optional(),
  whatYouBring: whatYouBringSchema,
});

// Backwards-compat alias.
export const sprintReturnsSchema = sprintBlockSchema;

// §04 — Decision table
export const decisionRowSchema = z.object({
  finding: z.string(),
  meaning: z.string(),
  nextStep: z.string(),
});

export const decisionTableSchema = z.object({
  number: z.string().regex(/^\d{2}$/),
  headline: z.string(),
  caption: z.string(),
  columns: z.tuple([z.string(), z.string(), z.string()]),
  rows: z.array(decisionRowSchema).min(3),
});

// §07 — Final CTA / sprint intake
export const intakeSourceSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const sprintCtaSchema = z.object({
  number: z.string().regex(/^\d{2}$/),
  headline: z.string(),
  body: z.array(z.string()).min(1),
  formLabels: z.object({
    name: z.string(),
    email: z.string(),
    company: z.string(),
    program: z.string(),
    programHelp: z.string(),
    source: z.string(),
    submit: z.string(),
    submitting: z.string(),
  }),
  sources: z.array(intakeSourceSchema).min(2),
  successHeadline: z.string(),
  successBody: z.string(),
  errorMessage: z.string(),
  fallbackContact: z.string(),
});

// What gets POST'd to the intake endpoint.
export const intakePayloadSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Enter a valid email'),
  company: z.string().optional(),
  program: z.string().min(30, '5–10 lines is plenty, please give us enough to assess fit'),
  source: z.string().optional(),
  product: z.enum(['tune', 'thrust', 'lemnisca']),
});

export type IntakePayload = z.infer<typeof intakePayloadSchema>;
export type SprintCta = z.infer<typeof sprintCtaSchema>;

// §05 — Paid loop + Convergence viz + Mode A/B
export const loopNodeSchema = z.object({ label: z.string() });
export const candidateChipSchema = z.object({ label: z.string() });

export const modeCardSchema = z.object({
  letter: z.enum(['A', 'B']),
  title: z.string(),
  body: z.string(),
});

export const paidLoopSchema = z.object({
  number: z.string().regex(/^\d{2}$/),
  headline: z.string(),
  intro: z.string(),
  vizCaption: z.string(),
  chipsLabel: z.string(),
  loopNodes: z.array(loopNodeSchema).length(5),
  candidates: z.array(candidateChipSchema).length(8),
  modesLabel: z.string(),
  modes: z.tuple([modeCardSchema, modeCardSchema]),
});

export const productPageSchema = z.object({
  product: z.enum(['tune', 'thrust']),
  meta: z.object({
    title: z.string(),
    description: z.string().max(160),
    canonical: z.string().url(),
  }),
  sectionToc: z.array(sectionTocItemSchema).min(3),
  hero: heroSchema,
  problemSection: problemSectionSchema,
  sprintReturns: sprintBlockSchema,
  decisionTable: decisionTableSchema,
  paidLoop: paidLoopSchema,
  paidDeliverables: sprintBlockSchema,
  sprintCta: sprintCtaSchema,
});

export type Hero = z.infer<typeof heroSchema>;
export type ProblemSection = z.infer<typeof problemSectionSchema>;
export type SectionTocItem = z.infer<typeof sectionTocItemSchema>;
export type SprintBlock = z.infer<typeof sprintBlockSchema>;
export type SprintReturns = SprintBlock;
export type DecisionTable = z.infer<typeof decisionTableSchema>;
export type Deliverable = z.infer<typeof deliverableSchema>;
export type DecisionRow = z.infer<typeof decisionRowSchema>;
export type PaidLoop = z.infer<typeof paidLoopSchema>;
export type LoopNode = z.infer<typeof loopNodeSchema>;
export type CandidateChip = z.infer<typeof candidateChipSchema>;
export type ModeCard = z.infer<typeof modeCardSchema>;
export type ProductPageContent = z.infer<typeof productPageSchema>;
