import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { cn } from "./index24.js";
import { LOGO_UP_DIGITAL } from "./index5.js";
function Footer({ logo, columns, copyright, className }) {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx(
    "footer",
    {
      className: cn(
        "bg-black dark:bg-gray-950 border-t border-white/10 dark:border-gray-800 text-white dark:text-gray-300",
        className
      ),
      children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-10 sm:py-14", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2 lg:col-span-1", children: [
          logo ?? /* @__PURE__ */ jsx("img", { src: LOGO_UP_DIGITAL, alt: "UPdigital", className: "h-8 w-auto mb-4 brightness-0 invert", width: 601, height: 115 }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-white/70 dark:text-gray-400", children: copyright ?? /* @__PURE__ */ jsxs(Fragment, { children: [
            "UPdigital — Universidade do Porto Digital © ",
            currentYear,
            "."
          ] }) })
        ] }),
        columns == null ? void 0 : columns.map((col) => /* @__PURE__ */ jsxs("div", { children: [
          col.title && /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide mb-3 text-white/80 dark:text-gray-100", children: col.title }),
          col.content,
          col.links && /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm text-white/70 dark:text-gray-400", children: col.links.map((link, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: link.href,
              onClick: (e) => {
                var _a;
                if (!link.href) e.preventDefault();
                (_a = link.onClick) == null ? void 0 : _a.call(link);
              },
              className: "hover:underline underline-offset-2",
              children: link.label
            }
          ) }, i)) })
        ] }, col.key))
      ] }) })
    }
  );
}
export {
  Footer
};
//# sourceMappingURL=index18.js.map
