import React from "react";
import { Link } from "react-router-dom";
import { Satellite, ShieldCheck, Database, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-surface-variant/40 pt-10 pb-8 text-on-surface-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-surface-variant/40">
          {/* Brand & mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
              </div>
              <span className="font-headline font-bold text-base text-on-surface">AgroVision AI</span>
            </div>
            <p className="text-xs leading-relaxed text-on-surface-variant">
              Precision planetary agronomy, multi-spectral satellite telemetry, and Gemini-grounded agricultural intelligence for modern farm enterprises.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-secondary font-medium">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
              Sentinel-2B & Landsat-9 Dual Constellation
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h5 className="font-headline text-xs font-bold uppercase tracking-wider text-on-surface mb-3">
              Platform Modules
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/dashboard" className="hover:text-primary transition-colors">
                  Personalized Dashboard
                </Link>
              </li>
              <li>
                <Link to="/crop-health" className="hover:text-primary transition-colors">
                  Crop Health & Spectral Indices
                </Link>
              </li>
              <li>
                <Link to="/gis-monitor" className="hover:text-primary transition-colors">
                  GIS Field Boundaries & Heatmaps
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="hover:text-primary transition-colors">
                  Gemini Agronomist & PDF Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Constellations & Sensors */}
          <div>
            <h5 className="font-headline text-xs font-bold uppercase tracking-wider text-on-surface mb-3">
              Telemetry Feeds
            </h5>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5 text-primary" />
                <span>Sentinel-2 (10m Multi-spectral)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-secondary" />
                <span>NASA HLS v2.0 Global Mosaic</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-tertiary" />
                <span>ESA Copernicus Access Hub</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-primary" />
                <span>ISO-14064 Ag-Data Verified</span>
              </li>
            </ul>
          </div>

          {/* Quick Access / Authentication */}
          <div>
            <h5 className="font-headline text-xs font-bold uppercase tracking-wider text-on-surface mb-3">
              Farmer Access
            </h5>
            <p className="text-xs text-on-surface-variant mb-3">
              Connect your farm parcel boundaries and ground IoT sensor nodes.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                to="/register"
                className="inline-flex items-center justify-center py-2 px-3 rounded-lg bg-primary-container text-on-primary text-xs font-semibold hover:bg-primary transition-colors"
              >
                Register New Farm
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center py-2 px-3 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors"
              >
                Sign In to Workstation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 AgroVision AI Precision Agronomy Suite. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>EPSG:4326 GeoEngine</span>
            <span>•</span>
            <span>Level-2A Bottom-Of-Atmosphere (BOA)</span>
            <span>•</span>
            <span>Sub-Meter Precision IoT Mesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

