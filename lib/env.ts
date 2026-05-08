// Public env vars. Static export resolves these at build time.

export const env = {
  intakeEndpoint: process.env.NEXT_PUBLIC_INTAKE_ENDPOINT ?? '',
} as const;
