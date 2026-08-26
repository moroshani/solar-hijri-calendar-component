import { describe, expect, it } from "vitest";
import {
  createRangePreview,
  getRangeBoundary,
  getRangeLength,
  isCompleteRange,
  isDateDisabledByMatchers,
  isDateMatched,
  isDateSelected,
  normalizeSelectedDates,
  isDateInRange,
  orderRange,
  rangeContainsDisabledDate,
  selectRangeDate,
  toggleSelectedDate,
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

  it("rejects invalid dates and malformed ranges", () => {
    const invalidDate = { year: 1404, month: 12, day: 30 };
    const malformedRange = { from: farvardin10 } as never;

    expect(() => isDateInRange(invalidDate, { from: farvardin10, to: farvardin15 })).toThrow(RangeError);
    expect(() => isCompleteRange(malformedRange)).toThrow(RangeError);
    expect(() => orderRange({ from: invalidDate, to: farvardin15 })).toThrow(RangeError);
    expect(() => getRangeBoundary(farvardin10, malformedRange)).toThrow(RangeError);
    expect(() => getRangeLength(malformedRange)).toThrow(RangeError);
    expect(() => selectRangeDate(malformedRange, farvardin12)).toThrow(RangeError);
    expect(() => createRangePreview(malformedRange, null)).toThrow(RangeError);
  });

  it("keeps null ranges as absence rather than invalid input", () => {
    expect(isCompleteRange(null)).toBe(false);
    expect(isDateInRange(farvardin10, undefined)).toBe(false);
    expect(getRangeLength(null)).toBe(0);
    expect(createRangePreview(undefined, null)).toBeNull();
  });
});

describe("multiple selection", () => {
  it("toggles selected dates in sorted order", () => {
    const selected = toggleSelectedDate([farvardin15], farvardin10);
    expect(selected).toEqual([farvardin10, farvardin15]);
    expect(toggleSelectedDate(selected, farvardin10)).toEqual([farvardin15]);
  });

  it("normalizes selected dates", () => {
    expect(normalizeSelectedDates([farvardin15, farvardin10, farvardin10])).toEqual([farvardin10, farvardin15]);
    expect(isDateSelected(farvardin12, [farvardin10, farvardin15])).toBe(false);
  });

  it("honors min, max, required, and disabled options", () => {
    expect(toggleSelectedDate([farvardin10], farvardin10, { required: true })).toEqual([farvardin10]);
    expect(toggleSelectedDate([], farvardin10, { max: 0 })).toEqual([]);
    expect(toggleSelectedDate([farvardin10, farvardin12], farvardin12, { min: 2 })).toEqual([farvardin10, farvardin12]);
    expect(toggleSelectedDate([farvardin10, farvardin12], farvardin15, { max: 2 })).toEqual([farvardin10, farvardin12]);
    expect(toggleSelectedDate([farvardin10], farvardin12, { disabled: farvardin12 })).toEqual([farvardin10]);
  });

  it("rejects invalid selected values and matcher entries before matching", () => {
    const invalidDate = { year: 1404, month: 12, day: 30 };

    expect(() => normalizeSelectedDates([farvardin10, invalidDate])).toThrow(RangeError);
    expect(() => isDateSelected(farvardin10, [farvardin10, invalidDate])).toThrow(RangeError);
    expect(() => toggleSelectedDate([], invalidDate)).toThrow(RangeError);
    expect(() => isDateMatched(farvardin10, invalidDate)).toThrow(RangeError);
    expect(() => isDateDisabledByMatchers(farvardin10, [farvardin10, invalidDate])).toThrow(RangeError);
  });
});
