import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { cn } from "./index18.js";
function Modal({ isOpen, onClose, title, children, className }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (!visible) return null;
  return /* @__PURE__ */ jsx("div", { className: cn("fixed inset-0 z-50 overflow-y-auto", !isOpen && "opacity-0"), children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-full items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 transition-opacity", onClick: onClose }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "relative w-full max-w-lg transform rounded-lg bg-white dark:bg-gray-900 p-6 shadow-xl transition-all",
          className
        ),
        children: [
          title && /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2", children: title }),
          children
        ]
      }
    )
  ] }) });
}
export {
  Modal
};
//# sourceMappingURL=index7.js.map
