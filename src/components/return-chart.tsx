"use client"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ChevronDown, TrendingUp, Activity, Zap } from "lucide-react"
import { useState } from "react"

const data = [
  { date: "2020/1/1", blue: 1.0, orange: null, gray: null, timestamp: "Jan 2020" },
  { date: "2020/4/1", blue: 1.05, orange: null, gray: null, timestamp: "Apr 2020" },
  { date: "2020/7/1", blue: 1.1, orange: null, gray: null, timestamp: "Jul 2020" },
  { date: "2020/10/1", blue: 1.15, orange: null, gray: null, timestamp: "Oct 2020" },
  { date: "2021/1/1", blue: 1.2, orange: null, gray: null, timestamp: "Jan 2021" },
  { date: "2021/4/1", blue: 1.25, orange: 1.2, gray: 2.8, timestamp: "Apr 2021" },
  { date: "2021/7/1", blue: 1.3, orange: 1.35, gray: 3.2, timestamp: "Jul 2021" },
  { date: "2021/10/1", blue: 1.35, orange: 1.45, gray: 3.5, timestamp: "Oct 2021" },
  { date: "2022/1/1", blue: 1.4, orange: 1.55, gray: 3.8, timestamp: "Jan 2022" },
  { date: "2022/4/1", blue: 1.45, orange: 1.65, gray: 4.2, timestamp: "Apr 2022" },
  { date: "2022/7/1", blue: 1.5, orange: 1.75, gray: 4.5, timestamp: "Jul 2022" },
  { date: "2022/10/1", blue: 1.55, orange: 1.8, gray: 4.7, timestamp: "Oct 2022" },
  { date: "2023/1/1", blue: 1.6, orange: 1.85, gray: 4.8, timestamp: "Jan 2023" },
  { date: "2023/3/1", blue: 1.65, orange: 1.75, gray: 4.0, timestamp: "Mar 2023" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 shadow-2xl">
        <p className="text-cyan-400 font-semibold mb-2">{payload[0]?.payload?.timestamp}</p>
        {payload.map(
          (entry: any, index: number) =>
            entry.value !== null && (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {entry.name}: <span className="font-bold">{entry.value?.toFixed(3)}</span>
              </p>
            ),
        )}
      </div>
    )
  }
  return null
}

const CustomLegend = ({ payload }: any) => {
  const legendItems = [
    { name: "Primary Asset", color: "#00d4ff", icon: TrendingUp },
    { name: "Secondary Asset", color: "#ff6b35", icon: Activity },
    { name: "Volatility Index", color: "#a855f7", icon: Zap },
  ]

  return (
    <div className="flex justify-center gap-6 mb-6">
      {legendItems.map((item, index) => {
        const Icon = item.icon
        return (
          <div key={index} className="flex items-center gap-2 text-sm">
            <Icon className="w-4 h-4" style={{ color: item.color }} />
            <span className="text-gray-300">{item.name}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function ReturnChart() {
  const [hoveredPoint, setHoveredPoint] = useState<any>(null)
  const [selectedMetric, setSelectedMetric] = useState("all")

  return (
    <div className="min-h-screen rounded-3xl bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r text-white bg-clip-text text-transparent mb-2">
            DeFi Analytics Dashboard
          </h1>
          <p className="text-gray-700">Real-time market intelligence & volatility tracking</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-gray-400 text-sm">Primary Asset</p>
                <p className="text-2xl font-bold text-cyan-400">1.65</p>
                <p className="text-green-400 text-sm">+65% YTD</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-orange-500/30 rounded-xl p-4 hover:border-orange-400/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-gray-400 text-sm">Secondary Asset</p>
                <p className="text-2xl font-bold text-orange-400">1.75</p>
                <p className="text-red-400 text-sm">-5.4% 30D</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 hover:border-purple-400/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Volatility Index</p>
                <p className="text-2xl font-bold text-purple-400">4.0</p>
                <p className="text-yellow-400 text-sm">High Risk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
          <CustomLegend payload={[]} />

          <div className="h-96 relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 60, left: 60, bottom: 60 }}
                onMouseMove={(e) => setHoveredPoint(e?.activePayload?.[0]?.payload)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <defs>
                  <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="orangeGlow" x1="0" y1="0" x2="0" y2="1">
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
                  interval={2}
                />
                <YAxis
                  yAxisId="left"
                  domain={[0.8, 2.0]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  tickFormatter={(value) => value.toFixed(2)}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[1.2, 5.2]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  tickFormatter={(value) => value.toFixed(1)}
                />

                <Tooltip content={<CustomTooltip />} />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="blue"
                  stroke="#00d4ff"
                  strokeWidth={3}
                  dot={{ fill: "#00d4ff", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#00d4ff", stroke: "#ffffff", strokeWidth: 2 }}
                  connectNulls={false}
                  filter="url(#glow)"
                  name="Primary Asset"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="orange"
                  stroke="#ff6b35"
                  strokeWidth={3}
                  dot={{ fill: "#ff6b35", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#ff6b35", stroke: "#ffffff", strokeWidth: 2 }}
                  connectNulls={false}
                  filter="url(#glow)"
                  name="Secondary Asset"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="gray"
                  stroke="#a855f7"
                  strokeWidth={2}
                  dot={{ fill: "#a855f7", strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, fill: "#a855f7", stroke: "#ffffff", strokeWidth: 2 }}
                  connectNulls={false}
                  strokeDasharray="5 5"
                  name="Volatility Index"
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Floating Action Button */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              {/* <button className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 group">
                <ChevronDown className="w-5 h-5 text-white group-hover:animate-bounce" />
              </button> */}
            </div>
          </div>
        </div>

        {/* Interactive Controls */}
        {/* <div className="mt-6 flex justify-center gap-4">
          <button className="px-6 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-300 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300">
            1D
          </button>
          <button className="px-6 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-300 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300">
            7D
          </button>
          <button className="px-6 py-2 bg-cyan-500/20 border border-cyan-500 rounded-lg text-cyan-400">1M</button>
          <button className="px-6 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-300 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300">
            1Y
          </button>
          <button className="px-6 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-300 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300">
            ALL
          </button>
        </div> */}
      </div>
    </div>
  )
}
