import { jsx } from "react/jsx-runtime";
import { cn } from "./index18.js";
const variantStyles = {
  success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  neutral: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
};
function Badge({ variant = "neutral", className, children }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        className
      ),
      children
    }
  );
}
export {
  Badge
};
//# sourceMappingURL=index3.js.map
