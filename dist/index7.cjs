"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const Modal = require("./index9.cjs");
const Button = require("./index2.cjs");
const react = require("react");
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
  const messageId = react.useId();
  const cancelId = react.useId();
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Modal.Modal,
    {
      isOpen,
      onClose: onCancel,
      title,
      describedById: messageId,
      initialFocusId: cancelId,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("p", { id: messageId, className: "text-gray-600 dark:text-gray-400 mb-4", children: message }),
        children,
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-6", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Button.Button, { id: cancelId, variant: "secondary", onClick: onCancel, children: cancelLabel }),
          /* @__PURE__ */ jsxRuntime.jsx(
            Button.Button,
            {
              variant: buttonVariantMap[variant],
              onClick: onConfirm,
              children: confirmLabel
            }
          )
        ] })
      ]
    }
  );
}
exports.ConfirmDialog = ConfirmDialog;
//# sourceMappingURL=index7.cjs.map
