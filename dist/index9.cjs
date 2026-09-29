"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const cn = require("./index30.cjs");
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
function Modal({ isOpen, onClose, title, children, className }) {
  const [visible, setVisible] = react.useState(false);
  const panelRef = react.useRef(null);
  const restoreFocusTo = react.useRef(null);
  const titleId = react.useId();
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
  react.useEffect(() => {
    var _a, _b;
    if (!visible) return;
    restoreFocusTo.current = document.activeElement;
    const first = (_a = panelRef.current) == null ? void 0 : _a.querySelector(FOCUSABLE);
    (_b = first ?? panelRef.current) == null ? void 0 : _b.focus();
    return () => {
      var _a2, _b2;
      (_b2 = (_a2 = restoreFocusTo.current) == null ? void 0 : _a2.focus) == null ? void 0 : _b2.call(_a2);
    };
  }, [visible]);
  const onKeyDown = react.useCallback(
    (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (items.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );
  if (!visible) return null;
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn.cn("fixed inset-0 z-50 overflow-y-auto", !isOpen && "opacity-0"), children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-h-full items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 bg-black/50 transition-opacity", onClick: onClose }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref: panelRef,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": title ? titleId : void 0,
        tabIndex: -1,
        onKeyDown,
        className: cn.cn(
          "relative w-full max-w-lg transform rounded-lg bg-white dark:bg-gray-900 p-6 shadow-xl transition-all",
          className
        ),
        children: [
          title && /* @__PURE__ */ jsxRuntime.jsx("h3", { id: titleId, className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2", children: title }),
          children
        ]
      }
    )
  ] }) });
}
exports.Modal = Modal;
//# sourceMappingURL=index9.cjs.map
