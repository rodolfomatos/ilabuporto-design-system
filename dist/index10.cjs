"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const cn = require("./index18.cjs");
function Sidebar({ items, activeKey, onSelect, header, footer, className, width = "w-56", isOpen = true, onClose }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      "aside",
      {
        className: cn.cn(
          "fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          width,
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        ),
        children: [
          header && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between", children: [
            header,
            onClose && /* @__PURE__ */ jsxRuntime.jsx("button", { onClick: onClose, className: "md:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800", children: /* @__PURE__ */ jsxRuntime.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("nav", { className: "p-3 space-y-1 flex-1 overflow-y-auto", children: items.map((item) => /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              onClick: () => {
                onSelect(item.key);
                onClose == null ? void 0 : onClose();
              },
              className: cn.cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                activeKey === item.key ? "bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              ),
              children: [
                item.renderIcon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "w-5 h-5 flex-shrink-0", children: item.renderIcon }) : item.icon ? /* @__PURE__ */ jsxRuntime.jsx("svg", { className: "w-5 h-5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: item.icon }) }) : null,
                item.label
              ]
            },
            item.key
          )) }),
          footer && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "border-t border-gray-200 dark:border-gray-800 p-3", children: footer })
        ]
      }
    ),
    !isOpen && onClose && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 bg-black/50 z-30 md:hidden", onClick: () => onClose == null ? void 0 : onClose() })
  ] });
}
exports.Sidebar = Sidebar;
//# sourceMappingURL=index10.cjs.map
