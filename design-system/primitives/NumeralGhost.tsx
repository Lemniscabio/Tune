// Oversized section numeral, sits behind content at 8% opacity in the page's accent.

type NumeralGhostProps = {
  value: string;
  accent?: 'tune' | 'thrust' | 'lemnisca';
  className?: string;
};

const accentClassMap = {
  tune: 'text-accent-tune',
  thrust: 'text-accent-thrust',
  lemnisca: 'text-accent-lemnisca',
} as const;

export function NumeralGhost({ value, accent = 'tune', className = '' }: NumeralGhostProps) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none select-none ${accentClassMap[accent]} motion-numeral ${className}`}
      style={{
        fontSize: 'clamp(8rem, 22vw, 18rem)',
        lineHeight: 1,
        fontVariationSettings: '"wght" 520',
        letterSpacing: '-0.04em',
      }}
    >
      {value}
    </span>
  );
}
