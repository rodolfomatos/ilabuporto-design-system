export interface LineUsagePoint {
    date: string;
    count: number;
}
export interface LineUsageChartProps {
    data: LineUsagePoint[];
    color?: string;
    height?: number;
    dark?: boolean;
}
export declare function LineUsageChart({ data, color, height, dark: darkOverride, }: LineUsageChartProps): import("react").JSX.Element;
//# sourceMappingURL=LineUsageChart.d.ts.map