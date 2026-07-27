import { jsxs, jsx } from "react/jsx-runtime";
import { cn } from "./index19.js";
function Toggle({ enabled, onChange, label, disabled }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": enabled,
        disabled,
        onClick: () => onChange(!enabled),
        className: cn(
          "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
          enabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700",
          disabled && "opacity-50 cursor-not-allowed"
        ),
        children: /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-1",
              enabled ? "translate-x-6" : "translate-x-1"
            )
          }
        )
      }
    ),
    label && /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: label })
  ] });
}
export {
  Toggle
};
//# sourceMappingURL=index15.js.map
