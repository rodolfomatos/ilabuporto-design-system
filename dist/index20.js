import { jsxs, jsx } from "react/jsx-runtime";
import { cn } from "./index30.js";
import { Card } from "./index6.js";
const valueStyles = {
  default: "text-gray-900 dark:text-gray-100",
  success: "text-green-600 dark:text-green-400",
  error: "text-red-600 dark:text-red-400",
  warning: "text-yellow-600 dark:text-yellow-400"
};
const labelStyles = {
  default: "text-gray-500 dark:text-gray-400",
  success: "text-green-600 dark:text-green-400",
  error: "text-red-600 dark:text-red-400",
  warning: "text-yellow-600 dark:text-yellow-400"
};
const cardVariant = {
  default: "default",
  success: "success",
  error: "error",
  warning: "warning"
};
function StatCard({ label, value, variant = "default", className }) {
  return /* @__PURE__ */ jsxs(Card, { variant: cardVariant[variant], className, children: [
    /* @__PURE__ */ jsx("p", { className: cn("text-sm", labelStyles[variant]), children: label }),
    /* @__PURE__ */ jsx("p", { className: cn("text-2xl font-bold mt-1", valueStyles[variant]), children: value })
  ] });
}
export {
  StatCard
};
//# sourceMappingURL=index20.js.map
