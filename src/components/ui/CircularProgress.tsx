interface CircularProgressProps {
  percentage: number;
  title: string;
  color: string;
}

export default function CircularProgress({
  percentage,
  title,
  color,
}: CircularProgressProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="rounded-xl bg-gray-800 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg className="h-32 w-32 -rotate-90 transform">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-700"
            />
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke={color}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{percentage}%</span>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Direct</span>
          <span className="text-white">45</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Email</span>
          <span className="text-white">32</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Social</span>
          <span className="text-white">23</span>
        </div>
      </div>
    </div>
  );
}
