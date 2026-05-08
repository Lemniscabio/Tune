import type { Metadata } from 'next';
import { Inter, Newsreader, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Self-hosted via next/font (downloads at build time, no runtime fetch).
// font-display: optional neutralises FOUT shift to keep CLS ≤ 0.02.

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'optional',
  axes: ['opsz'],
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'optional',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
  display: 'optional',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lemnisca.bio'),
  title: { default: 'Lemnisca', template: '%s' },
  description: 'Model-guided fermentation decisions, from early data to commercial scale.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
