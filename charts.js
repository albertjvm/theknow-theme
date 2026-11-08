import { createElement as h } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function TurnoutChart({ data }) {
  return h(ResponsiveContainer, { width: "100%", height: 280 },
    h(BarChart, { data, margin: { left: 0, right: 12 } },
      h(CartesianGrid, { vertical: false }),
      h(XAxis, { dataKey: "label", tick: { fontSize: 11 }, interval: 0, angle: -35, textAnchor: "end", height: 60 }),
      h(YAxis, { unit: "%", domain: [0, 70] }),
      h(Tooltip, { formatter: (value) => [`${value}%`, "Turnout"], labelFormatter: (_, payload) => payload[0]?.payload?.name ?? "" }),
      h(Bar, { dataKey: "turnout" }, data.map((item) => h(Cell, { key: item.name, fill: item.kind === "by-election" ? "#d97706" : "#7c3aed" }))),
    ),
  );
}
