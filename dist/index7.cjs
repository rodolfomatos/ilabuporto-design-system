"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const cn = require("./index18.cjs");
function Modal({ isOpen, onClose, title, children, className }) {
  const [visible, setVisible] = react.useState(false);
  react.useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  react.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (!visible) return null;
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn.cn("fixed inset-0 z-50 overflow-y-auto", !isOpen && "opacity-0"), children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-h-full items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 bg-black/50 transition-opacity", onClick: onClose }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: cn.cn(
          "relative w-full max-w-lg transform rounded-lg bg-white dark:bg-gray-900 p-6 shadow-xl transition-all",
          className
        ),
        children: [
          title && /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2", children: title }),
          children
        ]
      }
    )
  ] }) });
}
exports.Modal = Modal;
//# sourceMappingURL=index7.cjs.map
