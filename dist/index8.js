import { jsxs, jsx } from "react/jsx-runtime";
import { cn } from "./index18.js";
function Pagination({ page, total, limit, onPageChange }) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
      "Page ",
      page,
      " of ",
      totalPages
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onPageChange(page - 1),
          disabled: page <= 1,
          className: cn(
            "px-3 py-1 text-sm border rounded-lg transition-colors",
            "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100",
            "disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
          ),
          children: "← Prev"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onPageChange(page + 1),
          disabled: page >= totalPages,
          className: cn(
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
export {
  Pagination
};
//# sourceMappingURL=index8.js.map
