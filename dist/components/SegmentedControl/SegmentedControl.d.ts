import React from 'react';
export interface SegmentedOption<T extends string | number> {
    value: T;
    label: React.ReactNode;
}
export interface SegmentedControlProps<T extends string | number> {
    options: SegmentedOption<T>[];
    value: T;
    onChange: (value: T) => void;
    className?: string;
    ariaLabel?: string;
}
export declare function SegmentedControl<T extends string | number>({ options, value, onChange, className, ariaLabel, }: SegmentedControlProps<T>): React.JSX.Element;
//# sourceMappingURL=SegmentedControl.d.ts.map