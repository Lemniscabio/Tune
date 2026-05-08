import type { ReactNode } from 'react';

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`inline-flex items-center rounded-full border border-line-hairline-cool bg-neutral-50 px-3 py-1.5 label-s text-ink-graphite ${className}`}
    >
      {children}
    </p>
  );
}
