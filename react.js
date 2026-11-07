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
