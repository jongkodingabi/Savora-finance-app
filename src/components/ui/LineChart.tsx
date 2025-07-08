"use client";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { date: string; total: number }[];
}

export default function LineChart({ data }: Props) {
  return (
    <div className="rounded-xl bg-gray-800 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Transaction Overview
          </h3>
          <p className="text-3xl font-bold text-white">
            {data.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg bg-gray-900 px-3 py-1">
          <span className="text-sm text-gray-300">{data.length} days</span>
        </div>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fill: "#ccc", fontSize: 12 }} />
            <YAxis tick={{ fill: "#ccc", fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#06B6D4"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-between text-xs text-gray-400">
        {data.slice(0, 6).map((d) => (
          <span key={d.date}>
            {new Date(d.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        ))}
      </div>
    </div>
  );
}
