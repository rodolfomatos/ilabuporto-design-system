export interface BrandProps {
    /** App name displayed next to the logo */
    name?: string;
    /** Hide the separator between logo and name */
    hideSeparator?: boolean;
    /** Use footer sizing (larger logo, block layout) */
    footer?: boolean;
    /** Additional classes for the outer element */
    className?: string;
    /** Click handler (makes the brand a link) */
    href?: string;
}
export declare function Brand({ name, hideSeparator, footer, className, href }: BrandProps): import("react").JSX.Element;
//# sourceMappingURL=Brand.d.ts.map