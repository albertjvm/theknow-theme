import { createElement } from "react";

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
