type HairlineRuleProps = {
  animated?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
};

// 1.5px on parchment so the rule reads at viewing distance.
// Color is the line/hairline token (#D6CDB8).
export function HairlineRule({
  animated = false,
  orientation = 'horizontal',
  className = '',
}: HairlineRuleProps) {
  if (orientation === 'vertical') {
    return (
      <div
        aria-hidden
        className={`w-[1.5px] bg-line-hairline ${className}`}
      />
    );
  }
  return (
    <hr
      aria-hidden
      className={`border-0 bg-line-hairline h-[1.5px] ${animated ? 'motion-hairline' : ''} ${className}`}
    />
  );
}
