import { ReactNode } from 'react';
interface SidebarItem {
    key: string;
    label: string;
    icon?: string;
}
interface SidebarProps {
    items: SidebarItem[];
    activeKey: string;
    onSelect: (key: string) => void;
    header?: ReactNode;
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}
export declare function Sidebar({ items, activeKey, onSelect, header, className, isOpen, onClose }: SidebarProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Sidebar.d.ts.map