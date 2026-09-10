export const chartPalette = (dark: boolean) => ({
  axis: dark ? '#9CA3AF' : '#6B7280',
  grid: dark ? '#374151' : '#E5E7EB',
  cursor: dark ? '#4B5563' : '#D1D5DB',
  tooltip: {
    background: dark ? '#171717' : '#ffffff',
    border: dark ? '#374151' : '#E5E7EB',
    borderRadius: 8,
    fontSize: 12,
  },
  line: dark ? '#60CFFF' : '#009FDF',
  success: dark ? '#34D399' : '#10B981',
  error: dark ? '#F87171' : '#EF4444',
})

export const fmtMonthDay = (s: string): string => {
  const m = s.match(/(\d{4})-(\d{2})-(\d{2})/)
  return m ? `${m[2]}-${m[3]}` : s.slice(5, 10) || s
}