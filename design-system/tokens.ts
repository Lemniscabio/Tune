// Single source of truth for design tokens.
// CSS custom properties in app/globals.css mirror this file under @theme.
// Inter / Newsreader Italic / JetBrains Mono only — free, no licensing.

export const tokens = {
  color: {
    surface: {
      // New (post-parchment) — used by the redesigned hero and forward.
      white: '#FFFFFF',
      // Legacy — still used by sections that haven't been redesigned yet.
      parchment: '#F0EAD8',
      paper: '#F0EAD8',
      snow: '#FFFFFF',
    },
    line: {
      hairline: '#D6CDB8', // legacy parchment hairline
      hairlineCool: '#E5E5E7', // new neutral-ramp hairline for white grounds
    },
    ink: {
      black: '#14110E',
      graphite: '#4A453E',
      ash: '#8C8579',
    },
    // 7-step ramps from the new palette.
    blue: {
      50: '#EFEFFF',
      100: '#CDCDFE',
      200: '#A1A1FE',
      300: '#7473FD',
      500: '#4140FC', // brand key
      700: '#0A07D4',
      900: '#03027A',
    },
    yellow: {
      50: '#FBFC40', // brand key (top of ramp)
      100: '#D2D234',
      200: '#AAAA28',
      300: '#85841D',
      500: '#5F5F12',
      700: '#3D3D08',
      900: '#1E1E02',
    },
    neutral: {
      50: '#F1F1F1',
      100: '#D1D1D3',
      200: '#A9A9AE',
      300: '#848488',
      500: '#50606B',
      700: '#3F3F45',
      900: '#202024',
    },
    // Legacy accents — kept until other sections are redesigned.
    accent: {
      lemnisca: '#B86A2E',
      tune: '#C2783A',
      thrust: '#1F4A6B',
    },
    data: {
      ink: '#14110E',
      muted: '#B5AC9C',
      diverge: '#8B2E2E',
      converge: '#2F5D3A',
    },
  },
  type: {
    family: {
      sans: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
      serif: 'Newsreader, ui-serif, Georgia, serif',
      mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
    },
    weight: {
      regular: 400,
      medium: 500,
      display: 520,
    },
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192] as const,
  radius: { none: 0, sm: 4, md: 8, lg: 12, pill: 999 } as const,
  motion: {
    duration: {
      underline: 220,
      fade: 400,
      settle: 600,
      draw: 700,
      trajectory: 1200,
    },
    easing: {
      settle: 'cubic-bezier(0.16, 1, 0.3, 1)',
      hairline: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

export type Tokens = typeof tokens;
