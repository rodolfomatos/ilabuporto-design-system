"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const cn = require("./index18.cjs");
const react = require("react");
const Select = react.forwardRef(
  ({ label, error, className, children, id, ...props }, ref) => {
    const selectId = id || (label == null ? void 0 : label.toLowerCase().replace(/\s+/g, "-"));
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1", children: [
      label && /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: selectId, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: label }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "select",
        {
          ref,
          id: selectId,
          className: cn.cn(
            "w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-gray-100 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            error ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-700",
            className
          ),
          ...props,
          children
        }
      ),
      error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-red-600 dark:text-red-400", children: error })
    ] });
  }
);
Select.displayName = "Select";
exports.Select = Select;
//# sourceMappingURL=index9.cjs.map
