import { jsxs, jsx } from "react/jsx-runtime";
import { cn } from "./index18.js";
import { forwardRef } from "react";
const Select = forwardRef(
  ({ label, error, className, children, id, ...props }, ref) => {
    const selectId = id || (label == null ? void 0 : label.toLowerCase().replace(/\s+/g, "-"));
    return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      label && /* @__PURE__ */ jsx("label", { htmlFor: selectId, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: label }),
      /* @__PURE__ */ jsx(
        "select",
        {
          ref,
          id: selectId,
          className: cn(
            "w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-gray-100 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            error ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-700",
            className
          ),
          ...props,
          children
        }
      ),
      error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600 dark:text-red-400", children: error })
    ] });
  }
);
Select.displayName = "Select";
export {
  Select
};
//# sourceMappingURL=index9.js.map
