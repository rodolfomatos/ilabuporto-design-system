"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const recharts = require("recharts");
const ThemeProvider = require("./index21.cjs");
const shared = require("./index31.cjs");
function SuccessErrorChart({
  data,
  labelOf,
  successColor,
  errorColor,
  height = 320,
  dark: darkOverride
}) {
  const { dark: darkCtx } = ThemeProvider.useTheme();
  const dark = darkOverride ?? darkCtx;
  const p = shared.chartPalette(dark);
  const label = (id) => {
    var _a;
    return labelOf ? labelOf(String(id)) : ((_a = data.find((d) => d.tool_id === id)) == null ? void 0 : _a.tool_name) ?? String(id);
  };
  return /* @__PURE__ */ jsxRuntime.jsx("div", { style: { width: "100%", height }, children: /* @__PURE__ */ jsxRuntime.jsx(recharts.ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntime.jsxs(
    recharts.BarChart,
    {
      data,
      layout: "vertical",
      margin: { top: 8, right: 16, bottom: 0, left: 0 },
      barCategoryGap: "20%",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(recharts.CartesianGrid, { strokeDasharray: "3 3", stroke: p.grid, horizontal: false }),
        /* @__PURE__ */ jsxRuntime.jsx(
          recharts.XAxis,
          {
            type: "number",
            stroke: p.axis,
            tick: { fill: p.axis, fontSize: 12 },
            tickLine: false,
            axisLine: { stroke: p.grid },
            allowDecimals: false
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          recharts.YAxis,
          {
            type: "category",
            dataKey: "tool_id",
            width: 120,
            tickFormatter: label,
            tick: { fill: p.axis, fontSize: 12 },
            stroke: p.axis,
            tickLine: false,
            axisLine: false
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          recharts.Tooltip,
          {
            contentStyle: p.tooltip,
            labelStyle: { color: p.axis },
            labelFormatter: label,
            cursor: { fill: p.cursor, opacity: 0.1 }
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(recharts.Legend, { wrapperStyle: { fontSize: 12, color: p.axis, paddingTop: 8 } }),
        /* @__PURE__ */ jsxRuntime.jsx(
          recharts.Bar,
          {
            dataKey: "success",
            stackId: "a",
            fill: successColor ?? p.success,
            radius: [0, 4, 4, 0],
            name: "Success",
            barSize: 18
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          recharts.Bar,
          {
            dataKey: "error",
            stackId: "a",
            fill: errorColor ?? p.error,
            radius: [0, 4, 4, 0],
            name: "Error",
            barSize: 18
          }
        )
      ]
    }
  ) }) });
}
exports.SuccessErrorChart = SuccessErrorChart;
//# sourceMappingURL=index25.cjs.map
