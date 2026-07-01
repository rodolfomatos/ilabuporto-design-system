"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const cn = require("./index18.cjs");
function Table({
  columns,
  data,
  onRowClick,
  emptyMessage = "No results",
  sortField,
  sortOrder,
  onSort
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden", children: /* @__PURE__ */ jsxRuntime.jsxs("table", { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntime.jsx("thead", { className: "bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntime.jsx("tr", { children: columns.map((col) => /* @__PURE__ */ jsxRuntime.jsxs(
      "th",
      {
        scope: "col",
        className: cn.cn(
          "text-left px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
          col.sortable && "cursor-pointer hover:text-gray-700 dark:hover:text-gray-200",
          col.className
        ),
        onClick: () => col.sortable && (onSort == null ? void 0 : onSort(col.key)),
        children: [
          col.header,
          col.sortable && sortField === col.key && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ml-1", children: sortOrder === "ASC" ? "↑" : "↓" })
        ]
      },
      col.key
    )) }) }),
    /* @__PURE__ */ jsxRuntime.jsx("tbody", { className: "divide-y divide-gray-200 dark:divide-gray-800", children: data.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("tr", { children: /* @__PURE__ */ jsxRuntime.jsx("td", { colSpan: columns.length, className: "px-4 py-8 text-center text-gray-500 dark:text-gray-400", children: emptyMessage }) }) : data.map((item, idx) => /* @__PURE__ */ jsxRuntime.jsx(
      "tr",
      {
        className: cn.cn("hover:bg-gray-50 dark:hover:bg-gray-800/50", onRowClick && "cursor-pointer"),
        onClick: () => onRowClick == null ? void 0 : onRowClick(item),
        children: columns.map((col) => /* @__PURE__ */ jsxRuntime.jsx("td", { className: cn.cn("px-4 py-3 text-sm", col.className), children: col.render ? col.render(item) : String(item[col.key] ?? "-") }, col.key))
      },
      item.id || idx
    )) })
  ] }) });
}
exports.Table = Table;
//# sourceMappingURL=index12.cjs.map
