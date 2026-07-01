type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral';
interface BadgeProps {
    variant?: BadgeVariant;
    className?: string;
    children: React.ReactNode;
}
export declare function Badge({ variant, className, children }: BadgeProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Badge.d.ts.map