import { createElement, useState } from "react";

export function Card({ title, note, children }) {
  return createElement("section", { className: "card" },
    createElement("h2", null, title),
    note && createElement("p", { className: "note" }, note),
    children,
  );
}

export function PageTitle({ title, children }) {
  return createElement("div", { className: "page-title" },
    createElement("h1", null, title),
    children,
  );
}

export function ElectionsLabel() {
  return createElement("span", null, createElement("span", { "aria-hidden": true }, "🗳️"), " Elections");
}

export function Brand({ children }) {
  return createElement("div", { className: "brand" },
    createElement("a", { className: "brand-name", href: "https://theknow.ca/", "aria-label": "TheKnow home" }, "TheKnow"),
    children,
  );
}

export function OverviewIntro({ eyebrow, title, description, titleId, children }) {
  return createElement("section", { className: "overview-intro", "aria-labelledby": titleId },
    createElement("p", { className: "overview-eyebrow" }, eyebrow),
    createElement("h1", { id: titleId }, title),
    createElement("p", null, description),
    children && createElement("div", { className: "overview-actions" }, children),
  );
}

export function TallyBar({ yes, no }) {
  const cast = yes + no || 1;
  return createElement("span", { className: "tally", title: `${yes} Yes, ${no} No` },
    createElement("span", { className: "tally-yes", style: { width: `${yes / cast * 100}%` } }),
    createElement("span", { className: "tally-no", style: { width: `${no / cast * 100}%` } }),
  );
}

export function MotionRow({ title, meta, children, yes, no, outcome, outcomeClass }) {
  return createElement("li", { className: "motion" },
    createElement("div", { className: "motion-main" },
      title,
      createElement("div", { className: "motion-meta" }, meta),
      children,
    ),
    createElement("div", { className: "motion-result" },
      createElement(TallyBar, { yes, no }),
      createElement("span", { className: `badge ${outcomeClass || ""}` }, outcome),
      createElement("span", { className: "score" }, `${yes}–${no}`),
    ),
  );
}

export function SortHeader({ label, active, descending, onClick }) {
  return createElement("th", { scope: "col", "aria-sort": active ? (descending ? "descending" : "ascending") : undefined },
    createElement("button", { className: "sort", type: "button", onClick }, label, active ? (descending ? " ▼" : " ▲") : ""),
  );
}

export function SortableTable({ rows, columns, rowKey, initialSort, initialDescending = false }) {
  const [sort, setSort] = useState(initialSort);
  const [descending, setDescending] = useState(initialDescending);
  const column = columns.find((item) => item.key === sort);
  if (!column) throw new Error(`Unknown table sort column: ${sort}`);
  const sorted = [...rows].sort((a, b) => {
    const x = column.value(a), y = column.value(b);
    if (x == null) return y == null ? 0 : 1;
    if (y == null) return -1;
    const result = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y), undefined, { numeric: true });
    return descending ? -result : result;
  });
  return createElement("div", { className: "table-scroll" }, createElement("table", { className: "table" },
    createElement("thead", null, createElement("tr", null, columns.map((item) =>
      createElement(SortHeader, { key: item.key, label: item.label, active: item.key === sort, descending,
        onClick: () => { if (item.key === sort) setDescending(!descending); else { setSort(item.key); setDescending(false); } } })))),
    createElement("tbody", null, sorted.map((row) => createElement("tr", { key: rowKey(row) }, columns.map((item) =>
      createElement("td", { key: item.key }, item.render ? item.render(row) : item.value(row) ?? "—"))))),
  ));
}
