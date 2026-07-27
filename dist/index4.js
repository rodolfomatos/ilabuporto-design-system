import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "./index19.js";
function Brand({ name, hideSeparator = false, footer = false, className, href }) {
  const img = /* @__PURE__ */ jsx(
    "img",
    {
      alt: "UPdigital",
      src: "/assets/images/logo_updigital_h_black.png",
      className: cn(
        "w-auto brightness-0 invert",
        footer ? "h-8" : "h-5 sm:h-7"
      )
    }
  );
  const inner = footer ? /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col", className), children: [
    img,
    name && /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-white/70 dark:text-gray-400 mt-4", children: name })
  ] }) : /* @__PURE__ */ jsxs("div", { className: cn("flex items-center min-w-0", className), children: [
    href ? /* @__PURE__ */ jsx("a", { href, className: "flex items-center min-w-0", children: img }) : img,
    !hideSeparator && name && /* @__PURE__ */ jsx("span", { className: "mx-2 text-white/50", children: "|" }),
    name && /* @__PURE__ */ jsx("span", { className: "text-base sm:text-lg font-semibold truncate", children: name })
  ] });
  return inner;
}
export {
  Brand
};
//# sourceMappingURL=index4.js.map
