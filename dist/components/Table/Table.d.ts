import { ReactNode } from 'react';
interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => ReactNode;
    className?: string;
    sortable?: boolean;
}
interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (item: T) => void;
    emptyMessage?: string;
    sortField?: string;
    sortOrder?: 'ASC' | 'DESC';
    onSort?: (field: string) => void;
}
export declare function Table<T>({ columns, data, onRowClick, emptyMessage, sortField, sortOrder, onSort, }: TableProps<T>): import("react").JSX.Element;
export {};
//# sourceMappingURL=Table.d.ts.map