import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  className?: string;
  children?: ReactNode;
}
export default function StatsCard({
  title,
  value,
  change,
  isPositive,
  className,
  children,
}: StatsCardProps) {
  return (
    <div className={`rounded-xl bg-gray-800 p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-100">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        {children}
        {change && (
          <div
            className={`flex items-center space-x-1 ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            <span className="text-sm">{change}</span>
          </div>
        )}
      </div>
    </div>
  );
}
