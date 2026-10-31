import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAgronomyData } from "../hooks/useAgronomyData";
import StatCard from "../components/StatCard";
import FieldMap from "../components/FieldMap";
import {
  Satellite,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Download,
  RefreshCw,
  Droplets,
  Layers,
  ChevronRight,
  TrendingUp,
  MapPin,
  Bot
} from "lucide-react";

export default function DashboardPage() {
  const { farmData, selectedField, setSelectedField, anomalies } = useAgronomyData();
  const [activeTab, setActiveTab] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleTriggerPulse = () => {
    setPulseActive(true);
    setTimeout(() => {
      alert("Supplemental irrigation pulse of +2.5 hours queued for Field B-07 Valve 4B!");
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* AI Adaptive Workspace Command Header */}
      <div className="bg-gradient-to-r from-primary-container via-surface-tint to-secondary rounded-2xl p-4 sm:p-6 shadow-md text-on-primary flex flex-col xl:flex-row xl:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 z-10">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-fixed"></span>
            </span>
            <span className="text-xs uppercase tracking-wider text-secondary-fixed font-bold font-mono">
              AI Adaptive Workspace Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">
              psychology
            </span>
            <span className="text-sm font-semibold text-white">
              Gemini Agronomic Grounding Synchronized
            </span>
          </div>
        </div>

        {/* Action Buttons Cluster */}
        <div className="flex items-center gap-2 flex-wrap z-10">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Sync Sentinel-2B</span>
          </button>
          <Link
            to="/ai-assistant"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold backdrop-blur-md transition-all"
          >
            <Bot className="w-3.5 h-3.5 text-secondary-fixed" />
            <span>Consult AI</span>
          </Link>
          <Link
            to="/ai-assistant"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed/90 text-xs font-bold shadow transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate Farm Report</span>
          </Link>
        </div>
      </div>

      {/* Farmer Profile Context Chip Bar & AI Rationale */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-surface-variant/40">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-bold text-on-surface flex items-center gap-1">
            <span className="material-symbols-outlined text-primary text-[18px]">nature_people</span>
            {farmData.operator}
          </span>
          <span className="text-on-surface-variant">•</span>
          <span className="text-on-surface font-medium">{farmData.farmName}</span>
          <span className="text-on-surface-variant">•</span>
          <span className="px-2 py-0.5 rounded-md bg-surface-container font-mono text-[11px] font-semibold text-primary">
            {farmData.parcelsCount} Parcels ({farmData.totalAreaHa} Ha)
          </span>
          <span className="text-on-surface-variant">•</span>
          <span className="text-secondary font-medium">{farmData.satellite.status}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-primary font-medium bg-surface-container-lowest px-3 py-1 rounded-xl border border-surface-variant/30">
          <Sparkles className="w-3.5 h-3.5 text-secondary" />
          <span>Priority Layout: Surfacing Field B-07 Acute Hydric Anomaly</span>
        </div>
      </div>

      {/* SECTION 1: 8 Primary KPI Metric Cards Bento */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-headline font-bold text-base text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">analytics</span>
            Planetary Farm Telemetry KPIs
          </h2>
          <span className="text-xs text-on-surface-variant">Calibrated today at 07:14 UTC</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {farmData.kpis.map((kpi) => (
            <StatCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              change={kpi.change}
              isPositive={kpi.isPositive}
              baseline={kpi.baseline}
              status={kpi.status}
              sparkline={kpi.sparkline}
            />
          ))}
        </div>
      </div>

      {/* SECTION 2: Interactive Field Boundaries Map & Parcels List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map View */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-4 sm:p-5 rounded-3xl border border-surface-variant/40 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">map</span>
              <h3 className="font-headline font-bold text-base text-on-surface">
                Live Multispectral GIS Monitor
              </h3>
            </div>
            <Link
              to="/gis-monitor"
              className="text-xs font-semibold text-secondary hover:text-primary flex items-center gap-1"
            >
              <span>Full Screen GIS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <FieldMap
            fields={farmData.fields}
            selectedField={selectedField}
            onSelectField={setSelectedField}
            height="400px"
          />

          {/* Selected Field Quick Telemetry Bar */}
          {selectedField && (
            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-sm text-on-surface block">
                  {selectedField.name} ({selectedField.crop})
                </span>
                <span className="text-on-surface-variant">
                  Area: {selectedField.areaHa} Ha • Soil Moisture: {selectedField.moisture} • Soil: {selectedField.soilType}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                    NDVI Index
                  </span>
                  <span className="font-headline text-lg font-bold text-secondary">
                    {selectedField.ndvi}
                  </span>
                </div>
                <Link
                  to="/crop-health"
                  className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary text-xs font-semibold hover:bg-primary transition-colors"
                >
                  Spectral Profile
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Parcels Table & Alerts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Critical Attention Card (Field B-07) */}
          <div className="p-4 rounded-3xl bg-error-container/40 border border-error/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-error uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-error" />
                Level 1 Hydric Anomaly
              </span>
              <span className="px-2 py-0.5 rounded-full bg-error text-white font-mono text-[10px] font-bold">
                CRITICAL
              </span>
            </div>

            <div>
              <h4 className="font-headline font-bold text-sm text-on-surface">
                Field B-07 'South Basin' (Almonds - 145 Ha)
              </h4>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                NDVI dropped to <strong>0.58</strong> (-18.3%). Root zone moisture is critically low at <strong>21.4%</strong> due to sub-lateral 4B pressure drop.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleTriggerPulse}
                className="flex-1 py-2 px-3 rounded-xl bg-error hover:bg-error/90 text-white font-semibold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>{pulseActive ? "Pulse Queued" : "Pulse Irrigation (+2.5 hrs)"}</span>
              </button>
              <Link
                to="/ai-assistant"
                className="py-2 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs border border-surface-variant/40 transition-colors flex items-center justify-center gap-1"
              >
                <span>AI Protocol</span>
              </Link>
            </div>
          </div>

          {/* Parcels Quick Selector List */}
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-variant/40 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant/30">
              <h4 className="font-headline font-bold text-sm text-on-surface">
                Farm Parcels ({farmData.fields.length})
              </h4>
              <span className="text-xs text-on-surface-variant">Click to locate</span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {farmData.fields.map((field) => {
                const isSelected = selectedField?.id === field.id;
                return (
                  <button
                    key={field.id}
                    onClick={() => setSelectedField(field)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-secondary-container/20 border-secondary shadow-sm"
                        : "bg-surface-container-low hover:bg-surface-container border-surface-variant/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-on-surface">
                          {field.name}
                        </span>
                        {field.statusColor === "error" && (
                          <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                        )}
                      </div>
                      <span className="text-[11px] text-on-surface-variant">
                        {field.crop} • {field.areaHa} Ha
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-secondary block">
                        NDVI {field.ndvi}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">
                        {field.moisture} moist
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

