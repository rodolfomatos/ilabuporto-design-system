"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const cn = require("./index19.cjs");
function Pagination({ page, total, limit, onPageChange }) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
      "Page ",
      page,
      " of ",
      totalPages
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          onClick: () => onPageChange(page - 1),
          disabled: page <= 1,
          className: cn.cn(
            "px-3 py-1 text-sm border rounded-lg transition-colors",
            "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100",
            "disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
          ),
          children: "← Prev"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          onClick: () => onPageChange(page + 1),
          disabled: page >= totalPages,
          className: cn.cn(
            "px-3 py-1 text-sm border rounded-lg transition-colors",
            "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100",
            "disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
          ),
          children: "Next →"
        }
      )
    ] })
  ] });
}
exports.Pagination = Pagination;
//# sourceMappingURL=index9.cjs.map
