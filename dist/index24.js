import { jsx, jsxs } from "react/jsx-runtime";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { useTheme } from "./index21.js";
import { chartPalette } from "./index31.js";
function TopToolsChart({
  data,
  labelOf,
  color,
  height = 320,
  dark: darkOverride
}) {
  const { dark: darkCtx } = useTheme();
  const dark = darkOverride ?? darkCtx;
  const p = chartPalette(dark);
  const label = (id) => {
    var _a;
    return labelOf ? labelOf(String(id)) : ((_a = data.find((d) => d.tool_id === id)) == null ? void 0 : _a.tool_name) ?? String(id);
  };
  return /* @__PURE__ */ jsx("div", { style: { width: "100%", height }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
    BarChart,
    {
      data,
      layout: "vertical",
      margin: { top: 8, right: 16, bottom: 0, left: 0 },
      children: [
        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: p.grid, horizontal: false }),
        /* @__PURE__ */ jsx(
          XAxis,
          {
            type: "number",
            stroke: p.axis,
            tick: { fill: p.axis, fontSize: 12 },
            tickLine: false,
            axisLine: { stroke: p.grid },
            allowDecimals: false
          }
        ),
        /* @__PURE__ */ jsx(
          YAxis,
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
        /* @__PURE__ */ jsx(
          Tooltip,
          {
            contentStyle: p.tooltip,
            labelStyle: { color: p.axis },
            labelFormatter: label,
            cursor: { fill: p.cursor, opacity: 0.1 }
          }
        ),
        /* @__PURE__ */ jsx(
          Bar,
          {
            dataKey: "count",
            fill: color ?? p.line,
            radius: [0, 4, 4, 0],
            barSize: 18
          }
        )
      ]
    }
  ) }) });
}
export {
  TopToolsChart
};
//# sourceMappingURL=index24.js.map
