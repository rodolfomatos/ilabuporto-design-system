import { jsxs, jsx } from "react/jsx-runtime";
import { cn } from "./index30.js";
import { Card } from "./index6.js";
function ChartCard({ title, subtitle, className, children }) {
  return /* @__PURE__ */ jsxs(Card, { className: cn(className), children: [
    (title || subtitle) && /* @__PURE__ */ jsxs("div", { className: "mb-4 space-y-0.5", children: [
      title && /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-gray-900 dark:text-white", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: subtitle })
    ] }),
    children
  ] });
}
export {
  ChartCard
};
//# sourceMappingURL=index22.js.map
