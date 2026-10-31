import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAgronomyData } from "../hooks/useAgronomyData";
import FieldMap from "../components/FieldMap";
import {
  Satellite,
  Layers,
  MapPin,
  Compass,
  AlertTriangle,
  Download,
  Droplets,
  Share2,
  Maximize2,
  ChevronRight,
  Sparkles,
  Bot
} from "lucide-react";

export default function GisMonitorPage() {
  const { farmData, selectedField, setSelectedField } = useAgronomyData();
  const [activeLayer, setActiveLayer] = useState("sentinel"); // sentinel, ndvi, rgb, moisture, thermal
  const [measurementMode, setMeasurementMode] = useState(false);
  const [geojsonExported, setGeojsonExported] = useState(false);

  const layers = [
    { id: "sentinel", label: "Sentinel-2 Multispectral", icon: "satellite_alt" },
    { id: "ndvi", label: "NDVI Heatmap (10m)", icon: "gradient" },
    { id: "rgb", label: "True Color RGB", icon: "photo_camera" },
    { id: "moisture", label: "Soil Moisture NDRE", icon: "water_drop" },
    { id: "thermal", label: "Thermal Stress (TIRS-2)", icon: "thermostat" },
  ];

  const handleExportGeoJson = () => {
    const geojsonData = {
      type: "FeatureCollection",
      features: farmData.fields.map((f) => ({
        type: "Feature",
        properties: {
          id: f.id,
          name: f.name,
          crop: f.crop,
          areaHa: f.areaHa,
          ndvi: f.ndvi,
          moisture: f.moisture,
          status: f.status,
        },
        geometry: {
          type: "Polygon",
          coordinates: [f.coordinates.map(([lat, lng]) => [lng, lat])],
        },
      })),
    };

    const blob = new Blob([JSON.stringify(geojsonData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "green_valley_farm_parcels.geojson";
    a.click();
    URL.revokeObjectURL(url);
    setGeojsonExported(true);
    setTimeout(() => setGeojsonExported(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Layer Switcher */}
      <div className="flex flex-col gap-4 pb-2 border-b border-surface-variant/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-ping"></span>
              <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
                ESA Copernicus & USGS Telemetry Hub
              </span>
            </div>
            <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Field Boundaries & GIS Satellite Monitor
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Vector parcel geometries overlaid on Sentinel-2B multispectral raster passes (EPSG:4326)
            </p>
          </div>

          {/* Quick HUD GIS Tools */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setMeasurementMode(!measurementMode)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                measurementMode
                  ? "bg-secondary text-white border-secondary"
                  : "bg-surface-container-low hover:bg-surface-container text-on-surface border-surface-variant/40"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{measurementMode ? "Ruler Active" : "Measure Polygon"}</span>
            </button>

            <button
              onClick={handleExportGeoJson}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold border border-surface-variant/40 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-primary" />
              <span>{geojsonExported ? "GeoJSON Exported!" : "Export GeoJSON"}</span>
            </button>

            <Link
              to="/ai-assistant"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-semibold hover:bg-primary transition-all shadow-sm"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Field AI Prescription</span>
            </Link>
          </div>
        </div>

        {/* Raster Layer Selectors */}
        <div className="flex items-center gap-2 bg-surface-container-high/60 p-1.5 rounded-2xl overflow-x-auto max-w-full">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeLayer === layer.id
                  ? "bg-surface-container-lowest text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-lowest/50"
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-primary">
                {layer.icon}
              </span>
              <span>{layer.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Workspace with Inspection Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Map Container */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-3 rounded-3xl border border-surface-variant/40 shadow-sm relative">
          <FieldMap
            fields={farmData.fields}
            selectedField={selectedField}
            onSelectField={setSelectedField}
            activeLayer={activeLayer}
            height="580px"
          />
        </div>

        {/* Selected Field Telemetry Drawer */}
        <div className="lg:col-span-4 space-y-4">
          {selectedField ? (
            <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-variant/40 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-variant/30">
                <div>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Selected Parcel Geometry
                  </span>
                  <h3 className="font-headline font-bold text-lg text-on-surface">
                    {selectedField.name}
                  </h3>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    selectedField.riskLevel === "Critical"
                      ? "bg-error text-white"
                      : selectedField.riskLevel === "Moderate"
                      ? "bg-tertiary-fixed text-on-tertiary-fixed"
                      : "bg-secondary-container text-on-secondary-container"
                  }`}
                >
                  {selectedField.status}
                </span>
              </div>

              {/* Crop & Acreage Metadata */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-surface-container-low">
                  <span className="text-on-surface-variant text-[11px] block">Crop Type:</span>
                  <span className="font-semibold text-on-surface">{selectedField.crop}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-low">
                  <span className="text-on-surface-variant text-[11px] block">Surface Area:</span>
                  <span className="font-semibold text-on-surface">{selectedField.areaHa} Hectares</span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-low">
                  <span className="text-on-surface-variant text-[11px] block">Irrigation System:</span>
                  <span className="font-semibold text-on-surface">{selectedField.irrigation}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-low">
                  <span className="text-on-surface-variant text-[11px] block">Soil Class:</span>
                  <span className="font-semibold text-on-surface">{selectedField.soilType}</span>
                </div>
              </div>

              {/* Spectral Telemetry Bento */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider block">
                  Spectral Index Readings
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-surface-container-low">
                    <span className="text-[10px] text-on-surface-variant block font-semibold">NDVI</span>
                    <span className="font-headline font-bold text-base text-secondary">{selectedField.ndvi}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface-container-low">
                    <span className="text-[10px] text-on-surface-variant block font-semibold">NDWI (Water)</span>
                    <span className="font-headline font-bold text-base text-on-surface">{selectedField.ndwi}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface-container-low">
                    <span className="text-[10px] text-on-surface-variant block font-semibold">Moisture</span>
                    <span className="font-headline font-bold text-base text-on-surface">{selectedField.moisture}</span>
                  </div>
                </div>
              </div>

              {/* Anomaly note if present */}
              {selectedField.anomaly && (
                <div className="p-3 rounded-xl bg-error-container/30 border border-error/40 text-xs text-error space-y-1">
                  <span className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Anomaly Flagged:
                  </span>
                  <p className="text-on-surface leading-relaxed">{selectedField.anomaly}</p>
                </div>
              )}

              {/* Agronomic Recommendation */}
              <div className="p-3 rounded-xl bg-secondary-container/20 border border-secondary/30 text-xs text-on-surface space-y-1">
                <span className="font-bold text-secondary flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Gemini Agronomic Action:
                </span>
                <p className="leading-relaxed">{selectedField.recommendation}</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2">
                <Link
                  to="/ai-assistant"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-semibold text-xs text-center shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask AI About Field</span>
                </Link>
                <Link
                  to="/crop-health"
                  className="py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs border border-surface-variant/40 transition-colors"
                >
                  Spectra
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-variant/40 text-center text-xs text-on-surface-variant">
              Select any parcel on the map to inspect its real-time multispectral indices.
            </div>
          )}

          {/* Satellite Orbit Telemetry Ribbon */}
          <div className="p-4 rounded-3xl bg-surface-container-low border border-surface-variant/40 text-xs space-y-2">
            <div className="flex items-center justify-between text-on-surface font-semibold">
              <span className="flex items-center gap-1.5">
                <Satellite className="w-4 h-4 text-primary" />
                Sentinel-2B Telemetry Lock
              </span>
              <span className="font-mono text-secondary">Orbit 4812</span>
            </div>
            <div className="text-[11px] text-on-surface-variant space-y-1">
              <div className="flex justify-between">
                <span>Pass Schedule:</span>
                <span className="font-semibold text-on-surface">Every 5 days at 10m Ground Res</span>
              </div>
              <div className="flex justify-between">
                <span>Atmospheric Correction:</span>
                <span className="font-semibold text-on-surface">Sen2Cor v2.10 BOA</span>
              </div>
              <div className="flex justify-between">
                <span>Spectral Bands:</span>
                <span className="font-semibold text-on-surface">13 Bands (VNIR - SWIR)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

