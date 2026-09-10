export interface TopToolStat {
    tool_id: string;
    tool_name?: string;
    count: number;
}
export interface TopToolsChartProps {
    data: TopToolStat[];
    labelOf?: (toolId: string) => string;
    color?: string;
    height?: number;
    dark?: boolean;
}
export declare function TopToolsChart({ data, labelOf, color, height, dark: darkOverride, }: TopToolsChartProps): import("react").JSX.Element;
//# sourceMappingURL=TopToolsChart.d.ts.map