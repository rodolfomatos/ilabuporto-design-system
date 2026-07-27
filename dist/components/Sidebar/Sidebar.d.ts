import { ReactNode } from 'react';
interface SidebarItem {
    key: string;
    label: string;
    icon?: string;
    renderIcon?: ReactNode;
}
interface SidebarProps {
    items: SidebarItem[];
    activeKey: string;
    onSelect: (key: string) => void;
    header?: ReactNode;
    footer?: ReactNode;
    className?: string;
    width?: string;
    isOpen?: boolean;
    onClose?: () => void;
}
export declare function Sidebar({ items, activeKey, onSelect, header, footer, className, width, isOpen, onClose }: SidebarProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Sidebar.d.ts.map