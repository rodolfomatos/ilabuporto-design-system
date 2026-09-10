import { jsx } from "react/jsx-runtime";
import { createContext, useSyncExternalStore, useContext } from "react";
const ThemeContext = createContext(void 0);
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
  const dark = useSyncExternalStore(subscribe, getSnapshot, () => false);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { dark }, children });
}
function useTheme() {
  const ctx = useContext(ThemeContext);
  return ctx ?? { dark: false };
}
export {
  ThemeProvider,
  useTheme
};
//# sourceMappingURL=index21.js.map
