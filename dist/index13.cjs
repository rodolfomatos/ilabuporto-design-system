"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const cn = require("./index30.cjs");
const react = require("react");
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
function SlideInPanel({ isOpen, onClose, title, children, className }) {
  const panelRef = react.useRef(null);
  const restoreFocusTo = react.useRef(null);
  const titleId = react.useId();
  react.useEffect(() => {
    var _a, _b;
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    restoreFocusTo.current = document.activeElement;
    const first = (_a = panelRef.current) == null ? void 0 : _a.querySelector(FOCUSABLE);
    (_b = first ?? panelRef.current) == null ? void 0 : _b.focus();
    return () => {
      var _a2, _b2;
      document.body.style.overflow = "";
      (_b2 = (_a2 = restoreFocusTo.current) == null ? void 0 : _a2.focus) == null ? void 0 : _b2.call(_a2);
    };
  }, [isOpen]);
  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const items = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
      (el) => !el.hasAttribute("hidden") && el.getAttribute("aria-hidden") !== "true"
    );
    if (items.length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const current = document.activeElement;
    const index = current ? items.indexOf(current) : -1;
    if (index === -1) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
      return;
    }
    const nextIndex = event.shiftKey ? (index - 1 + items.length) % items.length : (index + 1) % items.length;
    event.preventDefault();
    items[nextIndex].focus();
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 bg-black/50 z-40", onClick: onClose, children: /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: panelRef,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": title ? titleId : void 0,
      tabIndex: -1,
      onKeyDown,
      className: cn.cn(
        "absolute right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 overflow-y-auto",
        className
      ),
      onClick: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between z-10", children: [
          title && /* @__PURE__ */ jsxRuntime.jsx("h2", { id: titleId, className: "text-lg font-semibold text-gray-900 dark:text-gray-100", children: title }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              "aria-label": "Close panel",
              className: "p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800",
              children: /* @__PURE__ */ jsxRuntime.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M6 18L18 6M6 6l12 12"
                }
              ) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "p-6", children })
      ]
    }
  ) });
}
exports.SlideInPanel = SlideInPanel;
//# sourceMappingURL=index13.cjs.map
