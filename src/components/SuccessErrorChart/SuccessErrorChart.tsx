import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useTheme } from '../ThemeProvider'
import { chartPalette } from '../charts/shared'

export interface ToolStatusStat {
  tool_id: string
  tool_name?: string
  success: number
  error: number
}

export interface SuccessErrorChartProps {
  data: ToolStatusStat[]
  labelOf?: (toolId: string) => string
  successColor?: string
  errorColor?: string
  height?: number
  dark?: boolean
}

export function SuccessErrorChart({
  data,
  labelOf,
  successColor,
  errorColor,
  height = 320,
  dark: darkOverride,
}: SuccessErrorChartProps) {
  const { dark: darkCtx } = useTheme()
  const dark = darkOverride ?? darkCtx
  const p = chartPalette(dark)

  const label = (id: unknown) =>
    labelOf
      ? labelOf(String(id))
      : data.find((d) => d.tool_id === id)?.tool_name ?? String(id)

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 16, bottom: 0, left: 0 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke={p.grid} horizontal={false} />
          <XAxis
            type="number"
            stroke={p.axis}
            tick={{ fill: p.axis, fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: p.grid }}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="tool_id"
            width={120}
            tickFormatter={label}
            tick={{ fill: p.axis, fontSize: 12 }}
            stroke={p.axis}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={p.tooltip}
            labelStyle={{ color: p.axis }}
            labelFormatter={label}
            cursor={{ fill: p.cursor, opacity: 0.1 }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: p.axis, paddingTop: 8 }} />
          <Bar
            dataKey="success"
            stackId="a"
            fill={successColor ?? p.success}
            radius={[0, 4, 4, 0]}
            name="Success"
            barSize={18}
          />
          <Bar
            dataKey="error"
            stackId="a"
            fill={errorColor ?? p.error}
            radius={[0, 4, 4, 0]}
            name="Error"
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}