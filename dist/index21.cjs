"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const ThemeContext = react.createContext(void 0);
const listeners = /* @__PURE__ */ new Set();
let cachedDark = false;
let observer = null;
const isDark = () => typeof document !== "undefined" && document.documentElement.classList.contains("dark");
const getSnapshot = () => cachedDark;
function subscribe(callback) {
  cachedDark = isDark();
  if (!observer) {
    observer = new MutationObserver(() => {
      const next = isDark();
      if (next !== cachedDark) {
        cachedDark = next;
        listeners.forEach((l) => l());
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }
  listeners.add(callback);
  return () => listeners.delete(callback);
}
function ThemeProvider({ children }) {
  const dark = react.useSyncExternalStore(subscribe, getSnapshot, () => false);
  return /* @__PURE__ */ jsxRuntime.jsx(ThemeContext.Provider, { value: { dark }, children });
}
function useTheme() {
  const ctx = react.useContext(ThemeContext);
  return ctx ?? { dark: false };
}
exports.ThemeProvider = ThemeProvider;
exports.useTheme = useTheme;
//# sourceMappingURL=index21.cjs.map
