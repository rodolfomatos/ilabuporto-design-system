import { HTMLAttributes } from 'react';
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'success' | 'error' | 'warning';
}
export declare function Card({ variant, className, children, ...props }: CardProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Card.d.ts.map