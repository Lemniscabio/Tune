// Brand-level shared content — nav and footer copy.
// This app is Tune-only; cross-product (Thrust) lives in a separate app.

// TODO: replace with the live Calendly booking link once it's set up.
export const CALENDLY_URL = 'https://calendly.com/lemnisca';

export const shared = {
  brand: {
    name: 'Tune',
    suffix: 'by Lemnisca',
  },
  nav: {
    items: [
      { label: 'Apply', href: CALENDLY_URL },
    ],
  },
  footer: {
    copyright: '© 2026 Lemnisca. All rights reserved.',
  },
} as const;
