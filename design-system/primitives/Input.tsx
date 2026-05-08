import { forwardRef } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';

const baseFieldClass =
  'mt-2 w-full bg-surface-paper border-[1.5px] border-line-hairline rounded-md px-4 py-3 text-[15px] text-ink-black placeholder:text-ink-ash transition-[border-color,box-shadow] duration-150 hover:border-ink-ash focus:outline-none focus:border-ink-black focus:ring-2 focus:ring-ink-black/15';

type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = '', invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={`${baseFieldClass} ${invalid ? 'border-data-diverge focus:border-data-diverge' : ''} ${className}`}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
});

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className = '', invalid, rows = 6, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={`${baseFieldClass} resize-y ${invalid ? 'border-data-diverge focus:border-data-diverge' : ''} ${className}`}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
});

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  invalid?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className = '', invalid, children, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={`${baseFieldClass} appearance-none pr-10 ${invalid ? 'border-data-diverge focus:border-data-diverge' : ''} ${className}`}
        aria-invalid={invalid || undefined}
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-ash"
      >
        ▾
      </span>
    </div>
  );
});

export function FieldError({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="mono-s mt-2 text-data-diverge">
      {children}
    </p>
  );
}
