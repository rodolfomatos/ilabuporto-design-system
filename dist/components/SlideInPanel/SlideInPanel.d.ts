import { ReactNode } from 'react';
interface SlideInPanelProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
}
export declare function SlideInPanel({ isOpen, onClose, title, children, className }: SlideInPanelProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=SlideInPanel.d.ts.map