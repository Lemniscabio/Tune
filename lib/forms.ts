// Form submission seam.
// Default implementation POSTs the validated payload to a third-party endpoint
// configured via NEXT_PUBLIC_INTAKE_ENDPOINT (Formspree / Worker / serverless).
// When a backend is added, only this file changes — page code does not.

import type { IntakePayload } from '@/content/schema';
import { env } from './env';

export type FormResult =
  | { ok: true }
  | { ok: false; reason: 'no-endpoint' | 'network' | 'server' };

export async function submitSprintIntake(payload: IntakePayload): Promise<FormResult> {
  if (!env.intakeEndpoint) {
    return { ok: false, reason: 'no-endpoint' };
  }

  try {
    const res = await fetch(env.intakeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false, reason: 'server' };
    return { ok: true };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
