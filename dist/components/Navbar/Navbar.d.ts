import { ReactNode, ButtonHTMLAttributes } from 'react';
export interface NavbarLink {
    key: string;
    label: ReactNode;
    href?: string;
    icon?: string;
    onClick?: () => void;
}
export interface NavbarProps {
    title?: ReactNode;
    logo?: ReactNode;
    backgroundColor?: string;
    children?: ReactNode;
    className?: string;
}
export declare function Navbar({ title, logo, backgroundColor, children, className, }: NavbarProps): import("react").JSX.Element;
export interface LanguageToggleProps {
    current: string;
    options: {
        code: string;
        label: string;
    }[];
    onChange: (code: string) => void;
}
export declare function LanguageToggle({ current, options, onChange }: LanguageToggleProps): import("react").JSX.Element;
export interface ThemeToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    dark: boolean;
    onToggle: () => void;
    title?: string;
}
export declare function ThemeToggle({ dark, onToggle, title, className, ...props }: ThemeToggleProps): import("react").JSX.Element;
export interface NavbarMenuProps {
    items: NavbarLink[];
    isOpen: boolean;
    onToggle: () => void;
    footer?: ReactNode;
    activeHref?: string;
}
export declare function NavbarMenu({ items, isOpen, onToggle, footer, activeHref }: NavbarMenuProps): import("react").JSX.Element;
//# sourceMappingURL=Navbar.d.ts.map