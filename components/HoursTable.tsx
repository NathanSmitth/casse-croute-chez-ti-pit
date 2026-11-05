"use client";

import { useEffect, useState } from "react";
import type { DayHours, DayKey } from "@/data/site";
import { isOpenAt, nowInValDor } from "@/lib/hours";

interface Row {
  day: DayKey;
  label: string;
  hours: string;
  closed: boolean;
}

// Clean hours table. Today gets a red left border + red dot on a light row — computed in
// the browser (Eastern time) after hydration so static HTML never shows a
// stale "today".
export default function HoursTable({
  rows,
  raw,
  confirmed,
  labels,
}: {
  rows: Row[];
  raw: DayHours[];
  confirmed: boolean;
  labels: { today: string; openNow: string; closedNow: string; tbc: string };
}) {
  const [today, setToday] = useState<DayKey | null>(null);
  const [openNow, setOpenNow] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => {
      const now = nowInValDor();
      setToday(now.day);
      const todayHours = raw.find((d) => d.day === now.day);
      setOpenNow(todayHours ? isOpenAt(todayHours, now.minutes) : null);
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [raw]);

  return (
    <div>
      <ol className="-mx-3">
        {rows.map((row) => {
          const isToday = row.day === today;
          return (
            <li
              key={row.day}
              aria-current={isToday ? "date" : undefined}
              className={`flex min-h-11 items-center justify-between gap-4 rounded-r-lg border-l-2 px-3 text-[0.975rem] transition-colors duration-300 ${
                isToday ? "border-ketchup bg-paper" : "border-transparent"
              }`}
            >
              <span className={`flex items-center gap-2.5 ${isToday ? "font-semibold text-charcoal" : "text-charcoal/80"}`}>
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full ${isToday ? "bg-ketchup" : "bg-transparent"}`}
                />
                {row.label}
                {isToday && <span className="sr-only"> — {labels.today}</span>}
              </span>
              <span
                className={`tabular ${
                  isToday ? "font-semibold text-charcoal" : row.closed ? "text-charcoal/70" : "text-charcoal/80"
                }`}
              >
                {row.hours}
              </span>
            </li>
          );
        })}
      </ol>

      {confirmed && openNow !== null ? (
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-seafoam-dark">
          <span aria-hidden="true" className={`size-2 rounded-full ${openNow ? "bg-seafoam" : "bg-charcoal/30"}`} />
          {openNow ? labels.openNow : labels.closedNow}
        </p>
      ) : (
        !confirmed && <p className="mt-4 text-sm text-charcoal/70">{labels.tbc}</p>
      )}
    </div>
  );
}
