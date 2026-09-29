import { ReactNode } from 'react';
interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => ReactNode;
    className?: string;
    sortable?: boolean;
    /** Accessible name for the row action button. Defaults to the row's first cell text. */
    rowActionLabel?: string;
}
interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (item: T) => void;
    emptyMessage?: string;
    sortField?: string;
    sortOrder?: 'ASC' | 'DESC';
    onSort?: (field: string) => void;
    /** Accessible name for the table. Evidence without a name is ambiguous. */
    caption?: string;
}
export declare function Table<T>({ columns, data, onRowClick, emptyMessage, sortField, sortOrder, onSort, caption, }: TableProps<T>): import("react").JSX.Element;
export {};
//# sourceMappingURL=Table.d.ts.map