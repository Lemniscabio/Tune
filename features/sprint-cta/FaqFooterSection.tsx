'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { shared } from '@/content/shared.content';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';

const FAQS = [
  {
    question: 'Why is the sprint free?',
    answer:
      "It's on us. We accept three to five programs per quarter and only propose paid work for programs we genuinely understand. Saying no often is what makes the yes credible. The Sprint is how we earn the right to a paid proposal, and how you decide if we're worth one.",
  },
  {
    question: 'We can do this ourselves. Why bring in Lemnisca?',
    answer:
      "Probably true if you have a senior process modeller in house. If you don't, the question is opportunity cost. Every month of unguided iteration is runway. Tune compresses the readiness assessment into 10 days; doing it yourself takes a quarter or two of bandwidth you'd rather spend on biology.",
  },
  {
    question: 'How is this different from DataHow, Insilico, or other modelling vendors?',
    answer:
      "They're built for late stage manufacturing, characterised processes, large datasets, regulated environments. Tune is built for pre pilot, messy data, unstable baselines, small experiment budgets. Different stage, different price, different question.",
  },
  {
    question: "We can't share our data. IP concerns.",
    answer:
      "NDA upfront, before any data moves. Anonymised aggregate learnings only, never named, never linked to your program. We've published our own internal program data first, so the standard is something we've held ourselves to.",
  },
  {
    question: `What if the verdict is "no, you're not ready"?`,
    answer:
      `You keep the report and the prioritised experiment list. Many of our paid customers come back 3-6 months later with the data the verdict said they needed. The "no" is not a rejection; it's a roadmap.`,
  },
] as const;

export function FaqFooterSection({ id = 'engagement-faq' }: { id?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const footerRef = useRef<HTMLElement>(null);
  const footerInView = useInView(footerRef, { once: true, margin: '-80px 0px' });

  return (
    <section
      id={id}
      className="relative isolate overflow-hidden"
      style={{
        backgroundImage: [
          'radial-gradient(ellipse 90% 58% at 50% 20%, rgba(42,132,235,0.54) 0%, rgba(18,70,203,0.34) 38%, transparent 72%)',
          'radial-gradient(ellipse 70% 60% at 18% 50%, rgba(8,43,143,0.58) 0%, transparent 70%)',
          'radial-gradient(ellipse 82% 46% at 62% 110%, rgba(2,4,28,0.98) 0%, rgba(4,10,55,0.74) 50%, transparent 76%)',
          'linear-gradient(180deg, #FFFFFF 0%, #F4FAFF 8%, #DCEEFF 18%, #9FCBF3 31%, #236BDF 48%, #0B2CB8 62%, #061663 76%, #03082A 90%, #020414 100%)',
        ].join(', '),
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.92) 18%, rgba(236,247,255,0.64) 42%, rgba(159,207,248,0.16) 76%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 pt-24 pb-12 md:px-10 md:pt-32 lg:px-14">
        <div className="mx-auto max-w-[1080px]">
          <Eyebrow>Common Questions</Eyebrow>

          <div className="mt-14 border-t border-white/14">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={item.question} className="border-b border-white/14 py-6">
                  <button
                    type="button"
                    onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                    className="group flex w-full cursor-pointer items-start justify-between gap-6 rounded-[18px] text-left transition-colors duration-150 ease-out hover:text-white"
                    aria-expanded={isOpen}
                  >
                    <span className={`max-w-[28ch] text-[22px] font-medium leading-[1.18] tracking-[-0.018em] transition-colors duration-150 ease-out ${isOpen ? 'text-white' : 'text-white/92 group-hover:text-white'}`}>
                      {item.question}
                    </span>
                    <motion.span
                      className="mt-1 text-[24px] leading-none text-blue-100"
                      animate={{ rotate: isOpen ? 45 : 0, x: isOpen ? 0 : 2 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0, y: -6 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -4 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="origin-top overflow-hidden"
                      >
                        <p className="body-m mt-4 max-w-[58ch] text-blue-100">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <footer ref={footerRef} className="relative mt-24 pt-10 md:mt-32">
          <div className="mt-1 overflow-hidden">
            <motion.div
              aria-label={shared.brand.name}
              className="flex items-end justify-center gap-4 text-left md:gap-8"
              initial={{ opacity: 0, y: 18 }}
              animate={footerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[clamp(3.6rem,18vw,17rem)] font-medium leading-none tracking-[-0.08em] text-white">
                {shared.brand.name.toUpperCase()}
              </p>
              <div className="mb-4 flex flex-col items-start justify-end md:mb-6.5">
                <p className="mb-1.5 text-[16px] font-medium tracking-[-0.02em] text-blue-100/88 md:mb-2 md:text-[18px]">
                  by
                </p>
                <p className="text-[clamp(1.6rem,4.6vw,4.25rem)] font-medium leading-none tracking-[-0.05em] text-white/96">
                  Lemnisca
                </p>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </section>
  );
}
