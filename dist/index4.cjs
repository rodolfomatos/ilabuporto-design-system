"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const cn = require("./index19.cjs");
function Brand({ name, hideSeparator = false, footer = false, className, href }) {
  const img = /* @__PURE__ */ jsxRuntime.jsx(
    "img",
    {
      alt: "UPdigital",
      src: "/assets/images/logo_updigital_h_black.png",
      className: cn.cn(
        "w-auto brightness-0 invert",
        footer ? "h-8" : "h-5 sm:h-7"
      )
    }
  );
  const inner = footer ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn.cn("flex flex-col", className), children: [
    img,
    name && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm leading-relaxed text-white/70 dark:text-gray-400 mt-4", children: name })
  ] }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn.cn("flex items-center min-w-0", className), children: [
    href ? /* @__PURE__ */ jsxRuntime.jsx("a", { href, className: "flex items-center min-w-0", children: img }) : img,
    !hideSeparator && name && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mx-2 text-white/50", children: "|" }),
    name && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-base sm:text-lg font-semibold truncate", children: name })
  ] });
  return inner;
}
exports.Brand = Brand;
//# sourceMappingURL=index4.cjs.map
