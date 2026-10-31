import React from "react";
import { Link } from "react-router-dom";
import {
  Satellite,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Bot,
  ArrowRight,
  Droplets,
  Activity,
  FileText,
  Compass,
  Database,
  Cpu,
  BarChart3
} from "lucide-react";

export default function AgronomySuitePage() {
  const capabilities = [
    {
      title: "Level-2A Multi-Spectral Engine",
      icon: Satellite,
      desc: "Bottom-of-Atmosphere (BOA) reflectance correction across VNIR and SWIR bandwidths (443nm - 2190nm) calibrated by ESA Sen2Cor algorithms.",
      tags: ["Sentinel-2", "10m Pixel Ground Res", "Atmospheric Correction"],
      link: "/crop-health"
    },
    {
      title: "Isolation Forest Anomaly Classification",
      icon: Cpu,
      desc: "Unsupervised machine learning model detecting biophysical and hydric outliers across spatial polygons with 94.6% confidence before visible damage.",
      tags: ["Isolation Forest", "Sub-Canopy Detection", "Alerting Engine"],
      link: "/crop-health"
    },
    {
      title: "Dynamic Vector GIS Engine",
      icon: Compass,
      desc: "Interactive boundary geometry management with EPSG:4326 geospatial projection, raster heatmap layering, and GeoJSON polygon import/export.",
      tags: ["Leaflet", "GeoJSON", "Boundary Drawing", "Spatial Buffer"],
      link: "/gis-monitor"
    },
    {
      title: "Gemini 4.2 Agronomic Reasoning",
      icon: Bot,
      desc: "Generative AI grounded on live satellite passes, NOAA climate models, and localized IoT ground sensors to formulate variable-rate prescriptions.",
      tags: ["Gemini Grounded", "Agronomic Prompts", "Irrigation Scheduling"],
      link: "/ai-assistant"
    },
    {
      title: "IoT Ground Sensor Mesh Integration",
      icon: Droplets,
      desc: "LoRaWAN 915MHz telemetry synchronizing multi-depth root zone soil moisture probes (30cm, 60cm, 90cm) and sap flow monitors.",
      tags: ["99.8% Mesh Uptime", "Root Moisture", "Valve Control"],
      link: "/dashboard"
    },
    {
      title: "ISO-14064 Compliance & PDF Audits",
      icon: FileText,
      desc: "Automated generation of audit-ready compliance documents, carbon flux tracking, and executive agricultural yield reports.",
      tags: ["ISO-14064", "PDF Export", "Audit Ready", "CAP / USDA"],
      link: "/ai-assistant"
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Suite Banner */}
      <div className="bg-gradient-to-r from-primary-container via-surface-tint to-secondary rounded-3xl p-6 sm:p-10 text-on-primary shadow-xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-secondary-fixed">
            <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
            <span>AgroVision AI Suite Architecture</span>
          </div>
          <h1 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Precision Planetary Agronomy Suite
          </h1>
          <p className="text-surface-variant text-sm leading-relaxed">
            The complete aerospace-to-farm ecosystem connecting ESA Copernicus and USGS satellites, machine learning biophysical analytics, and Gemini-grounded agronomic prescriptions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 z-10">
          <Link
            to="/dashboard"
            className="px-5 py-3 rounded-xl bg-surface text-primary font-bold text-xs shadow-md hover:bg-surface-container-lowest transition-colors flex items-center justify-center gap-2"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/ai-assistant"
            className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <Bot className="w-4 h-4 text-secondary-fixed" />
            <span>AI Assistant</span>
          </Link>
        </div>
      </div>

      {/* 6 Core Platform Capabilities Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          return (
            <div
              key={cap.title}
              className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-variant/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-surface-container text-primary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-lg text-on-surface mb-2">
                  {cap.title}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  {cap.desc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cap.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-surface-container-low text-[10px] font-semibold text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to={cap.link}
                  className="text-xs font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span>Explore Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Constellations & Hardware Specs Table */}
      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-variant/40 shadow-sm space-y-4">
        <h3 className="font-headline font-bold text-lg text-on-surface">
          Connected Constellation Telemetry Specifications
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-container-low text-on-surface font-semibold border-b border-surface-variant/30">
              <tr>
                <th className="p-3">Platform</th>
                <th className="p-3">Sensor Payloads</th>
                <th className="p-3">Spatial Ground Res</th>
                <th className="p-3">Spectral Range</th>
                <th className="p-3">Revisit Cadence</th>
                <th className="p-3">Calibration Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant/20">
              <tr>
                <td className="p-3 font-semibold text-on-surface flex items-center gap-1.5">
                  <Satellite className="w-4 h-4 text-primary" />
                  Sentinel-2A / 2B
                </td>
                <td className="p-3 text-on-surface-variant">MSI (Multi-Spectral Instrument)</td>
                <td className="p-3 font-mono font-bold text-primary">10m / 20m</td>
                <td className="p-3 text-on-surface-variant">13 Bands (VNIR - SWIR)</td>
                <td className="p-3 text-on-surface-variant">5 days (constellation)</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                    Active BOA Level-2A
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-on-surface flex items-center gap-1.5">
                  <Satellite className="w-4 h-4 text-secondary" />
                  Landsat-9
                </td>
                <td className="p-3 text-on-surface-variant">OLI-2 & TIRS-2 (Thermal)</td>
                <td className="p-3 font-mono font-bold text-primary">15m / 30m / 100m</td>
                <td className="p-3 text-on-surface-variant">11 Bands (Visible - Thermal)</td>
                <td className="p-3 text-on-surface-variant">8 days</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                    NASA HLS v2.0 Sync
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-on-surface flex items-center gap-1.5">
                  <Radio className="w-4 h-4 text-tertiary" />
                  LoRaWAN IoT Soil Array
                </td>
                <td className="p-3 text-on-surface-variant">TDR Frequency Domain Probes</td>
                <td className="p-3 font-mono font-bold text-primary">Sub-Meter In-Situ</td>
                <td className="p-3 text-on-surface-variant">30cm, 60cm, 90cm Root Zone</td>
                <td className="p-3 text-on-surface-variant">15 min real-time stream</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                    18 / 18 Probes Online
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

