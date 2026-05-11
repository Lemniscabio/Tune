// Brand-level shared content — nav and footer copy.
// This app is Tune-only; cross-product (Thrust) lives in a separate app.

// TODO: replace with the live Calendly booking link once it's set up.
export const CALENDLY_URL = 'https://calendly.com/lemnisca';
const currentYear = new Date().getFullYear();

export const shared = {
  brand: {
    name: 'Tune',
    suffix: 'by Lemnisca',
  },
  nav: {
    items: [
      { label: 'Request a fit conversation', href: CALENDLY_URL, cta: true },
    ],
  },
  footer: {
    copyright: `© ${currentYear} Lemnisca. All rights reserved.`,
  },
} as const;
