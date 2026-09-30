import { jsxs, jsx } from "react/jsx-runtime";
import { cn } from "./index30.js";
function Pagination({ page, total, limit, onPageChange }) {
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 1;
  if (!Number.isFinite(totalPages) || totalPages <= 1 || total <= 0) return null;
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      "aria-label": "Pagination",
      className: "flex items-center justify-between",
      children: [
        /* @__PURE__ */ jsxs("p", { role: "status", className: "text-sm text-gray-500 dark:text-gray-400", children: [
          "Page ",
          page,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => onPageChange(page - 1),
              disabled: page <= 1,
              "aria-label": `Go to page ${page - 1}`,
              className: cn(
                "px-3 py-1 text-sm border rounded-lg transition-colors",
                "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100",
                "disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
              ),
              children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "←" }),
                " Previous"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => onPageChange(page + 1),
              disabled: page >= totalPages,
              "aria-label": `Go to page ${page + 1}`,
              className: cn(
                "px-3 py-1 text-sm border rounded-lg transition-colors",
                "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100",
                "disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
              ),
              children: [
                "Next ",
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "→" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  Pagination
};
//# sourceMappingURL=index10.js.map
