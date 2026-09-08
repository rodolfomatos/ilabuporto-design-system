import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { cn } from "./index24.js";
import { LOGO_UP_DIGITAL } from "./index5.js";
function Navbar({
  title,
  logo,
  backgroundColor = "#009FDF",
  children,
  className
}) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: cn("sticky top-0 z-50 shadow text-white", className),
      style: { backgroundColor },
      children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-2 sm:px-4 lg:px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-14 sm:h-16", children: [
        /* @__PURE__ */ jsxs("a", { href: "/", className: "flex items-center min-w-0", children: [
          logo ?? /* @__PURE__ */ jsx("img", { src: LOGO_UP_DIGITAL, alt: "UPdigital", className: "h-5 w-auto sm:h-7 brightness-0 invert", width: 120, height: 30 }),
          title && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "mx-2 text-white/50", children: "|" }),
            /* @__PURE__ */ jsx("span", { className: "text-base sm:text-lg font-semibold truncate", children: title })
          ] })
        ] }),
        children && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children })
      ] }) })
    }
  );
}
function LanguageToggle({ current, options, onChange }) {
  return /* @__PURE__ */ jsx(Fragment, { children: options.map((opt) => /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => onChange(opt.code),
      className: `px-2 py-1 text-sm font-medium rounded transition-colors ${current === opt.code ? "bg-white/20" : "hover:bg-white/20"}`,
      children: opt.label
    },
    opt.code
  )) });
}
function ThemeToggle({ dark, onToggle, title, className, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: onToggle,
      className: cn("p-2 rounded-lg hover:bg-black/10", className),
      "aria-label": "Toggle theme",
      title,
      ...props,
      children: dark ? /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) })
    }
  );
}
function NavbarMenu({ items, isOpen, onToggle, footer, activeHref }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onToggle,
        className: "p-2 rounded-lg hover:bg-white/20",
        "aria-label": "Menu",
        children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: isOpen ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
      }
    ),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50", children: [
      items.map((item) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: item.href,
          onClick: (e) => {
            var _a;
            if (!item.href) e.preventDefault();
            (_a = item.onClick) == null ? void 0 : _a.call(item);
          },
          className: cn(
            "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
            activeHref === item.href ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          ),
          children: [
            item.icon && /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: item.icon }) }),
            item.label
          ]
        },
        item.key
      )),
      footer && /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 dark:border-gray-700 my-1", children: footer })
    ] })
  ] });
}
export {
  LanguageToggle,
  Navbar,
  NavbarMenu,
  ThemeToggle
};
//# sourceMappingURL=index17.js.map
