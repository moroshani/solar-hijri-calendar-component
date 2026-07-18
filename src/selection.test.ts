import { describe, expect, it } from "vitest";
import {
  getRangeBoundary,
  getRangeLength,
  isDateDisabledByMatchers,
  isDateInRange,
  orderRange,
  rangeContainsDisabledDate,
  selectRangeDate,
} from "./selection";

const farvardin10 = { year: 1403, month: 1, day: 10 };
const farvardin12 = { year: 1403, month: 1, day: 12 };
const farvardin15 = { year: 1403, month: 1, day: 15 };

describe("range selection", () => {
  it("orders range boundaries", () => {
    expect(orderRange({ from: farvardin15, to: farvardin10 })).toEqual({ from: farvardin10, to: farvardin15 });
  });

  it("detects range inclusion and boundaries", () => {
    const range = { from: farvardin10, to: farvardin15 };
    expect(isDateInRange(farvardin12, range)).toBe(true);
    expect(isDateInRange(farvardin10, range, { excludeEnds: true })).toBe(false);
    expect(getRangeBoundary(farvardin10, range)).toBe("start");
    expect(getRangeBoundary(farvardin15, range)).toBe("end");
    expect(getRangeBoundary(farvardin12, range)).toBe("inside");
  });

  it("measures ranges inclusively", () => {
    expect(getRangeLength({ from: farvardin10, to: farvardin15 })).toBe(6);
  });

  it("selects a range from two clicks", () => {
    const started = selectRangeDate(null, farvardin10);
    expect(started).toEqual({ from: farvardin10, to: null });
    expect(selectRangeDate(started, farvardin15)).toEqual({ from: farvardin10, to: farvardin15 });
  });

  it("restarts when the second click is before the start", () => {
    expect(selectRangeDate({ from: farvardin15, to: null }, farvardin10)).toEqual({ from: farvardin10, to: null });
  });

  it("supports disabled matchers", () => {
    const disabled = [{ from: farvardin12, to: farvardin12 }];
    expect(isDateDisabledByMatchers(farvardin12, disabled)).toBe(true);
    expect(rangeContainsDisabledDate({ from: farvardin10, to: farvardin15 }, disabled)).toBe(true);
    expect(selectRangeDate({ from: farvardin10, to: null }, farvardin15, { disabled, excludeDisabled: true })).toEqual({
      from: farvardin15,
      to: null,
    });
  });

  it("enforces max day limits by restarting at the clicked date", () => {
    expect(selectRangeDate({ from: farvardin10, to: null }, farvardin15, { maxDays: 3 })).toEqual({
      from: farvardin15,
      to: null,
    });
  });
});

