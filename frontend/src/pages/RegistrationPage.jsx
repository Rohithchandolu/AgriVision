import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Satellite,
  User,
  Building,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Radio,
  Layers,
  Sparkles
} from "lucide-react";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "Sarah Jenkins",
    role: "Lead Agronomist & Planetary GIS Specialist",
    email: "sarah.jenkins@greenvalleyagro.com",
    phone: "+1 (555) 382-9014",
    password: "SentinelAgronomy2025!",
    farmName: "Green Valley Agri-Corporation",
    region: "Central Valley Agricultural Basin (California)",
    totalAreaHa: "1420",
    primaryCrops: "Almonds, Winter Wheat, Corn, Soybeans",
    constellation: "Sentinel-2B (10m Multispectral)",
    iotProbes: "18 LoRaWAN Soil Moisture Sensors",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completed!
      navigate("/dashboard");
    }
  };

  const steps = [
    { number: 1, title: "Operator Credentials", desc: "Identity & Security" },
    { number: 2, title: "Farm & Geolocation", desc: "Parcels & Acreage" },
    { number: 3, title: "Constellation & IoT", desc: "Telemetry Feeds" },
    { number: 4, title: "Review & Deploy", desc: "Launch Workspace" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Utility & Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface-variant/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[24px]">satellite_alt</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-lg tracking-tight text-on-surface">
                AgroVision
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] uppercase tracking-wider font-semibold">
                AI Pro
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">Aerospace & GIS Crop Telemetry Suite</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-on-surface-variant hidden sm:inline">Already registered?</span>
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors border border-surface-variant/40"
          >
            Sign In to Workstation
          </Link>
        </div>
      </header>

      {/* Page Title & Orientation */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">
          Create Your AgroVision AI Account
        </h1>
        <p className="text-sm text-on-surface-variant mt-2">
          Connect your agricultural land parcels to high-cadence Sentinel-2 multispectral passes and deploy autonomous crop stress monitoring.
        </p>
      </div>

      {/* Stepper Indicator */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
          {steps.map((s) => {
            const isCompleted = s.number < currentStep;
            const isCurrent = s.number === currentStep;
            return (
              <div
                key={s.number}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? "bg-primary-container text-on-primary border-primary shadow-sm"
                    : isCompleted
                    ? "bg-secondary-container/30 border-secondary/40 text-on-surface"
                    : "bg-surface-container-low border-surface-variant/40 text-on-surface-variant/60"
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span
                    className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                      isCurrent
                        ? "bg-secondary-fixed text-on-secondary-fixed"
                        : isCompleted
                        ? "bg-secondary text-white"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    {isCompleted ? "✓" : s.number}
                  </span>
                  <span className="font-headline font-semibold text-xs hidden sm:inline">
                    {s.title}
                  </span>
                </div>
                <p className="text-[10px] hidden sm:block truncate opacity-80">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        {/* Left Column: Form Card with Step Panels */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-variant/40 shadow-sm">
          <form onSubmit={handleNext}>
            {/* Step 1: Personal & Operator Credentials */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-surface-variant/30">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-bold text-lg text-on-surface">
                    Operator Credentials
                  </h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-on-surface block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-variant/40 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-on-surface block mb-1">
                      Role / Position
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-variant/40 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-on-surface block mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-variant/40 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-on-surface block mb-1">
                      Workstation Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-variant/40 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Farm & Parcel Geolocation */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-surface-variant/30">
                  <Building className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-bold text-lg text-on-surface">
                    Farm & Geolocation
                  </h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-on-surface block mb-1">
                      Farm Operation / Enterprise Name
                    </label>
                    <input
                      type="text"
                      name="farmName"
                      value={formData.farmName}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-variant/40 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-on-surface block mb-1">
                      Agricultural Basin / County
                    </label>
                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-variant/40 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-on-surface block mb-1">
                        Total Acreage (Ha)
                      </label>
                      <input
                        type="number"
                        name="totalAreaHa"
                        value={formData.totalAreaHa}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-variant/40 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-on-surface block mb-1">
                        Parcels Count
                      </label>
                      <input
                        type="number"
                        defaultValue="18"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-variant/40 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-on-surface block mb-1">
                      Primary Crops
                    </label>
                    <input
                      type="text"
                      name="primaryCrops"
                      value={formData.primaryCrops}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-variant/40 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Constellation & Sensors */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-surface-variant/30">
                  <Satellite className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-bold text-lg text-on-surface">
                    Constellation & Ground Sensors
                  </h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-on-surface block mb-1">
                      Primary Satellite Constellation
                    </label>
                    <select
                      name="constellation"
                      value={formData.constellation}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-variant/40 focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Sentinel-2B (10m Multispectral)">
                        Sentinel-2B (10m Multispectral - 5-day cadence)
                      </option>
                      <option value="Landsat-9 OLI-2 / TIRS-2">
                        Landsat-9 OLI-2 / TIRS-2 (Thermal & Multispectral)
                      </option>
                      <option value="PlanetScope SuperDove 3m">
                        PlanetScope SuperDove (3m Daily High-Frequency)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-on-surface block mb-1">
                      Ground IoT Probes & Telemetry
                    </label>
                    <input
                      type="text"
                      name="iotProbes"
                      value={formData.iotProbes}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-variant/40 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-variant/40 text-xs space-y-2">
                    <span className="font-bold text-on-surface block">Pre-Configured Sensors:</span>
                    <div className="flex items-center gap-2 text-secondary">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Root Zone Soil Moisture (30cm, 60cm, 90cm)</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Ambient Microclimate & NOAA Solar Irradiance</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Valve Flow & Sub-lateral Pressure Sensors</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Deploy */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-surface-variant/30">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <h3 className="font-headline font-bold text-lg text-on-surface">
                    Review & Deploy Workstation
                  </h3>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-variant/40 space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-surface-variant/30">
                    <span className="text-on-surface-variant">Lead Operator:</span>
                    <span className="font-semibold text-on-surface">{formData.fullName} ({formData.role})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-surface-variant/30">
                    <span className="text-on-surface-variant">Enterprise:</span>
                    <span className="font-semibold text-on-surface">{formData.farmName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-surface-variant/30">
                    <span className="text-on-surface-variant">Total Area:</span>
                    <span className="font-semibold text-on-surface">{formData.totalAreaHa} Hectares (18 Parcels)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-surface-variant/30">
                    <span className="text-on-surface-variant">Constellation:</span>
                    <span className="font-semibold text-secondary">{formData.constellation}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-on-surface-variant">Security & Compliance:</span>
                    <span className="font-semibold text-on-surface">ISO-14064 Ag-Data Verified</span>
                  </div>
                </div>

                <div className="p-3 bg-secondary-container/20 rounded-xl border border-secondary/30 text-xs text-on-surface-variant">
                  ✅ Your initial 10m multispectral satellite baseline has already been indexed from Sentinel-2B pass data.
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="mt-8 pt-4 border-t border-surface-variant/40 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div></div>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
              >
                <span>{currentStep === 4 ? "Launch Dashboard" : "Continue to Next Step"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Enterprise Onboarding HUD Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-surface-container-low border border-surface-variant/40 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Satellite className="w-4 h-4" />
                Live Telemetry Readiness
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                ORBIT READY
              </span>
            </div>

            {/* Mini preview map */}
            <div className="h-44 rounded-2xl overflow-hidden relative bg-slate-900 border border-surface-variant/40">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
                alt="Farm boundary preview"
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-2 left-2 text-[11px] text-white font-mono">
                Centroid: 41.203° N, -95.998° W
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span>Ground Pixel Resolution:</span>
                <span className="font-semibold text-on-surface">10m / pixel</span>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant">
                <span>Cloudless Threshold:</span>
                <span className="font-semibold text-secondary">&gt; 99% Cadence</span>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant">
                <span>Isolation Forest Anomaly Engine:</span>
                <span className="font-semibold text-on-surface">Pre-Trained v4.2</span>
              </div>
            </div>

            <div className="pt-3 border-t border-surface-variant/40 flex items-center gap-2 text-xs text-on-surface-variant">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>Full compliance with USDA, EU CAP & ISO-14064 Ag-Data standards.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

