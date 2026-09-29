"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const cn = require("./index30.cjs");
function Pagination({ page, total, limit, onPageChange }) {
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 1;
  if (!Number.isFinite(totalPages) || totalPages <= 1 || total <= 0) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "nav",
    {
      "aria-label": "Pagination",
      className: "flex items-center justify-between",
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("p", { role: "status", className: "text-sm text-gray-500 dark:text-gray-400", children: [
          "Page ",
          page,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onPageChange(page - 1),
              disabled: page <= 1,
              "aria-label": `Go to page ${page - 1}`,
              className: cn.cn(
                "px-3 py-1 text-sm border rounded-lg transition-colors",
                "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100",
                "disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
              ),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", children: "←" }),
                " Previous"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onPageChange(page + 1),
              disabled: page >= totalPages,
              "aria-label": `Go to page ${page + 1}`,
              className: cn.cn(
                "px-3 py-1 text-sm border rounded-lg transition-colors",
                "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100",
                "disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
              ),
              children: [
                "Next ",
                /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", children: "→" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
exports.Pagination = Pagination;
//# sourceMappingURL=index10.cjs.map
