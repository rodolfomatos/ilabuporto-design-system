export interface ToolStatusStat {
    tool_id: string;
    tool_name?: string;
    success: number;
    error: number;
}
export interface SuccessErrorChartProps {
    data: ToolStatusStat[];
    labelOf?: (toolId: string) => string;
    successColor?: string;
    errorColor?: string;
    height?: number;
    dark?: boolean;
}
export declare function SuccessErrorChart({ data, labelOf, successColor, errorColor, height, dark: darkOverride, }: SuccessErrorChartProps): import("react").JSX.Element;
//# sourceMappingURL=SuccessErrorChart.d.ts.map