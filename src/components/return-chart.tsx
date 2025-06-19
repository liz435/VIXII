'use client'

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity,Zap, TrendingUp } from 'lucide-react';
import { DM_Sans, Merriweather } from 'next/font/google'

interface DataPoint {
  date: string;
  blue: number | null;
  orange: number | null;
  gray: number | null;
  timestamp: string
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

interface CustomLegendProps {
  payload: any[];
}

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})


const data:DataPoint[] = [
  // Original data (2020-2023)
  { date: "2020/1/1", blue: 1.0, orange: null, gray: null, timestamp: "Jan 2020" },
  { date: "2020/4/1", blue: 1.05, orange: null, gray: null, timestamp: "Apr 2020" },
  { date: "2020/7/1", blue: 1.1, orange: null, gray: null, timestamp: "Jul 2020" },
  { date: "2020/10/1", blue: 1.19, orange: null, gray: null, timestamp: "Oct 2020" },
  { date: "2021/1/1", blue: 1.2, orange: null, gray: null, timestamp: "Jan 2021" },
  { date: "2021/4/1", blue: 1.25, orange: 1.2, gray: null, timestamp: "Apr 2021" },
  { date: "2021/7/1", blue: 1.3, orange: 1.35, gray: null, timestamp: "Jul 2021" },
  { date: "2021/10/1", blue: 1.35, orange: 1.45, gray: null, timestamp: "Oct 2021" },
  { date: "2022/1/1", blue: 1.4, orange: 1.55, gray: null, timestamp: "Jan 2022" },
  { date: "2022/4/1", blue: 1.45, orange: 1.65, gray: null, timestamp: "Apr 2022" },
  { date: "2022/7/1", blue: 1.5, orange: 1.75, gray: null, timestamp: "Jul 2022" },
  { date: "2022/10/1", blue: 1.55, orange: 1.8, gray: null, timestamp: "Oct 2022" },
  { date: "2023/1/1", blue: 1.6, orange: 1.85, gray: null, timestamp: "Jan 2023" },
  { date: "2023/3/1", blue: 1.65, orange: 1.75, gray: null, timestamp: "Mar 2023" },
  
  // Updated readings from chart (2023-2025)
  { date: "2023/6/1", blue: 1.70, orange: 1.80, gray: null, timestamp: "Jun 2023" },
  { date: "2023/9/1", blue: 1.75, orange: 1.85, gray: null, timestamp: "Sep 2023" },
  { date: "2023/12/1", blue: 1.78, orange: 1.88, gray: null, timestamp: "Dec 2023" },
  
  { date: "2024/1/1", blue: 1.80, orange: 1.90, gray: null, timestamp: "Jan 2024" },
  { date: "2024/2/1", blue: 1.82, orange: 1.92, gray: null, timestamp: "Feb 2024" },
  { date: "2024/3/1", blue: 1.84, orange: 1.94, gray: null, timestamp: "Mar 2024" },
  { date: "2024/4/1", blue: 1.86, orange: 1.96, gray: null, timestamp: "Apr 2024" },
  { date: "2024/5/1", blue: 1.88, orange: 1.98, gray: null, timestamp: "May 2024" },
  { date: "2024/6/1", blue: 1.90, orange: 2.00, gray: null, timestamp: "Jun 2024" },
  { date: "2024/7/1", blue: 1.92, orange: 2.02, gray: null, timestamp: "Jul 2024" },
  { date: "2024/8/1", blue: 1.94, orange: 2.04, gray: null, timestamp: "Aug 2024" },
  { date: "2024/9/1", blue: 1.96, orange: 2.06, gray: null, timestamp: "Sep 2024" },
  { date: "2024/10/1", blue: 1.98, orange: 2.08, gray: null, timestamp: "Oct 2024" },
  { date: "2024/11/1", blue: 2.00, orange: 2.10, gray: null, timestamp: "Nov 2024" },
  { date: "2024/12/1", blue: 2.02, orange: 2.12, gray: null, timestamp: "Dec 2024" },
  
  { date: "2025/1/1", blue: 2.04, orange: 2.14, gray: null, timestamp: "Jan 2025" },
  { date: "2025/2/1", blue: 2.06, orange: 2.16, gray: null, timestamp: "Feb 2025" },
  { date: "2025/3/1", blue: 2.08, orange: 2.18, gray: null, timestamp: "Mar 2025" },
  { date: "2025/4/1", blue: 2.10, orange: 2.20, gray: null, timestamp: "Apr 2025" },
  { date: "2025/5/1", blue: 2.12, orange: 2.22, gray: null, timestamp: "May 2025" }
];


const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-lg">
        <p className="text-gray-800 font-medium mb-2">{`Date: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toFixed(3)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  return (
    <div className="flex justify-center gap-6 mb-6">
      <div className="flex items-center gap-2">
        <div className="w-4 h-0.5 bg-blue-500 rounded"></div>
        <span className="text-gray-700 text-sm font-medium">Primary Asset</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-0.5 bg-orange-500 rounded"></div>
        <span className="text-gray-700 text-sm font-medium">Secondary Asset</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-0.5 bg-purple-500 rounded border-dashed border border-purple-400"></div>
        <span className="text-gray-700 text-sm font-medium">Volatility Index</span>
      </div>
    </div>
  );
};

const LightThemedChart: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  const handleMouseMove = (e: any) => {
    setHoveredPoint(e?.activePayload?.[0]?.payload || null);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 p-6 border border-gray-200/50 shadow-lg">
     
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className={`${dmSans.className} text-4xl font-bold bg-black bg-clip-text text-transparent mb-2`}>
          Neutral Hedged JLP Strategy
        </h1>
      </div>


      {/* Chart Container */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/70 rounded-2xl p-6 shadow-xl">
        <CustomLegend payload={[]} />

        <div className="h-96 relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 60, left: 60, bottom: 60 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="orangeGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
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
                tick={{ fontSize: 12, fill: "#6b7280" }}
                interval={2}
              />
              <YAxis
                yAxisId="left"
                domain={[0.8, 2.0]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value: number) => value.toFixed(2)}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[1.2, 5.2]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value: number) => value.toFixed(1)}
              />

              <Tooltip content={<CustomTooltip />} />

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="blue"
                stroke="#A4D756"
                strokeWidth={3}
                dot={{ fill: "#A4D756", strokeWidth: 2, r: 2 }}
                activeDot={{ r: 6, fill: "#A4D756", stroke: "#ffffff", strokeWidth: 2 }}
                connectNulls={false}
                filter="url(#glow)"
                name="Primary Asset"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="orange"
                stroke="#347879"
                strokeWidth={3}
                dot={{ fill: "#347879", strokeWidth: 2, r: 2 }}
                activeDot={{ r: 6, fill: "#347879", stroke: "#ffffff", strokeWidth: 2 }}
                connectNulls={false}
                filter="url(#glow)"
                name="Secondary Asset"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="gray"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, fill: "#8b5cf6", stroke: "#ffffff", strokeWidth: 2 }}
                connectNulls={false}
                strokeDasharray="5 5"
                name="Volatility Index"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LightThemedChart;

export function StatsCard(){
  return(
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

            <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
          <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
          <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <div>
           
                <p className="text-4xl font-bold text-green-400">40.5%</p>
                  <p className="text-black text-sm">Annualized Return in 2024</p>
              </div>
            </div>
            </div>
            </div>
          </div>

              <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
          <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
          <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-orange-600" />
              <div>
           
                <p className="text-4xl font-bold text-red-400">-1.5%</p>
              <p className="text-gray-400 text-sm">Maxdrawdown</p>
              </div>
            </div>
            </div>
            </div>
          </div>

                        <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
          <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
          <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-purple-400" />
              <div>
       
                <p className="text-4xl font-bold text-purple-600">+14.07%</p>
                <p className="text-gray-400 text-sm">Return Year-to-date(25)</p>
    
              </div>
            </div>
            </div>
            </div>
          </div>
      </div>
  )
}