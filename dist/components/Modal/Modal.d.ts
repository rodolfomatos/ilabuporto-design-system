interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
    /** id of the element describing the dialog, for aria-describedby. */
    describedById?: string;
    /**
     * id of the element to focus on open. Defaults to the first focusable descendant.
     * A confirmation dialog must focus its safe action, not its close button.
     */
    initialFocusId?: string;
}
export declare function Modal({ isOpen, onClose, title, children, className, describedById, initialFocusId, }: ModalProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=Modal.d.ts.map