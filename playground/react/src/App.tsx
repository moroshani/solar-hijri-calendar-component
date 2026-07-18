import { useMemo, useState } from "react";
import {
  SolarHijriCalendar,
  SolarHijriRangeCalendar,
  type CalendarLocale,
  type SolarHijriDate,
  type SolarHijriMonth,
  type SolarHijriRange,
  type WeekStart,
} from "solar-hijri-calendar-component/react";
import { dateKey, getRangeLength, toGregorianDate } from "solar-hijri-calendar-component/core";
import "solar-hijri-calendar-component/styles.css";
import "./App.css";

const initialMonth: SolarHijriMonth = { year: 1403, month: 1 };
const initialDate: SolarHijriDate = { year: 1403, month: 1, day: 15 };
const initialRange: SolarHijriRange = {
  from: { year: 1403, month: 1, day: 11 },
  to: { year: 1403, month: 1, day: 16 },
};

const isFriday = (date: SolarHijriDate) => toGregorianDate(date).getUTCDay() === 5;

const formatVisibleDay = (day: number, locale: CalendarLocale) => {
  if (locale === "fa") return new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(day);
  return String(day);
};

export function App() {
  const [selectedDate, setSelectedDate] = useState<SolarHijriDate | null>(initialDate);
  const [selectedRange, setSelectedRange] = useState<SolarHijriRange>(initialRange);
  const [visibleMonth, setVisibleMonth] = useState<SolarHijriMonth>(initialMonth);
  const [locale, setLocale] = useState<CalendarLocale>("fa");
  const [weekStartsOn, setWeekStartsOn] = useState<WeekStart>("saturday");
  const [disableFridays, setDisableFridays] = useState(true);
  const [disableFirstWeek, setDisableFirstWeek] = useState(false);

  const disabledMatcher = useMemo(() => {
    return (date: SolarHijriDate) => {
      if (disableFridays && isFriday(date)) return true;
      if (disableFirstWeek && date.year === 1403 && date.month === 1 && date.day <= 7) return true;
      return false;
    };
  }, [disableFirstWeek, disableFridays]);

  const selectedKey = selectedDate ? dateKey(selectedDate) : "none";
  const rangeKey = `${selectedRange.from ? dateKey(selectedRange.from) : "open"} - ${selectedRange.to ? dateKey(selectedRange.to) : "open"}`;
  const rangeLength = getRangeLength(selectedRange);
  const monthKey = `${visibleMonth.year}-${String(visibleMonth.month).padStart(2, "0")}`;

  return (
    <main className="playground" data-testid="playground-shell">
      <div className="playground__shell">
        <aside className="playground__toolbar" aria-label="Playground controls">
          <div className="playground__brand">
            <h1 className="playground__title">Solar Hijri Component Lab</h1>
            <p className="playground__subtitle">Local fixture for interaction, QA, and responsive screenshots.</p>
          </div>

          <div className="control">
            <span className="control__label">Locale</span>
            <div className="segmented" role="group" aria-label="Locale">
              <button
                className="segmented__button"
                type="button"
                aria-pressed={locale === "fa"}
                onClick={() => setLocale("fa")}
              >
                FA
              </button>
              <button
                className="segmented__button"
                type="button"
                aria-pressed={locale === "en"}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
            </div>
          </div>

          <div className="control">
            <span className="control__label">Week Start</span>
            <div className="segmented" role="group" aria-label="Week start">
              <button
                className="segmented__button"
                type="button"
                aria-pressed={weekStartsOn === "saturday"}
                onClick={() => setWeekStartsOn("saturday")}
              >
                Sat
              </button>
              <button
                className="segmented__button"
                type="button"
                aria-pressed={weekStartsOn === "sunday"}
                onClick={() => setWeekStartsOn("sunday")}
              >
                Sun
              </button>
            </div>
          </div>

          <label className="switch">
            <span>Disable Fridays</span>
            <input checked={disableFridays} type="checkbox" onChange={(event) => setDisableFridays(event.target.checked)} />
          </label>

          <label className="switch">
            <span>Disable first week</span>
            <input
              checked={disableFirstWeek}
              type="checkbox"
              onChange={(event) => setDisableFirstWeek(event.target.checked)}
            />
          </label>
        </aside>

        <section className="playground__stage" aria-label="Calendar playground">
          <div className="playground__preview" data-testid="calendar-preview">
            <div className="calendar-pair" data-testid="calendar-pair">
              <div className="calendar-frame">
                <div className="calendar-frame__label">Single</div>
                <SolarHijriCalendar
                  value={selectedDate}
                  onChange={setSelectedDate}
                  month={visibleMonth}
                  onMonthChange={setVisibleMonth}
                  locale={locale}
                  weekStartsOn={weekStartsOn}
                  isDateDisabled={disabledMatcher}
                  dayClassName={(day) => (day.day === 1 && day.isCurrentMonth ? "playground-day--first" : undefined)}
                  renderDay={(day) => (
                    <span className="playground-day">
                      <span>{formatVisibleDay(day.day, locale)}</span>
                      {day.day === 1 && day.isCurrentMonth ? <span className="playground-day__dot" /> : null}
                    </span>
                  )}
                />
              </div>

              <div className="calendar-frame">
                <div className="calendar-frame__label">Range</div>
                <SolarHijriRangeCalendar
                  value={selectedRange}
                  onChange={setSelectedRange}
                  month={visibleMonth}
                  onMonthChange={setVisibleMonth}
                  locale={locale}
                  weekStartsOn={weekStartsOn}
                  isDateDisabled={disabledMatcher}
                  excludeDisabled
                />
              </div>
            </div>

            <div className="playground__state" aria-label="Calendar state">
              <div className="state-grid">
                <div className="state-item">
                  <span className="state-item__label">Selected</span>
                  <span className="state-item__value" data-testid="selected-date">
                    {selectedKey}
                  </span>
                </div>
                <div className="state-item">
                  <span className="state-item__label">Range</span>
                  <span className="state-item__value" data-testid="selected-range">
                    {rangeKey}
                  </span>
                </div>
                <div className="state-item">
                  <span className="state-item__label">Range Days</span>
                  <span className="state-item__value" data-testid="range-length">
                    {rangeLength || "open"}
                  </span>
                </div>
                <div className="state-item">
                  <span className="state-item__label">Visible Month</span>
                  <span className="state-item__value" data-testid="visible-month">
                    {monthKey}
                  </span>
                </div>
                <div className="state-item">
                  <span className="state-item__label">Locale</span>
                  <span className="state-item__value">{locale}</span>
                </div>
                <div className="state-item">
                  <span className="state-item__label">Week Start</span>
                  <span className="state-item__value">{weekStartsOn}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="scenario-strip" aria-label="Scenario inventory">
            <div className="scenario">
              <div className="scenario__label">Core</div>
              <div className="scenario__value">Date math, grids, conversion.</div>
            </div>
            <div className="scenario">
              <div className="scenario__label">Selection</div>
              <div className="scenario__value">Single and range engines.</div>
            </div>
            <div className="scenario">
              <div className="scenario__label">Visual QA</div>
              <div className="scenario__value">Playwright viewport captures.</div>
            </div>
            <div className="scenario">
              <div className="scenario__label">Future</div>
              <div className="scenario__value">Web Component, Vue, Svelte, Angular.</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
