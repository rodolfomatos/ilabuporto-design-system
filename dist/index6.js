import { jsxs, jsx } from "react/jsx-runtime";
import { cn } from "./index18.js";
import { forwardRef } from "react";
const Input = forwardRef(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || (label == null ? void 0 : label.toLowerCase().replace(/\s+/g, "-"));
    return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      label && /* @__PURE__ */ jsx("label", { htmlFor: inputId, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: label }),
      /* @__PURE__ */ jsx(
        "input",
        {
          ref,
          id: inputId,
          className: cn(
            "w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-gray-100 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            error ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-700",
            className
          ),
          ...props
        }
      ),
      error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600 dark:text-red-400", children: error })
    ] });
  }
);
Input.displayName = "Input";
export {
  Input
};
//# sourceMappingURL=index6.js.map
