import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAgronomyData } from "../hooks/useAgronomyData";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";
import {
  Activity,
  AlertTriangle,
  Droplets,
  Sprout,
  Filter,
  Download,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Bot
} from "lucide-react";

export default function CropHealthPage() {
  const { farmData, anomalies } = useAgronomyData();
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filteredAnomalies = anomalies.filter((a) => {
    if (severityFilter === "all") return true;
    return a.severity.toLowerCase() === severityFilter.toLowerCase();
  });

  return (
    <div className="space-y-8">
      {/* Top Meta / Filters Ribbon */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-surface-variant/40">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-mono text-xs uppercase tracking-wider font-bold">
              Isolation Forest Active
            </span>
            <span className="text-xs text-on-surface-variant">
              • Level 2A Bottom-Of-Atmosphere (BOA) Surface Reflectance
            </span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Crop Health Spectral Analytics & Anomaly Detection
          </h1>
          <p className="text-sm text-on-surface-variant max-w-3xl mt-1 leading-relaxed">
            Multi-index vegetation analytics (NDVI, NDWI, EVI, SAVI) with Isolation Forest automated stress classification across 1,420 hectares.
          </p>
        </div>

        {/* Quick Actions & Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-variant/40 text-xs font-semibold text-on-surface focus:outline-none"
          >
            <option value="7d">Last 7 Days (Sentinel Pass)</option>
            <option value="30d">Last 30 Days (Monthly Cycle)</option>
            <option value="season">Full 2026 Growing Season</option>
          </select>

          <Link
            to="/ai-assistant"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-semibold hover:bg-primary transition-colors shadow-sm"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Spectral Audit</span>
          </Link>
        </div>
      </div>

      {/* SECTION 1: Vegetation Index Cards Bento */}
      <div>
        <h2 className="font-headline font-bold text-base text-on-surface mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span>Multispectral Vegetation Indices (10m Resolution)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {farmData.spectralIndices.map((idx) => (
            <div
              key={idx.name}
              className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-variant/40 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-headline font-bold text-lg text-primary">
                    {idx.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                    {idx.trend} vs 30d
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-on-surface mb-1">
                  {idx.fullName}
                </h4>
                <p className="font-mono text-[11px] text-on-surface-variant/80 bg-surface-container-low px-2 py-1 rounded-md inline-block mb-3">
                  {idx.formula}
                </p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {idx.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-variant/30 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                    Current Mean
                  </span>
                  <span className="font-headline text-2xl font-extrabold text-on-surface">
                    {idx.currentVal}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                    Regional Benchmark
                  </span>
                  <span className="font-mono text-xs font-semibold text-on-surface-variant">
                    {idx.benchmark}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Spectral Reflectance Curves (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-variant/40 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-headline font-bold text-base text-on-surface">
                Multispectral Surface Reflectance Signatures
              </h3>
              <p className="text-xs text-on-surface-variant">
                Comparison across 10 Sentinel-2 bands: Healthy Canopy vs Stressed Parcel B-07 vs Bare Soil
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-secondary font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]"></span>
                Optimal Canopy
              </span>
              <span className="flex items-center gap-1.5 text-error font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
                Field B-07 Stressed
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={farmData.wavelengthReflectance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f4ff" />
                <XAxis dataKey="band" stroke="#707a6f" fontSize={11} tickLine={false} />
                <YAxis stroke="#707a6f" fontSize={11} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                <Tooltip
                  formatter={(val) => [`${(Number(val) * 100).toFixed(1)}% Reflectance`, ""]}
                  contentStyle={{
                    backgroundColor: "#f4faff",
                    borderRadius: "12px",
                    border: "1px solid #cee6f4",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="healthy"
                  name="Optimal Canopy"
                  stroke="#006c49"
                  strokeWidth={3}
                  dot={{ r: 3, fill: "#006c49" }}
                />
                <Line
                  type="monotone"
                  dataKey="stressed"
                  name="Field B-07 (Hydric Deficit)"
                  stroke="#ba1a1a"
                  strokeWidth={3}
                  strokeDasharray="4 4"
                  dot={{ r: 4, fill: "#ba1a1a" }}
                />
                <Line
                  type="monotone"
                  dataKey="soil"
                  name="Bare Soil Baseline"
                  stroke="#707a6f"
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant leading-relaxed">
            💡 <strong>Spectral Finding:</strong> Note the severe NIR reflectance flattening at <strong>842nm (Band 8)</strong> on Field B-07, indicating collapsed mesophyll cell wall scattering from severe hydric stress.
          </div>
        </div>

        {/* SECTION 2B: Historical NDVI Trend Across Parcels */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-variant/40 shadow-sm space-y-4">
          <div>
            <h3 className="font-headline font-bold text-base text-on-surface">
              30-Day NDVI Trend
            </h3>
            <p className="text-xs text-on-surface-variant">
              Farm average vs individual parcel trajectories
            </p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={farmData.historicalNdviTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f4ff" />
                <XAxis dataKey="date" stroke="#707a6f" fontSize={10} />
                <YAxis domain={[0.5, 1.0]} stroke="#707a6f" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f4faff",
                    borderRadius: "10px",
                    border: "1px solid #cee6f4",
                    fontSize: "11px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="avgNdvi"
                  name="Farm Average"
                  stroke="#166534"
                  fill="rgba(22, 101, 52, 0.15)"
                />
                <Line
                  type="monotone"
                  dataKey="fieldB"
                  name="Field B-07 (Drop)"
                  stroke="#ba1a1a"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-surface-variant/30 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">North Orchard (A-01):</span>
              <span className="font-bold text-secondary">0.84 (+16%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">South Basin (B-07):</span>
              <span className="font-bold text-error">0.58 (-18%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Isolation Forest Stress Anomaly Queue */}
      <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-variant/40 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-variant/30">
          <div>
            <h3 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-error" />
              <span>Active Crop Stress Anomaly Queue</span>
            </h3>
            <p className="text-xs text-on-surface-variant">
              Classified via unsupervised Isolation Forest model trained on multi-seasonal Level-2A surface reflectance
            </p>
          </div>

          {/* Severity filter buttons */}
          <div className="flex items-center gap-1.5 bg-surface-container p-1 rounded-xl">
            {["all", "critical", "moderate", "resolved"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSeverityFilter(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  severityFilter === filter
                    ? "bg-surface-container-lowest text-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredAnomalies.map((anom) => (
            <div
              key={anom.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                anom.severity === "CRITICAL"
                  ? "bg-error-container/20 border-error/40"
                  : anom.severity === "MODERATE"
                  ? "bg-tertiary-container/15 border-tertiary/40"
                  : "bg-surface-container-low border-surface-variant/30 opacity-75"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider ${
                      anom.severity === "CRITICAL"
                        ? "bg-error text-white"
                        : anom.severity === "MODERATE"
                        ? "bg-tertiary-fixed text-on-tertiary-fixed font-semibold"
                        : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {anom.severity}
                  </span>
                  <span className="font-mono text-xs font-semibold text-on-surface-variant">
                    {anom.id}
                  </span>
                  <span className="text-xs text-on-surface-variant">• {anom.detectedDate}</span>
                </div>

                <h4 className="font-headline font-bold text-base text-on-surface">
                  {anom.fieldName} — {anom.type}
                </h4>

                <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant pt-1">
                  <span>
                    Affected: <strong>{anom.affectedArea}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Signal Impact: <strong>{anom.metricImpact}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Outlier Score: <strong className="font-mono">{anom.isolationScore}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Model Confidence: <strong>{anom.confidence}</strong>
                  </span>
                </div>
              </div>

              {/* Action Prescription */}
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center gap-3">
                <div className="text-left lg:text-right">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                    Recommended Action
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    {anom.actionRequired}
                  </span>
                </div>

                <Link
                  to="/ai-assistant"
                  className="px-3 py-2 rounded-xl bg-primary-container text-on-primary hover:bg-primary text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Prescribe Action</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

