import { jsx, jsxs } from "react/jsx-runtime";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import { useTheme } from "./index21.js";
import { fmtMonthDay, chartPalette } from "./index31.js";
function LineUsageChart({
  data,
  color,
  height = 280,
  dark: darkOverride
}) {
  const { dark: darkCtx } = useTheme();
  const dark = darkOverride ?? darkCtx;
  const p = chartPalette(dark);
  return /* @__PURE__ */ jsx("div", { style: { width: "100%", height }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data, margin: { top: 8, right: 8, bottom: 0, left: -12 }, children: [
    /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: p.grid, vertical: false }),
    /* @__PURE__ */ jsx(
      XAxis,
      {
        dataKey: "date",
        tickFormatter: fmtMonthDay,
        stroke: p.axis,
        tick: { fill: p.axis, fontSize: 12 },
        tickLine: false,
        axisLine: { stroke: p.grid }
      }
    ),
    /* @__PURE__ */ jsx(
      YAxis,
      {
        stroke: p.axis,
        tick: { fill: p.axis, fontSize: 12 },
        tickLine: false,
        axisLine: { stroke: p.grid },
        allowDecimals: false,
        width: 40
      }
    ),
    /* @__PURE__ */ jsx(
      Tooltip,
      {
        contentStyle: p.tooltip,
        labelStyle: { color: p.axis },
        labelFormatter: (label) => fmtMonthDay(String(label)),
        cursor: { stroke: p.cursor }
      }
    ),
    /* @__PURE__ */ jsx(
      Line,
      {
        type: "monotone",
        dataKey: "count",
        stroke: color ?? p.line,
        strokeWidth: 2,
        dot: false,
        activeDot: { r: 4 }
      }
    )
  ] }) }) });
}
export {
  LineUsageChart
};
//# sourceMappingURL=index23.js.map
