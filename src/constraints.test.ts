import { describe, expect, it } from "vitest";
import {
  clampDate,
  createDateDisabledMatcher,
  isDateOutsideBounds,
  isDateUnavailable,
  isDateWithinBounds,
} from "./constraints";

const farvardin04 = { year: 1403, month: 1, day: 4 };
const farvardin10 = { year: 1403, month: 1, day: 10 };
const farvardin20 = { year: 1403, month: 1, day: 20 };

describe("date constraints", () => {
  it("detects dates outside inclusive min and max bounds", () => {
    const bounds = { minDate: farvardin10, maxDate: farvardin20 };

    expect(isDateOutsideBounds(farvardin04, bounds)).toBe(true);
    expect(isDateOutsideBounds(farvardin10, bounds)).toBe(false);
    expect(isDateOutsideBounds(farvardin20, bounds)).toBe(false);
    expect(isDateOutsideBounds({ year: 1403, month: 1, day: 21 }, bounds)).toBe(true);
    expect(isDateWithinBounds(farvardin10, bounds)).toBe(true);
    expect(isDateWithinBounds(farvardin20, bounds)).toBe(true);
    expect(isDateWithinBounds(farvardin04, bounds)).toBe(false);
  });

  it("clamps dates to inclusive one-sided and two-sided bounds", () => {
    const bounds = { minDate: farvardin10, maxDate: farvardin20 };

    expect(clampDate(farvardin04, bounds)).toBe(farvardin10);
    expect(clampDate({ year: 1403, month: 1, day: 21 }, bounds)).toBe(farvardin20);
    expect(clampDate(farvardin10, bounds)).toBe(farvardin10);
    expect(clampDate(farvardin20, bounds)).toBe(farvardin20);
    expect(clampDate(farvardin04, { maxDate: farvardin20 })).toBe(farvardin04);
    expect(clampDate(farvardin20)).toBe(farvardin20);
  });

  it("combines bounds with custom disabled rules", () => {
    const matcher = createDateDisabledMatcher({
      minDate: farvardin10,
      maxDate: farvardin20,
      isDateDisabled: (date) => date.day === 12,
    });

    expect(matcher?.(farvardin04)).toBe(true);
    expect(matcher?.({ year: 1403, month: 1, day: 12 })).toBe(true);
    expect(matcher?.({ year: 1403, month: 1, day: 15 })).toBe(false);
  });

  it("returns undefined when no constraints exist", () => {
    expect(createDateDisabledMatcher()).toBeUndefined();
  });

  it("reports unavailable dates without creating a matcher", () => {
    expect(isDateUnavailable(farvardin04, { minDate: farvardin10 })).toBe(true);
  });

  it("rejects invalid dates, bounds, and reversed intervals", () => {
    const invalidDate = { year: 1404, month: 12, day: 30 };

    expect(() => isDateOutsideBounds(invalidDate)).toThrow(RangeError);
    expect(() => isDateWithinBounds(invalidDate)).toThrow(RangeError);
    expect(() => clampDate(invalidDate)).toThrow(RangeError);
    expect(() => isDateUnavailable(invalidDate)).toThrow(RangeError);
    expect(() => createDateDisabledMatcher({ minDate: invalidDate })).toThrow(RangeError);
    expect(() => createDateDisabledMatcher({ minDate: farvardin20, maxDate: farvardin10 })).toThrow(RangeError);
    expect(() => clampDate(farvardin10, { minDate: farvardin20, maxDate: farvardin10 })).toThrow(RangeError);
  });
});
