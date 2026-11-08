import { createElement as h, useEffect, useMemo, useRef, useState } from "react";

const HEIGHT = 460, RADIUS = 6, FONT = 11;
const overlaps = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

export function VotingBlocs({ layout, names, agreements, mayorId, onSelect }) {
  const box = useRef(null);
  const [width, setWidth] = useState(720);
  const [hover, setHover] = useState(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setWidth(el.clientWidth));
    observer.observe(el);
    setWidth(el.clientWidth);
    return () => observer.disconnect();
  }, []);
  const vals = layout.map((point) => agreements[point.id]).filter((value) => value != null);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const color = (id) => !mayorId ? "#2563eb" : id === mayorId ? "#111827" : agreements[id] == null ? "#9ca3af" : `hsl(${Math.round(((agreements[id] - lo) / (hi - lo || 1)) * 120)} 70% 42%)`;
  const dots = useMemo(() => {
    const xs = layout.map((point) => point.x), ys = layout.map((point) => point.y);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    const pts = layout.map((point) => ({
      id: point.id, name: (names[point.id] ?? point.id).split(" ").slice(-1)[0],
      x: 40 + ((point.x - x0) / (x1 - x0 || 1)) * (width - 80),
      y: 28 + (1 - (point.y - y0) / (y1 - y0 || 1)) * (HEIGHT - 56),
      far: (point.x - cx) ** 2 + (point.y - cy) ** 2,
    }));
    const placed = pts.map((point) => ({ x: point.x - RADIUS, y: point.y - RADIUS, w: 2 * RADIUS, h: 2 * RADIUS }));
    const labels = new Map();
    const order = [...pts].sort((a, b) => (b.id === mayorId ? 1 : 0) - (a.id === mayorId ? 1 : 0) || b.far - a.far);
    for (const point of order) {
      const w = point.name.length * FONT * 0.56 + 4, height = FONT + 2, gap = RADIUS + 2;
      const options = [
        { x: point.x - w / 2, y: point.y - gap - height, anchor: "middle", tx: point.x, ty: point.y - gap - 3 },
        { x: point.x - w / 2, y: point.y + gap, anchor: "middle", tx: point.x, ty: point.y + gap + height - 3 },
        { x: point.x + gap, y: point.y - height / 2, anchor: "start", tx: point.x + gap, ty: point.y + height / 2 - 3 },
        { x: point.x - gap - w, y: point.y - height / 2, anchor: "end", tx: point.x - gap, ty: point.y + height / 2 - 3 },
      ];
      for (const option of options) {
        const rect = { x: option.x, y: option.y, w, h: height };
        if (rect.x < 0 || rect.x + rect.w > width || rect.y < 0 || rect.y + rect.h > HEIGHT || placed.some((item) => overlaps(rect, item))) continue;
        placed.push(rect);
        labels.set(point.id, { x: option.tx, y: option.ty, anchor: option.anchor });
        break;
      }
    }
    return { pts, labels };
  }, [layout, names, width, mayorId]);
  const selected = dots.pts.find((point) => point.id === hover);
  const hidden = dots.pts.length - dots.labels.size;
  return h("div", { ref: box, style: { position: "relative" } },
    h("svg", { width: "100%", height: HEIGHT, viewBox: `0 0 ${width} ${HEIGHT}`, role: "group", "aria-label": "Voting blocs" },
      dots.pts.map((point) => h("circle", {
        key: point.id, cx: point.x, cy: point.y, r: point.id === hover ? RADIUS + 2 : RADIUS,
        fill: color(point.id), stroke: "#fff", strokeWidth: 1.5, style: { cursor: "pointer" },
        tabIndex: 0, role: "link", "aria-label": names[point.id],
        onMouseEnter: () => setHover(point.id), onMouseLeave: () => setHover(null),
        onFocus: () => setHover(point.id), onBlur: () => setHover(null),
        onClick: () => onSelect(point.id), onKeyDown: (event) => { if (event.key === "Enter") onSelect(point.id); },
      })),
      dots.pts.map((point) => {
        const label = dots.labels.get(point.id);
        return label ? h("text", { key: point.id, x: label.x, y: label.y, textAnchor: label.anchor, fontSize: FONT,
          fontWeight: point.id === mayorId ? 700 : 400, fill: "#1f2937", stroke: "#fff", strokeWidth: 3, paintOrder: "stroke", pointerEvents: "none" }, point.name) : null;
      }),
    ),
    selected && h("div", { className: "tooltip", style: { position: "absolute", left: Math.min(Math.max(selected.x, 90), width - 90), top: selected.y - 56, transform: "translateX(-50%)", pointerEvents: "none", whiteSpace: "nowrap" } },
      h("b", null, names[selected.id]), h("div", null, selected.id === mayorId ? "Mayor" : agreements[selected.id] == null ? "Did not serve alongside the mayor" : `${(agreements[selected.id] * 100).toFixed(0)}% agreement with the mayor`)),
    hidden > 0 && h("p", { className: "note", style: { margin: "4px 0 0" } }, "Some names are hidden where dots are crowded; hover a dot to see who it is."),
  );
}
