import { jsx } from "react/jsx-runtime";
import { cn } from "./index19.js";
function Tabs({ tabs, activeKey, onChange, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex border-b border-gray-200 dark:border-gray-800", className), children: tabs.map((tab) => /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => onChange(tab.key),
      className: cn(
        "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
        activeKey === tab.key ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      ),
      children: tab.label
    },
    tab.key
  )) });
}
export {
  Tabs
};
//# sourceMappingURL=index14.js.map
