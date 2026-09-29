"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const cn = require("./index30.cjs");
function Table({
  columns,
  data,
  onRowClick,
  emptyMessage = "No results",
  sortField,
  sortOrder,
  onSort,
  caption
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden", children: /* @__PURE__ */ jsxRuntime.jsxs("table", { className: "w-full", "aria-label": caption, children: [
    /* @__PURE__ */ jsxRuntime.jsx("caption", { className: "sr-only", children: caption }),
    /* @__PURE__ */ jsxRuntime.jsx("thead", { className: "bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntime.jsx("tr", { children: columns.map((col) => {
      const isSorted = col.sortable && sortField === col.key;
      return /* @__PURE__ */ jsxRuntime.jsx(
        "th",
        {
          scope: "col",
          "aria-sort": col.sortable ? isSorted ? sortOrder === "DESC" ? "descending" : "ascending" : "none" : void 0,
          className: cn.cn(
            "text-left px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
            col.className
          ),
          children: col.sortable ? (
            // A <th onClick> is not focusable and has no key handler, so sorting
            // was unreachable by keyboard: WCAG 2.1.1 (Level A). A real button
            // is focusable, activatable, and announced as a control.
            /* @__PURE__ */ jsxRuntime.jsxs(
              "button",
              {
                type: "button",
                onClick: () => onSort == null ? void 0 : onSort(col.key),
                className: "inline-flex items-center gap-1 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                children: [
                  col.header,
                  isSorted && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", className: "ml-1", children: sortOrder === "ASC" ? "↑" : "↓" })
                ]
              }
            )
          ) : col.header
        },
        col.key
      );
    }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx("tbody", { className: "divide-y divide-gray-200 dark:border-gray-800", children: data.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("tr", { children: /* @__PURE__ */ jsxRuntime.jsx(
      "td",
      {
        colSpan: columns.length,
        className: "px-4 py-8 text-center text-gray-500 dark:text-gray-400",
        children: emptyMessage
      }
    ) }) : data.map((item, idx) => {
      const row = item;
      const firstText = columns.length > 0 ? String(row[columns[0].key] ?? "-") : "";
      return /* @__PURE__ */ jsxRuntime.jsx(
        "tr",
        {
          className: cn.cn(
            "hover:bg-gray-50 dark:hover:bg-gray-800/50",
            onRowClick && "cursor-pointer relative"
          ),
          children: columns.map((col, colIdx) => /* @__PURE__ */ jsxRuntime.jsxs("td", { className: cn.cn("px-4 py-3 text-sm", col.className), children: [
            col.render ? col.render(item) : /* @__PURE__ */ jsxRuntime.jsx("span", { children: String(row[col.key] ?? "-") }),
            onRowClick && colIdx === 0 && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: () => onRowClick(item),
                "aria-label": col.rowActionLabel ?? `View details for ${firstText}`,
                className: "absolute inset-0 h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                style: { background: "transparent" }
              }
            )
          ] }, col.key))
        },
        row.id || idx
      );
    }) })
  ] }) });
}
exports.Table = Table;
//# sourceMappingURL=index14.cjs.map
