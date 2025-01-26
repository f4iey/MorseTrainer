'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from './CustomTooltip';

export const PerformanceGraph = ({ performanceData }) => (
  <div className="bg-gray-700 p-2 rounded-lg">
    <div className="text-xs text-gray-400 mb-2">Performance Over Time</div>
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={performanceData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="attempt"
            stroke="#9CA3AF"
            tickFormatter={(value) => `${value}`}
          />
          <YAxis
            stroke="#9CA3AF"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rollingAccuracy"
            stroke="#60A5FA"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
