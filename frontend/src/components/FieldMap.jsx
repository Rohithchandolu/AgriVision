import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Popup, Tooltip, useMap } from "react-leaflet";
import { AlertTriangle, Droplets, Sun, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";

// Helper component to center map on selection
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 14);
    }
  }, [center, zoom, map]);
  return null;
}

export default function FieldMap({
  fields = [],
  selectedField = null,
  onSelectField = () => {},
  activeLayer = "sentinel", // "sentinel", "ndvi", "rgb", "moisture", "thermal"
  height = "520px"
}) {
  const defaultCenter = [41.198, -95.998];

  // Tile layer URL based on activeLayer
  const getTileUrl = () => {
    switch (activeLayer) {
      case "rgb":
      case "sentinel":
        // ESRI Satellite imagery (reliable, beautiful)
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case "ndvi":
      case "moisture":
        // OpenTopoMap or Satellite with high contrast
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  const getPolygonColor = (field) => {
    if (field.id === selectedField?.id) {
      return "#acf847"; // highlight yellow-green
    }
    if (field.statusColor === "error") {
      return "#ba1a1a"; // red critical
    }
    if (field.statusColor === "tertiary") {
      return "#d97706"; // amber moderate
    }
    return "#10b981"; // healthy emerald
  };

  return (
    <div
      style={{ height }}
      className="w-full rounded-2xl overflow-hidden border border-surface-variant/40 shadow-sm relative z-0"
    >
      <MapContainer
        center={selectedField?.center || defaultCenter}
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <MapController center={selectedField?.center} zoom={14} />
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>, Copernicus Sentinel-2'
          url={getTileUrl()}
          maxZoom={19}
        />

        {fields.map((field) => {
          const isSelected = selectedField?.id === field.id;
          const color = getPolygonColor(field);

          return (
            <Polygon
              key={field.id}
              positions={field.coordinates}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: isSelected ? 0.6 : 0.35,
                weight: isSelected ? 3.5 : 2,
                dashArray: field.statusColor === "error" ? "4, 6" : undefined,
              }}
              eventHandlers={{
                click: () => onSelectField(field),
              }}
            >
              <Tooltip direction="center" offset={[0, 0]} opacity={0.9} permanent={isSelected}>
                <span className="font-semibold text-xs">
                  {field.name} • NDVI {field.ndvi}
                </span>
              </Tooltip>

              <Popup>
                <div className="p-1 min-w-[220px]">
                  <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
                    <span className="font-bold text-sm text-gray-900">{field.name}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        field.riskLevel === "Critical"
                          ? "bg-red-100 text-red-700"
                          : field.riskLevel === "Moderate"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {field.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-2 text-xs">
                    <div>
                      <span className="text-gray-500 block">Crop:</span>
                      <span className="font-medium text-gray-800">{field.crop}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Area:</span>
                      <span className="font-medium text-gray-800">{field.areaHa} Ha</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">NDVI Index:</span>
                      <span className="font-bold text-emerald-600">{field.ndvi}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Soil Moisture:</span>
                      <span className="font-medium text-gray-800">{field.moisture}</span>
                    </div>
                  </div>

                  {field.anomaly && (
                    <div className="bg-red-50 border-l-2 border-red-500 p-1.5 text-[11px] text-red-700 mb-2">
                      <span className="font-semibold block">⚠️ Anomaly:</span>
                      {field.anomaly}
                    </div>
                  )}

                  <button
                    onClick={() => onSelectField(field)}
                    className="w-full mt-1 py-1 px-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <span>View Telemetry Breakdown</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>

      {/* Floating Map HUD Control Overlay */}
      <div className="absolute top-3 right-3 z-[1000] bg-surface/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-surface-variant/40 flex items-center gap-2 text-xs font-medium">
        <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
        <span className="text-on-surface">EPSG:4326 • 10m Multispectral Grid</span>
      </div>

      {/* Floating NDVI Heatmap Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-surface/90 backdrop-blur-md p-3 rounded-xl shadow-md border border-surface-variant/40 max-w-xs text-xs">
        <div className="flex items-center justify-between mb-1 text-[11px] font-semibold text-on-surface">
          <span>NDVI Spectral Range</span>
          <span className="font-mono text-secondary">0.0 → 1.0</span>
        </div>
        <div className="h-2.5 w-44 rounded-full bg-gradient-to-r from-red-600 via-amber-400 to-emerald-600"></div>
        <div className="flex justify-between text-[10px] text-on-surface-variant mt-1 font-mono">
          <span>0.2 (Soil/Stress)</span>
          <span>0.5 (Moderate)</span>
          <span>0.9 (Dense Canopy)</span>
        </div>
      </div>
    </div>
  );
}

