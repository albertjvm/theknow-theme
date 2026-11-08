import { createElement as h } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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

export function YearlyCouncilChart({ data, showAttendance = true }) {
  return h(ResponsiveContainer, { width: "100%", height: 240 },
    h(BarChart, { data, margin: { right: 20 } },
      h(CartesianGrid, { vertical: false }),
      h(XAxis, { dataKey: "year" }),
      showAttendance && h(YAxis, { yAxisId: "l", domain: [0.5, 1], tickFormatter: (value) => `${Math.round(value * 100)}%` }),
      h(YAxis, { yAxisId: "r", orientation: showAttendance ? "right" : "left", allowDecimals: false }),
      h(Tooltip, { formatter: (value, name) => name === "Attendance" ? `${(Number(value) * 100).toFixed(1)}%` : value }),
      h(Legend),
      showAttendance && h(Bar, { yAxisId: "l", dataKey: "attendance", name: "Attendance", fill: "#2563eb" }),
      h(Bar, { yAxisId: "r", dataKey: "motions", name: "Council motions", fill: "#f59e0b" }),
    ),
  );
}
