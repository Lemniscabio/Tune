import type { ReactNode } from 'react';

type FieldLabelProps = {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
};

export function FieldLabel({ htmlFor, required, children }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="label-m flex items-baseline gap-1.5 text-ink-graphite">
      <span>{children}</span>
      {required && (
        <span aria-hidden className="text-ink-ash">
          *
        </span>
      )}
      {required && <span className="sr-only">(required)</span>}
    </label>
  );
}
