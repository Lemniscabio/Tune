'use client';

// Intake form — styled for the deep-blue atmospheric ground in §04. Yellow
// submit pill bookends the hero CTA.

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { intakePayloadSchema, type IntakePayload, type SprintCta } from '@/content/schema';
import { submitSprintIntake } from '@/lib/forms';

type IntakeFormProps = {
  content: SprintCta;
  product: 'tune' | 'thrust' | 'lemnisca';
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const fieldClass =
  'mt-2 w-full rounded-md border border-white/20 bg-white/[0.06] px-4 py-3 text-[15px] text-white placeholder:text-blue-200/60 transition-[border-color,background-color,box-shadow] duration-150 hover:border-white/40 focus:outline-none focus:border-yellow-50 focus:bg-white/[0.10] focus:ring-2 focus:ring-yellow-50/30';

export function IntakeForm({ content, product }: IntakeFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorReason, setErrorReason] = useState<'no-endpoint' | 'network' | 'server' | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IntakePayload>({
    resolver: zodResolver(intakePayloadSchema),
    defaultValues: { product },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus('submitting');
    const result = await submitSprintIntake(values);
    if (result.ok) {
      setStatus('success');
      setErrorReason(null);
    } else {
      setStatus('error');
      setErrorReason(result.reason);
    }
  });

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-md border border-white/20 bg-white/[0.06] p-10 backdrop-blur-sm"
      >
        <p className="display-sub text-white">{content.successHeadline}</p>
        <p className="body-l mt-4 text-blue-100">{content.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <Field
        id="intake-name"
        label={content.formLabels.name}
        required
        error={errors.name?.message}
      >
        <input
          id="intake-name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name) || undefined}
          className={fieldClass}
          {...register('name')}
        />
      </Field>

      <Field
        id="intake-email"
        label={content.formLabels.email}
        required
        error={errors.email?.message}
      >
        <input
          id="intake-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email) || undefined}
          className={fieldClass}
          {...register('email')}
        />
      </Field>

      <Field id="intake-company" label={content.formLabels.company}>
        <input
          id="intake-company"
          type="text"
          autoComplete="organization"
          className={fieldClass}
          {...register('company')}
        />
      </Field>

      <Field
        id="intake-program"
        label={content.formLabels.program}
        required
        help={content.formLabels.programHelp}
        error={errors.program?.message}
      >
        <textarea
          id="intake-program"
          rows={6}
          aria-invalid={Boolean(errors.program) || undefined}
          className={`${fieldClass} resize-y`}
          {...register('program')}
        />
      </Field>

      <Field id="intake-source" label={content.formLabels.source}>
        <div className="relative">
          <select
            id="intake-source"
            defaultValue=""
            className={`${fieldClass} appearance-none pr-10`}
            {...register('source')}
          >
            <option value="" disabled>
              Select one
            </option>
            {content.sources.map((s) => (
              <option key={s.value} value={s.value} className="bg-blue-900 text-white">
                {s.label}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-200">
            ▾
          </span>
        </div>
      </Field>

      {/* Submit + error */}
      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group inline-flex items-center gap-3 rounded-full bg-yellow-50 px-7 py-3.5 text-[15px] font-medium tracking-[-0.005em] text-ink-black transition-[transform,opacity,background-color] duration-200 ease-out hover:scale-[0.985] hover:bg-[#F4F538] active:scale-[0.97] disabled:opacity-60 disabled:cursor-wait"
          style={{
            boxShadow: '0 1px 0 rgba(0,0,0,0.08), 0 6px 16px -8px rgba(0,0,0,0.45)',
          }}
        >
          <span>
            {status === 'submitting' ? content.formLabels.submitting : content.formLabels.submit}
          </span>
          {status !== 'submitting' && (
            <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
              →
            </span>
          )}
        </button>

        {status === 'error' && (
          <p role="alert" className="body-s text-yellow-50">
            {errorReason === 'no-endpoint' ? (
              <>
                Form endpoint not configured. Email{' '}
                <a
                  href={`mailto:${content.fallbackContact}`}
                  className="underline underline-offset-4"
                >
                  {content.fallbackContact}
                </a>{' '}
                directly.
              </>
            ) : (
              <>
                {content.errorMessage}{' '}
                <a
                  href={`mailto:${content.fallbackContact}`}
                  className="underline underline-offset-4"
                >
                  {content.fallbackContact}
                </a>
              </>
            )}
          </p>
        )}
      </div>
    </form>
  );
}

// Local field wrapper — dark variant.
function Field({
  id,
  label,
  required,
  help,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="label-m flex items-baseline gap-1.5 text-blue-200"
      >
        <span>{label}</span>
        {required && (
          <span aria-hidden className="text-blue-200/60">*</span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>
      {help && <p className="body-s mt-1 text-blue-100/80">{help}</p>}
      {children}
      {error && (
        <p role="alert" className="mono-s mt-2 text-yellow-50/90">
          {error}
        </p>
      )}
    </div>
  );
}
