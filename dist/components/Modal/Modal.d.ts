interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}
export declare function Modal({ isOpen, onClose, title, children, className }: ModalProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=Modal.d.ts.map