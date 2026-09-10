import { jsx } from "react/jsx-runtime";
import { cn } from "./index30.js";
function SegmentedControl({
  options,
  value,
  onChange,
  className,
  ariaLabel
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "group",
      "aria-label": ariaLabel,
      className: cn(
        "inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-0.5 gap-0.5",
        className
      ),
      children: options.map((o) => {
        const active = o.value === value;
        return /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-pressed": active,
            onClick: () => onChange(o.value),
            className: cn(
              "px-3 py-1 text-sm rounded-md transition-colors",
              active ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            ),
            children: o.label
          },
          String(o.value)
        );
      })
    }
  );
}
export {
  SegmentedControl
};
//# sourceMappingURL=index26.js.map
