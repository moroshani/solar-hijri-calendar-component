import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  Clipboard,
  Code2,
  ExternalLink,
  GitFork,
  Languages,
  ListChecks,
  MoveHorizontal,
  RefreshCcw,
  Settings2,
} from "lucide-react";
import {
  SolarHijriCalendar,
  SolarHijriMultipleCalendar,
  SolarHijriRangeCalendar,
  type CalendarLocale,
  type SolarHijriDate,
  type SolarHijriMonth,
  type SolarHijriRange,
  type WeekStart,
} from "solar-hijri-calendar-component/react";
import {
  addDays,
  dateKey,
  getRangeLength,
  getToday,
  monthNames,
  toGregorianDate,
} from "solar-hijri-calendar-component/core";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";
import "solar-hijri-calendar-component/styles.css";
import "./App.css";

type SelectionMode = "single" | "range" | "multiple";

const today = getToday();
const initialMonth: SolarHijriMonth = { year: today.year, month: today.month };
const initialDate = addDays(today, 2);
const initialRange: SolarHijriRange = {
  from: addDays(today, 3),
  to: addDays(today, 8),
};
const initialMultipleDates = [addDays(today, 1), addDays(today, 5), addDays(today, 10)];
const firstDemoYear = today.year - 5;
const lastDemoYear = today.year + 5;
const demoYears = Array.from({ length: lastDemoYear - firstDemoYear + 1 }, (_, index) => firstDemoYear + index);
const minSelectableDate: SolarHijriDate = { year: firstDemoYear, month: 1, day: 1 };
const maxSelectableDate: SolarHijriDate = { year: lastDemoYear, month: 12, day: 29 };

const modeOptions: Array<{
  value: SelectionMode;
  label: string;
  icon: typeof CalendarDays;
}> = [
  { value: "single", label: "Single", icon: CalendarDays },
  { value: "range", label: "Range", icon: MoveHorizontal },
  { value: "multiple", label: "Multiple", icon: ListChecks },
];

const isFriday = (date: SolarHijriDate) => toGregorianDate(date).getUTCDay() === 5;

const formatDay = (day: number, locale: CalendarLocale) =>
  locale === "fa"
    ? new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(day)
    : String(day);

const formatSolarDate = (date: SolarHijriDate | null, locale: CalendarLocale) => {
  if (!date) return locale === "fa" ? "انتخاب نشده" : "Not selected";
  if (locale === "en") return dateKey(date);

  const number = new Intl.NumberFormat("fa-IR", { useGrouping: false });
  return `${number.format(date.year)}/${number.format(date.month)}/${number.format(date.day)}`;
};

const formatGregorianDate = (date: SolarHijriDate | null, locale: CalendarLocale) => {
  if (!date) return locale === "fa" ? "انتخاب نشده" : "Not selected";

  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR-u-ca-gregory" : "en-US", {
    dateStyle: "full",
    timeZone: "UTC",
  }).format(toGregorianDate(date));
};

export function App() {
  const [mode, setMode] = useState<SelectionMode>("single");
  const [selectedDate, setSelectedDate] = useState<SolarHijriDate | null>(initialDate);
  const [selectedRange, setSelectedRange] = useState<SolarHijriRange>(initialRange);
  const [selectedDates, setSelectedDates] = useState<SolarHijriDate[]>(initialMultipleDates);
  const [visibleMonth, setVisibleMonth] = useState<SolarHijriMonth>(initialMonth);
  const [locale, setLocale] = useState<CalendarLocale>("fa");
  const [weekStartsOn, setWeekStartsOn] = useState<WeekStart>("saturday");
  const [disableFridays, setDisableFridays] = useState(true);
  const [disableFirstWeek, setDisableFirstWeek] = useState(false);
  const [copied, setCopied] = useState(false);

  const disabledMatcher = useMemo(() => {
    return (date: SolarHijriDate) => {
      if (disableFridays && isFriday(date)) return true;
      if (disableFirstWeek && date.year === visibleMonth.year && date.month === visibleMonth.month && date.day <= 7) {
        return true;
      }
      return false;
    };
  }, [disableFirstWeek, disableFridays, visibleMonth.month, visibleMonth.year]);

  const primaryDate =
    mode === "single" ? selectedDate : mode === "range" ? selectedRange.from : selectedDates[0] ?? null;
  const secondaryDate = mode === "range" ? selectedRange.to : null;
  const selectedKey = selectedDate ? dateKey(selectedDate) : "none";
  const rangeKey = `${selectedRange.from ? dateKey(selectedRange.from) : "open"} - ${selectedRange.to ? dateKey(selectedRange.to) : "open"}`;
  const rangeLength = getRangeLength(selectedRange);
  const multipleKey = selectedDates.map(dateKey).join(", ");
  const monthKey = `${visibleMonth.year}-${String(visibleMonth.month).padStart(2, "0")}`;

  const componentName =
    mode === "single"
      ? "SolarHijriCalendar"
      : mode === "range"
        ? "SolarHijriRangeCalendar"
        : "SolarHijriMultipleCalendar";
  const valueName = mode === "single" ? "value" : mode === "range" ? "range" : "dates";
  const setterName = mode === "single" ? "setValue" : mode === "range" ? "setRange" : "setDates";
  const code = `<${componentName}\n  value={${valueName}}\n  onChange={${setterName}}\n  month={month}\n  onMonthChange={setMonth}\n  locale="${locale}"\n  weekStartsOn="${weekStartsOn}"${
    disableFridays ? "\n  isDateDisabled={isFriday}" : ""
  }${mode === "range" ? "\n  excludeDisabled" : ""}${mode === "multiple" ? "\n  max={5}" : ""}\n/>`;

  const reset = () => {
    setMode("single");
    setSelectedDate(initialDate);
    setSelectedRange(initialRange);
    setSelectedDates(initialMultipleDates);
    setVisibleMonth(initialMonth);
    setLocale("fa");
    setWeekStartsOn("saturday");
    setDisableFridays(true);
    setDisableFirstWeek(false);
    setCopied(false);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="lab" data-testid="playground-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            <span>{formatDay(today.day, "fa")}</span>
          </div>
          <div>
            <div className="brand-line">
              <h1>Solar Hijri Calendar Lab</h1>
              <span className="version">v0.1.0</span>
            </div>
            <p lang="fa" dir="rtl">آزمایشگاه تعاملی تقویم هجری شمسی</p>
          </div>
        </div>

        <nav className="topbar-actions" aria-label="Project links">
          <a href="https://github.com/moroshani/solar-hijri-calendar-component/releases/tag/v0.1.0">
            Release
            <ExternalLink aria-hidden="true" />
          </a>
          <a href="https://github.com/moroshani/solar-hijri-calendar-component">
            <GitFork aria-hidden="true" />
            Repository
          </a>
        </nav>
      </header>

      <div className="lab-grid">
        <aside className="control-panel" aria-label="Calendar configuration">
          <div className="panel-heading">
            <span className="panel-icon"><Settings2 aria-hidden="true" /></span>
            <div>
              <h2>Configuration</h2>
              <p>Live component props</p>
            </div>
            <button className="icon-button" type="button" onClick={reset} title="Reset lab" aria-label="Reset lab">
              <RefreshCcw aria-hidden="true" />
            </button>
          </div>

          <fieldset className="control-group">
            <legend>Selection</legend>
            <div className="mode-list">
              {modeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    className="mode-button"
                    type="button"
                    aria-pressed={mode === option.value}
                    onClick={() => setMode(option.value)}
                  >
                    <Icon aria-hidden="true" />
                    <span>{option.label}</span>
                    {mode === option.value ? <Check className="mode-check" aria-hidden="true" /> : null}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="control-group">
            <legend>Locale</legend>
            <div className="segmented" role="group" aria-label="Locale">
              <button type="button" aria-pressed={locale === "fa"} onClick={() => setLocale("fa")}>
                فارسی
              </button>
              <button type="button" aria-pressed={locale === "en"} onClick={() => setLocale("en")}>
                English
              </button>
            </div>
          </fieldset>

          <fieldset className="control-group">
            <legend>Week starts on</legend>
            <div className="segmented" role="group" aria-label="Week start">
              <button
                type="button"
                aria-pressed={weekStartsOn === "saturday"}
                onClick={() => setWeekStartsOn("saturday")}
              >
                Saturday
              </button>
              <button
                type="button"
                aria-pressed={weekStartsOn === "sunday"}
                onClick={() => setWeekStartsOn("sunday")}
              >
                Sunday
              </button>
            </div>
          </fieldset>

          <fieldset className="control-group">
            <legend>Constraints</legend>
            <label className="switch-row">
              <span>
                <strong>Disable Fridays</strong>
                <small>Weekly closure</small>
              </span>
              <input
                type="checkbox"
                checked={disableFridays}
                onChange={(event) => setDisableFridays(event.target.checked)}
              />
            </label>
            <label className="switch-row">
              <span>
                <strong>Block days 1-7</strong>
                <small>Visible month only</small>
              </span>
              <input
                type="checkbox"
                checked={disableFirstWeek}
                onChange={(event) => setDisableFirstWeek(event.target.checked)}
              />
            </label>
          </fieldset>
        </aside>

        <section className="preview-panel" aria-label="Interactive calendar preview">
          <div className="preview-toolbar">
            <div>
              <span className="eyebrow">Live preview</span>
              <h2>{modeOptions.find((option) => option.value === mode)?.label} selection</h2>
            </div>
            <div className="preview-status">
              <span className="status-dot" />
              Interactive
            </div>
          </div>

          <div className="calendar-canvas" data-testid="calendar-preview">
            <div className="calendar-stage">
              <div className="calendar-jump" dir={locale === "fa" ? "rtl" : "ltr"}>
                <label>
                  <span>{locale === "fa" ? "ماه" : "Month"}</span>
                  <select
                    aria-label={locale === "fa" ? "انتخاب ماه" : "Select month"}
                    data-testid="month-picker"
                    value={visibleMonth.month}
                    onChange={(event) =>
                      setVisibleMonth((current) => ({ ...current, month: Number(event.target.value) }))
                    }
                  >
                    {monthNames[locale].map((name, index) => (
                      <option key={name} value={index + 1}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>{locale === "fa" ? "سال" : "Year"}</span>
                  <select
                    aria-label={locale === "fa" ? "انتخاب سال" : "Select year"}
                    data-testid="year-picker"
                    value={visibleMonth.year}
                    onChange={(event) =>
                      setVisibleMonth((current) => ({ ...current, year: Number(event.target.value) }))
                    }
                  >
                    {demoYears.map((year) => (
                      <option key={year} value={year}>
                        {formatDay(year, locale)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {mode === "single" ? (
                <SolarHijriCalendar
                  value={selectedDate}
                  onChange={setSelectedDate}
                  month={visibleMonth}
                  onMonthChange={setVisibleMonth}
                  locale={locale}
                  weekStartsOn={weekStartsOn}
                  minDate={minSelectableDate}
                  maxDate={maxSelectableDate}
                  isDateDisabled={disabledMatcher}
                  className="lab-calendar"
                  dayClassName={(day) => (day.day === 1 && day.isCurrentMonth ? "lab-day--first" : undefined)}
                  renderDay={(day) => (
                    <span className="day-content">
                      <span>{formatDay(day.day, locale)}</span>
                      {day.day === 1 && day.isCurrentMonth ? <span className="day-dot" /> : null}
                    </span>
                  )}
                />
              ) : null}

              {mode === "range" ? (
                <SolarHijriRangeCalendar
                  value={selectedRange}
                  onChange={setSelectedRange}
                  month={visibleMonth}
                  onMonthChange={setVisibleMonth}
                  locale={locale}
                  weekStartsOn={weekStartsOn}
                  minDate={minSelectableDate}
                  maxDate={maxSelectableDate}
                  isDateDisabled={disabledMatcher}
                  excludeDisabled
                  className="lab-calendar"
                />
              ) : null}

              {mode === "multiple" ? (
                <SolarHijriMultipleCalendar
                  value={selectedDates}
                  onChange={setSelectedDates}
                  month={visibleMonth}
                  onMonthChange={setVisibleMonth}
                  locale={locale}
                  weekStartsOn={weekStartsOn}
                  minDate={minSelectableDate}
                  maxDate={maxSelectableDate}
                  isDateDisabled={disabledMatcher}
                  min={1}
                  max={5}
                  required
                  className="lab-calendar"
                />
              ) : null}
            </div>
          </div>

          <div className="selection-summary" aria-live="polite">
            <div>
              <span>Solar Hijri</span>
              <strong data-testid="selected-date">{mode === "single" ? selectedKey : formatSolarDate(primaryDate, locale)}</strong>
            </div>
            <div>
              <span>Gregorian</span>
              <strong>{formatGregorianDate(primaryDate, locale)}</strong>
            </div>
            <div>
              <span>{mode === "range" ? "Range length" : mode === "multiple" ? "Selected dates" : "Visible month"}</span>
              <strong data-testid={mode === "range" ? "range-length" : mode === "multiple" ? "multiple-count" : "visible-month"}>
                {mode === "range" ? rangeLength || "open" : mode === "multiple" ? selectedDates.length : monthKey}
              </strong>
            </div>
          </div>

          <span className="sr-only" data-testid="selected-range">{rangeKey}</span>
          <span className="sr-only" data-testid="selected-multiple">{multipleKey}</span>
        </section>

        <aside className="inspector-panel" aria-label="Selection inspector">
          <div className="inspector-data">
            <div className="panel-heading">
              <span className="panel-icon panel-icon--coral"><Languages aria-hidden="true" /></span>
              <div>
                <h2>Inspector</h2>
                <p>Normalized output</p>
              </div>
            </div>

            <dl className="data-list">
              <div>
                <dt>Mode</dt>
                <dd>{mode}</dd>
              </div>
              <div>
                <dt>Primary</dt>
                <dd>{primaryDate ? dateKey(primaryDate) : "null"}</dd>
              </div>
              {mode === "range" ? (
                <div>
                  <dt>End</dt>
                  <dd>{secondaryDate ? dateKey(secondaryDate) : "null"}</dd>
                </div>
              ) : null}
              {mode === "multiple" ? (
                <div>
                  <dt>Values</dt>
                  <dd className="data-list__wrap">{multipleKey}</dd>
                </div>
              ) : null}
              <div>
                <dt>Direction</dt>
                <dd>{locale === "fa" ? "RTL" : "LTR"}</dd>
              </div>
            </dl>
          </div>

          <div className="inspector-code">
            <section className="code-panel" aria-label="Generated React code">
              <div className="code-heading">
                <span><Code2 aria-hidden="true" /> React</span>
                <button className="icon-button" type="button" onClick={copyCode} title="Copy code" aria-label="Copy code">
                  {copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
                </button>
              </div>
              <pre data-testid="generated-code"><code>{code}</code></pre>
            </section>

            <div className="runtime-note">
              <span className="runtime-note__mark" aria-hidden="true">TS</span>
              <p>Typed values, controlled state, no implicit JavaScript dates.</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
