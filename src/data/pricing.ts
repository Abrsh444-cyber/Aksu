// Pricing constants for Aksum Academy (ETB).
// Single source of truth for pricing and Telebirr payment details.

export const TELEBIRR = {
  merchantName: "Abreham Alemayehu",
  merchantNumber: "+251906046518",
  shortCode: "127001",
  instructionsUrl: "https://telebirr.ethiotelecom.et",
} as const;

export const PRICING = {
  pro_lifetime: {
    id: "pro_lifetime" as const,
    label: "Aksum Pro",
    audience: "Grade 9–12 & EUEE",
    amountEtb: 300,
    period: "lifetime",
    description: "Pay once, get full access to every Grade 9–12 course and EUEE prep — forever.",
  },
  pro_campus: {
    id: "pro_campus" as const,
    label: "Campus Pro",
    audience: "University & Remedial",
    amountEtb: 200,
    period: "lifetime",
    description:
      "For Ethiopian university students and remedial learners. Lifetime access to all upcoming campus courses.",
  },
} as const;

export type PaidTier = keyof typeof PRICING;

export const BANK_ACCOUNTS = [
  {
    name: "Telebirr",
    accountName: "Abreham Alemayehu",
    accountNumber: "+251906046518",
    branch: "Mobile money",
  },
] as const;
