import { jsxs, jsx } from "react/jsx-runtime";
import { Modal } from "./index7.js";
import { Button } from "./index2.js";
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
  return /* @__PURE__ */ jsxs(Modal, { isOpen, onClose: onCancel, title, children: [
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 mb-4", children: message }),
    children,
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-6", children: [
      /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: onCancel, children: cancelLabel }),
      /* @__PURE__ */ jsx(
        Button,
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
export {
  ConfirmDialog
};
//# sourceMappingURL=index5.js.map
