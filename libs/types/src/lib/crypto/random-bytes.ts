import { randomBytes } from 'crypto';

export function generateShortId(length = 6): string {
  return randomBytes(length).toString('base64url').slice(0, length);
}