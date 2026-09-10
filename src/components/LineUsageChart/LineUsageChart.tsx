import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useTheme } from '../ThemeProvider'
import { chartPalette, fmtMonthDay } from '../charts/shared'

export interface LineUsagePoint {
  date: string
  count: number
}

export interface LineUsageChartProps {
  data: LineUsagePoint[]
  color?: string
  height?: number
  dark?: boolean
}

export function LineUsageChart({
  data,
  color,
  height = 280,
  dark: darkOverride,
}: LineUsageChartProps) {
  const { dark: darkCtx } = useTheme()
  const dark = darkOverride ?? darkCtx
  const p = chartPalette(dark)

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={p.grid} vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={fmtMonthDay}
            stroke={p.axis}
            tick={{ fill: p.axis, fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: p.grid }}
          />
          <YAxis
            stroke={p.axis}
            tick={{ fill: p.axis, fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: p.grid }}
            allowDecimals={false}
            width={40}
          />
          <Tooltip
            contentStyle={p.tooltip}
            labelStyle={{ color: p.axis }}
            labelFormatter={(label) => fmtMonthDay(String(label))}
            cursor={{ stroke: p.cursor }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke={color ?? p.line}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}