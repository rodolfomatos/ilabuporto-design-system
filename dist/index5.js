import { jsx } from "react/jsx-runtime";
import { cn } from "./index19.js";
const variantBorderStyles = {
  default: "border-gray-200 dark:border-gray-800",
  success: "border-green-200 dark:border-green-800",
  error: "border-red-200 dark:border-red-800",
  warning: "border-yellow-200 dark:border-yellow-800"
};
function Card({ variant = "default", className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "bg-white dark:bg-gray-900 rounded-lg border p-4",
        variantBorderStyles[variant],
        className
      ),
      ...props,
      children
    }
  );
}
export {
  Card
};
//# sourceMappingURL=index5.js.map
