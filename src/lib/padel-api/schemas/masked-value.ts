import { z } from "zod";

// Dado escondido pelo plano gratuito da fonte (ver §6.1 do PROJECT.md) — nunca inventamos
// um valor plausível, marcamos explicitamente como mascarado para a UI avisar o utilizador.
export const MaskedValueSchema = z.union([z.number(), z.literal("hidden_free_plan")]);

export type MaskedNumber = { value: number | null; masked: boolean };

export function normalizeMaskedValue(raw: number | "hidden_free_plan"): MaskedNumber {
  return raw === "hidden_free_plan" ? { value: null, masked: true } : { value: raw, masked: false };
}
