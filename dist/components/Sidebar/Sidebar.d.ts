import { ReactNode } from 'react';
export interface SidebarItem {
    key: string;
    label: string;
    icon?: string;
    renderIcon?: ReactNode;
    badge?: number;
}
export interface SidebarProps {
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
//# sourceMappingURL=Sidebar.d.ts.map