import { ReactNode } from 'react';
import type { SidebarItem } from '../Sidebar';
export interface AppShellProps {
    items: SidebarItem[];
    activeKey: string;
    onSelect: (key: string) => void;
    title: ReactNode;
    subtitle?: ReactNode;
    header?: ReactNode;
    sidebarHeader?: ReactNode;
    backTo?: ReactNode;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
}
export declare function AppShell({ items, activeKey, onSelect, title, subtitle, header, sidebarHeader, backTo, children, className, contentClassName, }: AppShellProps): import("react").JSX.Element;
//# sourceMappingURL=AppShell.d.ts.map