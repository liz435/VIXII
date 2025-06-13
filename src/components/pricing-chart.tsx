"use client"

import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, LineChartIcon } from "lucide-react"

// Define the type for our treasury data
type TreasuryDataRecord = Record<string, number>

// Historical US Treasury 10-Year Yield data (monthly averages)
// Source: U.S. Department of the Treasury
const treasuryHistoricalData: TreasuryDataRecord = {
  // 2020
  "2020-01": 1.76,
  "2020-02": 1.5,
  "2020-03": 0.87,
  "2020-04": 0.66,
  "2020-05": 0.67,
  "2020-06": 0.73,
  "2020-07": 0.62,
  "2020-08": 0.65,
  "2020-09": 0.68,
  "2020-10": 0.79,
  "2020-11": 0.87,
  "2020-12": 0.93,
  // 2021
  "2021-01": 1.08,
  "2021-02": 1.26,
  "2021-03": 1.61,
  "2021-04": 1.64,
  "2021-05": 1.62,
  "2021-06": 1.52,
  "2021-07": 1.32,
  "2021-08": 1.28,
  "2021-09": 1.37,
  "2021-10": 1.58,
  "2021-11": 1.56,
  "2021-12": 1.47,
  // 2022
  "2022-01": 1.76,
  "2022-02": 1.93,
  "2022-03": 2.13,
  "2022-04": 2.75,
  "2022-05": 2.9,
  "2022-06": 3.14,
  "2022-07": 2.9,
  "2022-08": 2.83,
  "2022-09": 3.52,
  "2022-10": 3.98,
  "2022-11": 3.89,
  "2022-12": 3.62,
  // 2023
  "2023-01": 3.53,
  "2023-02": 3.75,
  "2023-03": 3.67,
  "2023-04": 3.56,
  "2023-05": 3.64,
  "2023-06": 3.84,
  "2023-07": 3.96,
  "2023-08": 4.21,
  "2023-09": 4.35,
  "2023-10": 4.8,
  "2023-11": 4.53,
  "2023-12": 4.02,
  // 2024
  "2024-01": 4.04,
  "2024-02": 4.24,
  "2024-03": 4.33,
  "2024-04": 4.58,
  "2024-05": 4.42,
}

// Define the data point type
interface DataPoint {
  date: string
  timestamp: string
  investment: number
  treasury: number
  treasuryYield: number
}

// Interface for component props
interface ReturnChartProps {
  monthlyReturnRate?: number
  title?: string
  description?: string
  startDate?: Date
  months?: number
  className?: string
}

// Define the tooltip payload item type
interface TooltipPayloadItem {
  name: string
  value: number
  color: string
  dataKey: string
  payload: DataPoint
}

// Custom tooltip props
interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
  monthlyReturnRate: number
  annualEquivalent: string
}

export default function ReturnChart({
  monthlyReturnRate = 1.8, // Default to 1.8%
  title = "Return Comparison: Monthly Investment vs US Treasury",
  description = "Comparing compound growth of monthly returns against historical US Treasury yields",
  startDate = new Date(2023, 5, 1), // Default to June 2023
  months = 12, // Default to 12 months
  className = "",
}: ReturnChartProps) {
  // Calculate annual equivalent of monthly return
  const annualEquivalent = ((Math.pow(1 + monthlyReturnRate / 100, 12) - 1) * 100).toFixed(2)

  // Generate comparison data based on props
  const chartData = useMemo(() => {
    const data: DataPoint[] = []
    const monthlyReturn = monthlyReturnRate / 100 // Convert percentage to decimal

    let investmentValue = 1.0
    let treasuryValue = 1.0

    // Generate data for specified months
    for (let i = 0; i < months; i++) {
      const currentDate = new Date(startDate)
      currentDate.setMonth(startDate.getMonth() + i)

      const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`

      // Get historical treasury yield for this month or use latest available
      let treasuryYield = 4.5 // Default value

      if (monthKey in treasuryHistoricalData) {
        treasuryYield = treasuryHistoricalData[monthKey]
      } else {
        // If no data for this month, use the latest available data
        const availableMonths = Object.keys(treasuryHistoricalData).sort()
        const latestMonth = availableMonths[availableMonths.length - 1]
        treasuryYield = treasuryHistoricalData[latestMonth] || 4.5
      }

      // Convert annual yield to monthly
      const treasuryMonthlyYield = treasuryYield / 100 / 12

      // Compound the values
      investmentValue *= 1 + monthlyReturn
      treasuryValue *= 1 + treasuryMonthlyYield

      data.push({
        date: currentDate.toISOString().split("T")[0],
        timestamp: new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(currentDate),
        investment: Number(investmentValue.toFixed(4)),
        treasury: Number(treasuryValue.toFixed(4)),
        treasuryYield: treasuryYield,
      })
    }

    return data
  }, [monthlyReturnRate, startDate, months])

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label, monthlyReturnRate, annualEquivalent }: CustomTooltipProps) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 shadow-2xl">
          <p className="text-cyan-400 font-semibold mb-2">{payload[0]?.payload?.timestamp}</p>
          {payload.map(
            (entry, index) =>
              entry.value !== null && (
                <p key={index} className="text-sm" style={{ color: entry.color }}>
                  {entry.name === "investment"
                    ? `${monthlyReturnRate}% Monthly (${annualEquivalent}% Annual)`
                    : `US Treasury (${entry.payload.treasuryYield?.toFixed(2)}%)`}
                  :<span className="font-bold ml-2">{entry.value.toFixed(3)}x</span>
                </p>
              ),
          )}
        </div>
      )
    }
    return null
  }

  return (

      <CardContent>
        <div className="bg-white-800/60 backdrop-blur-sm border  rounded-2xl p-6 shadow-2xl">
          <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-black-300">{monthlyReturnRate}% Monthly Return</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <LineChartIcon className="w-4 h-4 text-amber-400" />
              <span className="text-black-300">US Treasury 10-Year Yield</span>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                <defs>
                  <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="treasuryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff6b35" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#ff6b35" stopOpacity={0} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return new Intl.DateTimeFormat("en-US", {
                      month: "short",
                    }).format(date)
                  }}
                />

                <YAxis
                  domain={["dataMin - 0.05", "dataMax + 0.05"]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  tickFormatter={(value) => value.toFixed(2) + "x"}
                />

                <Tooltip
                  content={<CustomTooltip monthlyReturnRate={monthlyReturnRate} annualEquivalent={annualEquivalent} />}
                />

                <Line
                  type="monotone"
                  dataKey="investment"
                  stroke="#00d4ff"
                  strokeWidth={3}
                  dot={{ fill: "#00d4ff", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#00d4ff", stroke: "#ffffff", strokeWidth: 2 }}
                  filter="url(#glow)"
                  name="investment"
                />

                <Line
                  type="monotone"
                  dataKey="treasury"
                  stroke="#ff6b35"
                  strokeWidth={3}
                  dot={{ fill: "#ff6b35", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#ff6b35", stroke: "#ffffff", strokeWidth: 2 }}
                  filter="url(#glow)"
                  name="treasury"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
  )
}
