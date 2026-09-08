import { ReactNode } from 'react';
export interface StatCardProps {
    label: ReactNode;
    value: ReactNode;
    variant?: 'default' | 'success' | 'error' | 'warning';
    className?: string;
}
export declare function StatCard({ label, value, variant, className }: StatCardProps): import("react").JSX.Element;
//# sourceMappingURL=StatCard.d.ts.map