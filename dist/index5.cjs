"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const Modal = require("./index7.cjs");
const Button = require("./index2.cjs");
const buttonVariantMap = {
  danger: "destructive",
  warning: "primary",
  info: "primary"
};
function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger",
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(Modal.Modal, { isOpen, onClose: onCancel, title, children: [
    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-gray-600 dark:text-gray-400 mb-4", children: message }),
    children,
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-6", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Button.Button, { variant: "secondary", onClick: onCancel, children: cancelLabel }),
      /* @__PURE__ */ jsxRuntime.jsx(
        Button.Button,
        {
          variant: buttonVariantMap[variant],
          onClick: () => {
            onConfirm();
            onCancel();
          },
          children: confirmLabel
        }
      )
    ] })
  ] });
}
exports.ConfirmDialog = ConfirmDialog;
//# sourceMappingURL=index5.cjs.map
