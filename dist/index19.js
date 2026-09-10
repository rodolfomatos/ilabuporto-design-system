import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "./index30.js";
import { Sidebar } from "./index12.js";
function AppShell({
  items,
  activeKey,
  onSelect,
  title,
  subtitle,
  header,
  sidebarHeader,
  backTo,
  children,
  className,
  contentClassName
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return /* @__PURE__ */ jsxs("main", { className: cn("min-h-screen bg-gray-50 dark:bg-gray-950 flex", className), children: [
    /* @__PURE__ */ jsx(
      Sidebar,
      {
        items,
        activeKey,
        onSelect,
        header: sidebarHeader,
        isOpen: sidebarOpen,
        onClose: () => setSidebarOpen(false)
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: cn("flex-1 p-4 md:p-8 overflow-auto", contentClassName), children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-start gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSidebarOpen(true),
            className: "md:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400",
            "aria-label": "Open sidebar",
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: title }),
          subtitle && /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 mt-1", children: subtitle }),
          backTo
        ] })
      ] }),
      header,
      children
    ] })
  ] });
}
export {
  AppShell
};
//# sourceMappingURL=index19.js.map
