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
  Compass
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Ambient Glow Field */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[980px] h-[480px] bg-gradient-to-b from-secondary-fixed/25 via-surface-container/20 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      {/* Hero Section */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Trust Badge / Telemetry Status */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-surface-container-low border border-surface-variant/50 shadow-sm text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-xs font-semibold tracking-wide text-on-surface">
                Sentinel-2 & Landsat-9 Live Cadence • 10m Ground Resolution
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.15]">
              Monitor Your Fields. <br />
              <span className="text-primary-container">Understand Your Crops.</span> <br />
              <span className="text-secondary">Make Smarter Decisions.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              AgroVision AI turns multispectral aerospace telemetry, ground IoT sensor arrays, and Gemini-grounded generative agronomists into continuous yield protection across every acre of your farm.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-container text-on-primary font-semibold shadow-lg shadow-primary-container/20 hover:bg-primary transition-all active:scale-[0.99]"
              >
                <span>Open Farmer Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/gis-monitor"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold border border-surface-variant/40 transition-colors"
              >
                <Satellite className="w-4 h-4 text-primary" />
                <span>Explore Live GIS Monitor</span>
              </Link>
            </div>

            {/* Trust Micro Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <span>ISO-14064 Ag-Data Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Satellite className="w-4 h-4 text-primary" />
                <span>NASA HLS v2.0 Global Mosaic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>99.4% Cloudless Orbit Passes</span>
              </div>
            </div>
          </div>

          {/* Right Hero Telemetry HUD Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-gradient-to-br from-surface-container via-surface-container-low to-surface-container-lowest p-6 shadow-2xl border border-surface-variant/60 overflow-hidden">
              {/* Card top banner */}
              <div className="flex items-center justify-between pb-4 border-b border-surface-variant/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow">
                    <Satellite className="w-5 h-5 text-secondary-fixed" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-sm text-on-surface">
                      Sentinel-2B Telemetry Lock
                    </h3>
                    <p className="text-[11px] text-on-surface-variant">
                      Green Valley Parcel A-01 (180 Ha)
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
                  LIVE STREAM
                </span>
              </div>

              {/* Central Map / Telemetry Preview */}
              <div className="my-5 relative rounded-2xl overflow-hidden h-52 bg-slate-900 border border-surface-variant/40">
                {/* Background Satellite Photo */}
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
                  alt="Agricultural field telemetry overlay"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40"></div>

                {/* Floating NDVI Badge */}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/30 text-white text-xs">
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>NDVI Index: 0.84</span>
                  </div>
                </div>

                {/* Spectral Tag */}
                <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white text-[11px] font-mono">
                  Level-2A Bottom-of-Atmosphere
                </div>
              </div>

              {/* 3 Metric Pills Bento */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-variant/40 text-center">
                  <span className="text-[10px] font-semibold uppercase text-on-surface-variant block">
                    Soil Moisture
                  </span>
                  <span className="font-headline font-bold text-base text-on-surface">38.2%</span>
                  <span className="text-[10px] text-secondary font-medium block">Optimal</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-variant/40 text-center">
                  <span className="text-[10px] font-semibold uppercase text-on-surface-variant block">
                    Canopy Cover
                  </span>
                  <span className="font-headline font-bold text-base text-on-surface">92.4%</span>
                  <span className="text-[10px] text-secondary font-medium block">Dense</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-variant/40 text-center">
                  <span className="text-[10px] font-semibold uppercase text-on-surface-variant block">
                    Anomaly Score
                  </span>
                  <span className="font-headline font-bold text-base text-secondary">0.02</span>
                  <span className="text-[10px] text-secondary font-medium block">Normal</span>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="mt-4 pt-3 border-t border-surface-variant/40 flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">Next Overpass: in 2h 45m</span>
                <Link
                  to="/crop-health"
                  className="text-secondary font-semibold hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span>Spectral Detail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="bg-surface-container-low py-20 border-y border-surface-variant/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full bg-secondary-fixed/20 text-on-secondary-fixed-variant text-xs font-bold uppercase tracking-wider">
              Comprehensive Agronomy Pipeline
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-on-surface mt-3">
              Everything You Need to Monitor Your Agricultural Fields
            </h2>
            <p className="text-on-surface-variant mt-3 text-base">
              Integrated geospatial workflows uniting satellite multispectral observation, machine learning anomaly classification, and automated agronomist reasoning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-variant/40 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-secondary-fixed" />
              </div>
              <h3 className="font-headline font-bold text-lg text-on-surface mb-2">
                Multi-Spectral Vegetation Indices
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Calculate NDVI, NDWI, EVI, and SAVI at 10m ground resolution to pinpoint water stress and nitrogen deficiencies days before physical discoloration.
              </p>
              <Link to="/crop-health" className="text-sm font-semibold text-secondary hover:text-primary flex items-center gap-1">
                <span>View Crop Health Analytics</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-variant/40 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center mb-4">
                <Compass className="w-6 h-6 text-secondary-fixed" />
              </div>
              <h3 className="font-headline font-bold text-lg text-on-surface mb-2">
                Interactive GIS Field Boundaries
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Draw, import, and inspect field polygons overlaid on high-resolution true-color and false-color satellite rasters with real-time telemetry HUDs.
              </p>
              <Link to="/gis-monitor" className="text-sm font-semibold text-secondary hover:text-primary flex items-center gap-1">
                <span>Explore GIS Monitor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-variant/40 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-secondary-fixed" />
              </div>
              <h3 className="font-headline font-bold text-lg text-on-surface mb-2">
                Gemini-Grounded Agronomist
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Ask complex agronomic questions and receive immediate, grounded prescriptions connected to NOAA micro-climates, soil sensors, and satellite passes.
              </p>
              <Link to="/ai-assistant" className="text-sm font-semibold text-secondary hover:text-primary flex items-center gap-1">
                <span>Consult AI Assistant</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-primary-container via-surface-tint to-secondary p-8 sm:p-14 text-on-primary shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-white/15 text-secondary-fixed text-xs font-bold uppercase tracking-wider">
              Ready to Upgrade Your Agronomy Workstation?
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mt-3 leading-tight">
              Protect Crop Vigor and Maximize Yield with Aerospace Precision.
            </h2>
            <p className="mt-3 text-surface-variant text-base">
              Join enterprise agricultural operations managing over 1.4 million hectares with AgroVision AI.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              to="/register"
              className="px-6 py-3.5 rounded-xl bg-surface text-primary font-bold text-sm text-center shadow hover:bg-surface-container-lowest transition-colors"
            >
              Register Farm Free
            </Link>
            <Link
              to="/login"
              className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/20 text-white font-bold text-sm text-center border border-white/20 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

