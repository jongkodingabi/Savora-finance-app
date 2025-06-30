export default function LineChart() {
  return (
    <div className="rounded-xl bg-gray-800 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Total visits</h3>
          <p className="text-3xl font-bold text-white">42.43M</p>
        </div>
        <div className="rounded-lg bg-gray-900 px-3 py-1">
          <span className="text-sm text-gray-300">2x,499,204</span>
        </div>
      </div>

      {/* Simplified chart representation */}
      <div className="relative h-48">
        <svg className="h-full w-full" viewBox="0 0 400 200">
          <defs>
            <linearGradient
              id="chartGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <path
            d="M 0 150 Q 50 120 100 130 T 200 100 T 300 80 T 400 60"
            stroke="url(#chartGradient)"
            strokeWidth="3"
            fill="none"
            className="drop-shadow-lg"
          />
          {/* Data points */}
          <circle cx="100" cy="130" r="4" fill="#8B5CF6" />
          <circle cx="200" cy="100" r="4" fill="#06B6D4" />
          <circle cx="300" cy="80" r="4" fill="#10B981" />
        </svg>
      </div>

      {/* Chart legend/timeline */}
      <div className="mt-4 flex justify-between text-xs text-gray-400">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  );
}
