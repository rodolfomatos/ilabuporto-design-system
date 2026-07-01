interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: 'danger' | 'warning' | 'info';
    children?: React.ReactNode;
}
export declare function ConfirmDialog({ isOpen, title, message, confirmLabel, cancelLabel, onConfirm, onCancel, variant, children, }: ConfirmDialogProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ConfirmDialog.d.ts.map