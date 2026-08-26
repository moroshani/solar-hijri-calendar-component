import { describe, expect, it } from "vitest";
import { formatDay, formatMonthTitle } from "./labels";

describe("calendar labels", () => {
  it("formats valid day and month labels", () => {
    expect(formatDay(15, "en")).toBe("15");
    expect(formatMonthTitle(1403, 1, "en")).toBe("Farvardin 1403");
  });

  it("rejects invalid scalar day and month values", () => {
    expect(() => formatDay(0, "en")).toThrow(RangeError);
    expect(() => formatDay(1.5, "fa")).toThrow(RangeError);
    expect(() => formatMonthTitle(1403, 13, "en")).toThrow(RangeError);
    expect(() => formatMonthTitle(3178, 1, "fa")).toThrow(RangeError);
  });
});
