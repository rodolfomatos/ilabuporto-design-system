"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const cn = require("./index19.cjs");
const variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50",
  secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 disabled:opacity-50",
  destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:opacity-50",
  ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-400 dark:hover:bg-gray-800 disabled:opacity-50"
};
const sizeStyles = {
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base"
};
const Button = react.forwardRef(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        ref,
        disabled: disabled || loading,
        className: cn.cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
          variantStyles[variant],
          sizeStyles[size],
          className
        ),
        ...props,
        children: [
          loading && /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "animate-spin h-4 w-4", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsxRuntime.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
            /* @__PURE__ */ jsxRuntime.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
          ] }),
          children
        ]
      }
    );
  }
);
Button.displayName = "Button";
exports.Button = Button;
//# sourceMappingURL=index2.cjs.map
