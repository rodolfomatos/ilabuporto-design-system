import { jsxs, jsx } from "react/jsx-runtime";
import { createContext, useState, useRef, useCallback, useEffect, useMemo, useContext } from "react";
import { cn } from "./index31.js";
const variantStyles = {
  info: "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100",
  success: "bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-100",
  warning: "bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-100",
  error: "bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-100"
};
const barStyles = {
  info: "bg-blue-500",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500"
};
function Toast({
  variant = "info",
  title,
  children,
  duration = 5e3,
  onDismiss,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: variant === "error" ? "alert" : "status",
      className: cn(
        "pointer-events-auto flex w-full items-start gap-3 overflow-hidden rounded-lg p-4 shadow-lg ring-1 ring-black/5 dark:ring-white/10",
        variantStyles[variant],
        className
      ),
      children: [
        /* @__PURE__ */ jsx("span", { className: cn("mt-1 h-2 w-2 flex-shrink-0 rounded-full", barStyles[variant]), "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 text-sm", children: [
          title && /* @__PURE__ */ jsx("p", { className: "font-semibold", children: title }),
          children && /* @__PURE__ */ jsx("div", { className: cn(title && "mt-1", "break-words"), children })
        ] }),
        onDismiss && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onDismiss,
            "aria-label": "Dismiss notification",
            className: "flex-shrink-0 rounded p-1 opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current",
            children: /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M1 1l12 12M13 1L1 13", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) })
          }
        )
      ]
    }
  );
}
const ToastContext = createContext(void 0);
const positionStyles = {
  "top-right": "top-4 right-4 items-end",
  "top-left": "top-4 left-4 items-start",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start"
};
function ToastProvider({
  children,
  position = "top-right",
  max = 4,
  defaultDuration = 5e3
}) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);
  const timers = useRef(/* @__PURE__ */ new Map());
  const dismiss = useCallback((id) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);
  const push = useCallback(
    (toast) => {
      const id = nextId.current++;
      setToasts((current) => [...current, { ...toast, id }].slice(-max));
      if (toast.duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), toast.duration)
        );
      }
      return id;
    },
    [dismiss, max]
  );
  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);
  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss]);
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "pointer-events-none fixed z-50 flex w-full max-w-sm flex-col gap-2",
          positionStyles[position]
        ),
        children: toasts.map((toast) => /* @__PURE__ */ jsx(
          Toast,
          {
            variant: toast.variant,
            title: toast.title,
            duration: toast.duration,
            onDismiss: () => dismiss(toast.id),
            children: toast.content
          },
          toast.id
        ))
      }
    )
  ] });
}
function useToast(defaultDuration = 5e3) {
  const ctx = useContext(ToastContext);
  const info = useCallback(
    (title, content, duration) => (ctx == null ? void 0 : ctx.push({ variant: "info", title, content, duration: duration ?? defaultDuration })) ?? -1,
    [ctx, defaultDuration]
  );
  if (!ctx) {
    return {
      toasts: [],
      push: () => -1,
      dismiss: () => {
      },
      info: () => -1,
      success: () => -1,
      warning: () => -1,
      error: () => -1
    };
  }
  return {
    toasts: ctx.toasts,
    push: ctx.push,
    dismiss: ctx.dismiss,
    info,
    success: (title, content, duration) => ctx.push({ variant: "success", title, content, duration: duration ?? defaultDuration }),
    warning: (title, content, duration) => ctx.push({ variant: "warning", title, content, duration: duration ?? defaultDuration }),
    error: (title, content, duration) => ctx.push({ variant: "error", title, content, duration: duration ?? defaultDuration })
  };
}
export {
  Toast,
  ToastProvider,
  useToast
};
//# sourceMappingURL=index27.js.map
