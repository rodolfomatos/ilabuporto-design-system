"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const cn = require("./index18.cjs");
const variantBorderStyles = {
  default: "border-gray-200 dark:border-gray-800",
  success: "border-green-200 dark:border-green-800",
  error: "border-red-200 dark:border-red-800",
  warning: "border-yellow-200 dark:border-yellow-800"
};
function Card({ variant = "default", className, children, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: cn.cn(
        "bg-white dark:bg-gray-900 rounded-lg border p-4",
        variantBorderStyles[variant],
        className
      ),
      ...props,
      children
    }
  );
}
exports.Card = Card;
//# sourceMappingURL=index4.cjs.map
