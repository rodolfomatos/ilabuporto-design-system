"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const cn = require("./index30.cjs");
const index = require("./index5.cjs");
function Brand({ name, hideSeparator = false, footer = false, className, href }) {
  const img = /* @__PURE__ */ jsxRuntime.jsx(
    "img",
    {
      alt: "UPdigital",
      src: index.LOGO_UP_DIGITAL,
      className: cn.cn(
        "w-auto brightness-0 invert",
        footer ? "h-8 mb-4" : "h-5 sm:h-7"
      )
    }
  );
  if (footer) {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className, children: [
      img,
      name && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm leading-relaxed text-white/70 dark:text-gray-400", children: name })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn.cn("flex items-center min-w-0", className), children: [
    href ? /* @__PURE__ */ jsxRuntime.jsx("a", { href, className: "flex items-center min-w-0", children: img }) : img,
    !hideSeparator && name && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mx-2 text-white/50", children: "|" }),
    name && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-base sm:text-lg font-semibold truncate", children: name })
  ] });
}
exports.Brand = Brand;
//# sourceMappingURL=index4.cjs.map
