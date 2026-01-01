import { config as loadEnv } from 'dotenv';

loadEnv();

const normalizeOrigins = (raw?: string) => {
  if (!raw) {
    return ['*'];
  }

  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
};

const parsePort = (value?: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 4000;
};

export const appConfig = {
  port: parsePort(process.env.PORT),
  allowedOrigins: normalizeOrigins(process.env.ALLOWED_ORIGINS),
  supportEmail: process.env.SUPPORT_EMAIL ?? 'hello@example.com'
};
