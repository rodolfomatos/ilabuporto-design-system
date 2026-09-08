import { ReactNode } from 'react';
export interface FooterLink {
    label: ReactNode;
    href: string;
    onClick?: () => void;
}
export interface FooterColumn {
    key: string;
    title?: ReactNode;
    links?: FooterLink[];
    content?: ReactNode;
}
export interface FooterProps {
    logo?: ReactNode;
    columns?: FooterColumn[];
    copyright?: ReactNode;
    className?: string;
}
export declare function Footer({ logo, columns, copyright, className }: FooterProps): import("react").JSX.Element;
//# sourceMappingURL=Footer.d.ts.map