interface PaginationProps {
    page: number;
    total: number;
    limit: number;
    onPageChange: (page: number) => void;
}
export declare function Pagination({ page, total, limit, onPageChange }: PaginationProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=Pagination.d.ts.map