"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const cn = require("./index30.cjs");
const Card = require("./index6.cjs");
function ChartCard({ title, subtitle, className, children }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(Card.Card, { className: cn.cn(className), children: [
    (title || subtitle) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mb-4 space-y-0.5", children: [
      title && /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-base font-semibold text-gray-900 dark:text-white", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: subtitle })
    ] }),
    children
  ] });
}
exports.ChartCard = ChartCard;
//# sourceMappingURL=index22.cjs.map
