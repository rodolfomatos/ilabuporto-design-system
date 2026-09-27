import { ReactNode } from 'react';
export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export interface ToastProps {
    variant?: ToastVariant;
    title?: string;
    children?: React.ReactNode;
    /** Milliseconds before auto-dismiss. 0 disables auto-dismiss. */
    duration?: number;
    onDismiss?: () => void;
    className?: string;
}
export declare function Toast({ variant, title, children, duration, onDismiss, className, }: ToastProps): import("react").JSX.Element;
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
interface ToastEntry {
    id: number;
    variant: ToastVariant;
    title?: string;
    content?: React.ReactNode;
    duration: number;
}
export interface ToastProviderProps {
    children: ReactNode;
    position?: ToastPosition;
    /** Maximum toasts on screen at once; the oldest is dropped beyond this. */
    max?: number;
    defaultDuration?: number;
}
export declare function ToastProvider({ children, position, max, defaultDuration, }: ToastProviderProps): import("react").JSX.Element;
export interface UseToastResult {
    toasts: ToastEntry[];
    push: (toast: Omit<ToastEntry, 'id'>) => number;
    dismiss: (id: number) => void;
    info: (title?: string, content?: React.ReactNode, duration?: number) => number;
    success: (title?: string, content?: React.ReactNode, duration?: number) => number;
    warning: (title?: string, content?: React.ReactNode, duration?: number) => number;
    error: (title?: string, content?: React.ReactNode, duration?: number) => number;
}
/**
 * Returns a no-op implementation when used outside a `ToastProvider`, matching
 * `useTheme`'s graceful fallback. A toast that throws because a provider is
 * missing turns a notification into an application crash.
 */
export declare function useToast(defaultDuration?: number): UseToastResult;
export {};
//# sourceMappingURL=Toast.d.ts.map