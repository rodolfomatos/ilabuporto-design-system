"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const cn = require("./index30.cjs");
const react = require("react");
function Tabs({ tabs, activeKey, onChange, className }) {
  const listRef = react.useRef(null);
  const onKeyDown = (event) => {
    var _a, _b, _c;
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const focused = (_a = document.activeElement) == null ? void 0 : _a.getAttribute("data-key");
    const origin = focused ?? activeKey;
    const index = tabs.findIndex((t) => t.key === origin);
    if (index < 0) return;
    event.preventDefault();
    let next;
    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % tabs.length;
        break;
      case "ArrowLeft":
        next = (index - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        next = 0;
        break;
      default:
        next = tabs.length - 1;
    }
    const target = tabs[next];
    onChange(target.key);
    const buttons = (_b = listRef.current) == null ? void 0 : _b.querySelectorAll('[role="tab"]');
    (_c = buttons == null ? void 0 : buttons[next]) == null ? void 0 : _c.focus();
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: listRef,
      role: "tablist",
      onKeyDown,
      className: cn.cn("flex border-b border-gray-200 dark:border-gray-800", className),
      children: tabs.map((tab) => {
        const selected = activeKey === tab.key;
        return /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            role: "tab",
            "data-key": tab.key,
            "aria-selected": selected,
            "aria-controls": tab.panelId,
            tabIndex: selected ? 0 : -1,
            onClick: () => onChange(tab.key),
            className: cn.cn(
              "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
              selected ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            ),
            children: tab.label
          },
          tab.key
        );
      })
    }
  );
}
exports.Tabs = Tabs;
//# sourceMappingURL=index15.cjs.map
