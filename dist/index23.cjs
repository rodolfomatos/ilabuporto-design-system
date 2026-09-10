"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const recharts = require("recharts");
const ThemeProvider = require("./index21.cjs");
const shared = require("./index31.cjs");
function LineUsageChart({
  data,
  color,
  height = 280,
  dark: darkOverride
}) {
  const { dark: darkCtx } = ThemeProvider.useTheme();
  const dark = darkOverride ?? darkCtx;
  const p = shared.chartPalette(dark);
  return /* @__PURE__ */ jsxRuntime.jsx("div", { style: { width: "100%", height }, children: /* @__PURE__ */ jsxRuntime.jsx(recharts.ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntime.jsxs(recharts.LineChart, { data, margin: { top: 8, right: 8, bottom: 0, left: -12 }, children: [
    /* @__PURE__ */ jsxRuntime.jsx(recharts.CartesianGrid, { strokeDasharray: "3 3", stroke: p.grid, vertical: false }),
    /* @__PURE__ */ jsxRuntime.jsx(
      recharts.XAxis,
      {
        dataKey: "date",
        tickFormatter: shared.fmtMonthDay,
        stroke: p.axis,
        tick: { fill: p.axis, fontSize: 12 },
        tickLine: false,
        axisLine: { stroke: p.grid }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      recharts.YAxis,
      {
        stroke: p.axis,
        tick: { fill: p.axis, fontSize: 12 },
        tickLine: false,
        axisLine: { stroke: p.grid },
        allowDecimals: false,
        width: 40
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      recharts.Tooltip,
      {
        contentStyle: p.tooltip,
        labelStyle: { color: p.axis },
        labelFormatter: (label) => shared.fmtMonthDay(String(label)),
        cursor: { stroke: p.cursor }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      recharts.Line,
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
exports.LineUsageChart = LineUsageChart;
//# sourceMappingURL=index23.cjs.map
