import { describe, expect, it } from "vitest";
import { needsReviewNotice } from "@/lib/rules/get-rule";

describe("needsReviewNotice", () => {
  it("mostra aviso para conteúdo 'machine'", () => {
    expect(needsReviewNotice("machine")).toBe(true);
  });

  it("mostra aviso para conteúdo 'draft'", () => {
    expect(needsReviewNotice("draft")).toBe(true);
  });

  it("não mostra aviso para conteúdo 'reviewed'", () => {
    expect(needsReviewNotice("reviewed")).toBe(false);
  });
});
