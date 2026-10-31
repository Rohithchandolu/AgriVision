import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Sprout,
  Map,
  Bot,
  Layers,
  FileText,
  AlertTriangle,
  Settings,
  Satellite,
  Compass
} from "lucide-react";

export default function Sidebar({ parcelCount = 18, anomalyCount = 2 }) {
  const location = useLocation();

  const links = [
    {
      label: "Farmer Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      badge: null
    },
    {
      label: "Crop Health & Spectral",
      path: "/crop-health",
      icon: Sprout,
      badge: `${anomalyCount} Alerts`,
      badgeColor: "bg-error text-white"
    },
    {
      label: "GIS Satellite Monitor",
      path: "/gis-monitor",
      icon: Map,
      badge: "Sentinel-2B",
      badgeColor: "bg-secondary-fixed text-on-secondary-fixed"
    },
    {
      label: "AI Agronomist & PDF",
      path: "/ai-assistant",
      icon: Bot,
      badge: "Gemini 4.2",
      badgeColor: "bg-surface-container-high text-primary"
    },
    {
      label: "Agronomy Suite",
      path: "/suite",
      icon: Layers,
      badge: null
    }
  ];

  const isCurrent = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-surface-container-lowest border-r border-surface-variant/40 flex flex-col justify-between p-4 shrink-0 hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* Farm Context Card */}
        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-variant/40">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              agriculture
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Active Operation
            </span>
          </div>
          <h4 className="font-headline font-semibold text-sm text-on-surface truncate">
            Green Valley Agri-Corp
          </h4>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-surface-variant/30 text-[11px] text-on-surface-variant">
            <span>{parcelCount} Parcels (1,420 Ha)</span>
            <span className="text-secondary font-medium">99.4% Cloudless</span>
          </div>
        </div>

        {/* Navigation list */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold text-on-surface-variant/70 uppercase tracking-wider mb-2">
            Agronomic Modules
          </p>
          {links.map((item) => {
            const Icon = item.icon;
            const active = isCurrent(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-primary-container text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? "text-on-primary" : "text-primary"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wide ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick Satellite Pass Widget */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/15 border border-primary/20">
          <div className="flex items-center justify-between text-xs font-semibold text-primary mb-1">
            <span className="flex items-center gap-1.5">
              <Satellite className="w-3.5 h-3.5" />
              Next Satellite Pass
            </span>
            <span className="font-mono text-[11px]">in 2h 45m</span>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Landsat-9 Thermal Sensor (TIRS-2) overpass scheduled for 10:15 UTC.
          </p>
        </div>
      </div>

      {/* Bottom User & System Status */}
      <div className="pt-4 border-t border-surface-variant/40 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-on-surface-variant px-1">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
            ESA Cop-Hub Sync
          </span>
          <span className="font-mono">v4.2 PRO</span>
        </div>
        <Link
          to="/register"
          className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-medium text-on-surface transition-colors"
        >
          <Settings className="w-3.5 h-3.5 text-on-surface-variant" />
          <span>Farm Settings & Nodes</span>
        </Link>
      </div>
    </aside>
  );
}

