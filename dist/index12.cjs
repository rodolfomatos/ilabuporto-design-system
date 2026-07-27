"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const cn = require("./index19.cjs");
function SlideInPanel({ isOpen, onClose, title, children, className }) {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 bg-black/50 z-40", onClick: onClose, children: /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn.cn(
        "absolute right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 overflow-y-auto",
        className
      ),
      onClick: (e) => e.stopPropagation(),
      children: [
        title && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between z-10", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100", children: title }),
          /* @__PURE__ */ jsxRuntime.jsx("button", { onClick: onClose, className: "p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800", children: /* @__PURE__ */ jsxRuntime.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "p-6", children })
      ]
    }
  ) });
}
exports.SlideInPanel = SlideInPanel;
//# sourceMappingURL=index12.cjs.map
