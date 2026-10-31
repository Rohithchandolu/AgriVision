import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  unit,
  change,
  isPositive,
  baseline,
  status,
  sparkline = [],
  icon: Icon
}) {
  // Generate simple responsive SVG sparkline path
  const renderSparkline = () => {
    if (!sparkline || sparkline.length < 2) return null;
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline);
    const range = max - min || 1;
    const width = 100;
    const height = 28;

    const points = sparkline.map((val, idx) => {
      const x = (idx / (sparkline.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    });

    const pathD = `M ${points.join(" L ")}`;

    return (
      <svg className="w-24 h-7 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        <path
          d={pathD}
          fill="none"
          stroke={isPositive ? "#006c49" : "#ba1a1a"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Fill underneath */}
        <path
          d={`${pathD} L ${width},${height} L 0,${height} Z`}
          fill={isPositive ? "rgba(111, 251, 190, 0.2)" : "rgba(255, 218, 214, 0.4)"}
        />
      </svg>
    );
  };

  return (
    <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-variant/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            {title}
          </span>
          {Icon && (
            <div className="w-7 h-7 rounded-lg bg-surface-container text-primary flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-headline text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">
            {value}
          </span>
          {unit && <span className="text-xs text-on-surface-variant font-medium">{unit}</span>}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-surface-variant/30 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            {isPositive ? (
              <span className="inline-flex items-center gap-0.5 text-secondary">
                <TrendingUp className="w-3.5 h-3.5" />
                {change}
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 text-error">
                <TrendingDown className="w-3.5 h-3.5" />
                {change}
              </span>
            )}
          </div>
          {baseline && (
            <span className="text-[10px] text-on-surface-variant/80 mt-0.5">{baseline}</span>
          )}
        </div>

        {renderSparkline()}
      </div>
    </div>
  );
}

