import { jsxs, jsx } from "react/jsx-runtime";
import { Modal } from "./index9.js";
import { Button } from "./index2.js";
import { useId } from "react";
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
  const messageId = useId();
  const cancelId = useId();
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      isOpen,
      onClose: onCancel,
      title,
      describedById: messageId,
      initialFocusId: cancelId,
      children: [
        /* @__PURE__ */ jsx("p", { id: messageId, className: "text-gray-600 dark:text-gray-400 mb-4", children: message }),
        children,
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-6", children: [
          /* @__PURE__ */ jsx(Button, { id: cancelId, variant: "secondary", onClick: onCancel, children: cancelLabel }),
          /* @__PURE__ */ jsx(
            Button,
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
export {
  ConfirmDialog
};
//# sourceMappingURL=index7.js.map
