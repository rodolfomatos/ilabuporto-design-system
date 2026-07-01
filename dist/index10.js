import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { cn } from "./index18.js";
function Sidebar({ items, activeKey, onSelect, header, className, isOpen = true, onClose }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: cn(
          "fixed inset-y-0 left-0 z-40 w-56 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        ),
        children: [
          header && /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between", children: [
            header,
            onClose && /* @__PURE__ */ jsx("button", { onClick: onClose, className: "md:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "p-3 space-y-1", children: items.map((item) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                onSelect(item.key);
                onClose == null ? void 0 : onClose();
              },
              className: cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                activeKey === item.key ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              ),
              children: [
                item.icon && /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: item.icon }) }),
                item.label
              ]
            },
            item.key
          )) })
        ]
      }
    ),
    !isOpen && onClose && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 z-30 md:hidden", onClick: () => onClose == null ? void 0 : onClose() })
  ] });
}
export {
  Sidebar
};
//# sourceMappingURL=index10.js.map
