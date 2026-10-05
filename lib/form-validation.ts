// Shared by the client-side MultiStepForm and the /api/lead route so both
// sides accept and reject exactly the same input.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const ZIP_RE = /^\d{5}$/;

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
