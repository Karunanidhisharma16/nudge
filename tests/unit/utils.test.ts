import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("keeps the last conflicting Tailwind class", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("skips falsy values", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });
});
