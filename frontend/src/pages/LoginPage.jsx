import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Satellite,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Cloud,
  Check
} from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("sarah.jenkins@greenvalleyagro.com");
  const [password, setPassword] = useState("SentinelAgronomy2025!");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleDemoSelect = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setAuthSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    }, 1000);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-center bg-surface min-h-[calc(100vh-4rem)]">
      <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col lg:flex-row bg-surface">
        {/* Left Column: Visual & Brand Storytelling */}
        <div className="relative w-full lg:w-[48%] flex flex-col justify-between p-8 lg:p-14 overflow-hidden rounded-3xl lg:rounded-r-none m-0 lg:m-4 shadow-xl">
          {/* Background Satellite Layer */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')`,
            }}
          ></div>

          {/* Atmospheric Deep Forest / Soil Gradient Layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container/90 via-primary/85 to-[#061e28]/95 backdrop-blur-[2px]"></div>

          {/* Subtly Textured Vector Grid Lines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          ></div>

          {/* Top Branding & Telemetry Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-surface-container-lowest/15 backdrop-blur-md flex items-center justify-center text-secondary-fixed shadow-md">
                <span className="material-symbols-outlined text-[24px]">satellite_alt</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-headline font-bold text-lg text-surface-container-lowest tracking-tight">
                    AgroVision
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed/20 text-secondary-fixed font-mono text-[11px] uppercase tracking-widest">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-surface-variant/80 tracking-wide uppercase font-medium">
                  Precision Planetary Agronomy
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
              <span className="text-xs text-surface-container-lowest font-medium">
                Orbit Live • Sentinel-2B
              </span>
            </div>
          </div>

          {/* Center Editorial Narrative */}
          <div className="relative z-10 my-10 lg:my-auto max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/30 backdrop-blur-md text-secondary-fixed text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Agricultural Intelligence</span>
            </div>

            <h1 className="font-headline text-3xl sm:text-5xl font-extrabold text-surface-container-lowest leading-tight tracking-tight mb-4">
              Welcome Back to <br className="hidden sm:inline" />
              <span className="text-secondary-fixed">Smarter Agriculture</span>
            </h1>

            <p className="text-base text-surface-variant/90 max-w-lg leading-relaxed">
              Access your personalized agricultural dashboard, monitor crop conditions, and discover intelligent geospatial insights across every parcel in real time.
            </p>

            {/* Floating Telemetry Glassmorphism Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-8">
              {/* Card 1 */}
              <div className="p-3.5 rounded-2xl bg-surface-container-lowest/15 backdrop-blur-md shadow-sm transition-all hover:bg-surface-container-lowest/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-surface-variant/80 font-bold">
                    Sentinel-2 Pass
                  </span>
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
                    radar
                  </span>
                </div>
                <div className="font-mono text-lg text-surface-container-lowest font-bold">
                  10m NDVI
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-secondary-fixed">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
                  <span>99.4% Cloudless</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-3.5 rounded-2xl bg-surface-container-lowest/15 backdrop-blur-md shadow-sm transition-all hover:bg-surface-container-lowest/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-surface-variant/80 font-bold">
                    Farm Telemetry
                  </span>
                  <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                    grid_view
                  </span>
                </div>
                <div className="font-mono text-lg text-surface-container-lowest font-bold">
                  1,420 Ha
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-surface-variant">
                  <span>18 parcels</span>
                  <span className="text-tertiary-fixed-dim font-bold">• 1 flag</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-3.5 rounded-2xl bg-surface-container-lowest/15 backdrop-blur-md shadow-sm transition-all hover:bg-surface-container-lowest/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-surface-variant/80 font-bold">
                    Agronomist AI
                  </span>
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
                    psychology
                  </span>
                </div>
                <div className="font-mono text-lg text-surface-container-lowest font-bold">
                  Gemini Grounded
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-secondary-fixed">
                  <span className="material-symbols-outlined text-[14px]">sync</span>
                  <span>Real-time Sync</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Micro-Telemetry Bar */}
          <div className="relative z-10 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-surface-variant/80">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                public
              </span>
              <span className="font-mono">EPSG:4326 GeoEngine Lat: 41.203° N Lon: -95.998° W</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-surface-container-lowest/10 font-mono text-[10px] text-surface-container-lowest">
                ESA Cop-HUB
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-lowest/10 font-mono text-[10px] text-surface-container-lowest">
                NASA HLS v2.0
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Dedicated Authentication Hub */}
        <div className="w-full lg:w-[52%] flex flex-col justify-center items-center px-6 py-10 lg:px-16 lg:py-12 bg-surface">
          <div className="w-full max-w-md flex flex-col">
            {/* Auth Card Top Header */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-surface-container text-primary shadow-sm mb-4">
                <span className="material-symbols-outlined text-[28px]">nature_people</span>
              </div>
              <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">
                Welcome Back
              </h2>
              <p className="text-sm text-on-surface-variant mt-1.5">
                Sign in to access your autonomous agricultural intelligence dashboard.
              </p>
            </div>

            {/* Demo Account Quick Selector */}
            <div className="p-3.5 rounded-2xl bg-surface-container-low mb-6 shadow-sm border border-surface-variant/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">badge</span>
                  Quick Demo Access
                </span>
                <span className="text-xs text-primary font-medium">Click to fill</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleDemoSelect("sarah.jenkins@greenvalleyagro.com", "SentinelAgronomy2025!")
                  }
                  className="flex flex-col text-left p-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high transition-colors shadow-sm border border-surface-variant/30"
                >
                  <span className="font-semibold text-xs text-on-surface truncate">
                    Sarah Jenkins
                  </span>
                  <span className="text-[10px] text-on-surface-variant truncate">
                    Lead Agronomist
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleDemoSelect("david.kim@agriprecisionlabs.io", "HarvestTelemetry#42")
                  }
                  className="flex flex-col text-left p-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high transition-colors shadow-sm border border-surface-variant/30"
                >
                  <span className="font-semibold text-xs text-on-surface truncate">
                    David Kim
                  </span>
                  <span className="text-[10px] text-on-surface-variant truncate">
                    Field Ops Lead
                  </span>
                </button>
              </div>
            </div>

            {/* Main Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email Input Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-on-surface flex items-center justify-between">
                  <span>Work Email Address</span>
                  <span className="text-secondary font-medium text-[11px]">Verified Domain</span>
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-5 h-5 absolute left-3.5 text-on-surface-variant pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah.jenkins@greenvalleyagro.com"
                    className="w-full pl-11 pr-10 py-3 rounded-xl bg-surface-container-lowest text-on-surface text-sm border border-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                  />
                  <CheckCircle className="w-4 h-4 absolute right-3.5 text-secondary" />
                </div>
              </div>

              {/* Password Input Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-on-surface">Password</label>
                  <a href="#forgot" className="text-xs text-secondary hover:text-primary transition-colors font-medium">
                    Forgot password?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-5 h-5 absolute left-3.5 text-on-surface-variant pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-surface-container-lowest text-on-surface text-sm border border-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-on-surface-variant hover:text-on-surface"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                  />
                  <span className="text-xs text-on-surface">Remember me on this workstation</span>
                </label>
                <span className="text-[11px] text-on-surface-variant">30-day session</span>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`mt-2 w-full py-3.5 px-6 rounded-xl text-on-primary font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-200 active:scale-[0.99] cursor-pointer ${
                  authSuccess
                    ? "bg-secondary"
                    : "bg-primary-container hover:bg-primary shadow-primary-container/20"
                }`}
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                    <span>Authenticating Geospatial Node...</span>
                  </>
                ) : authSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Session Verified • Opening Dashboard</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="w-full h-px bg-surface-variant/60"></div>
              <span className="absolute px-3 bg-surface text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                Or continue with
              </span>
            </div>

            {/* Enterprise Single Sign-On Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high border border-surface-variant/40 transition-colors shadow-sm text-xs text-on-surface font-medium"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google Workspace</span>
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high border border-surface-variant/40 transition-colors shadow-sm text-xs text-on-surface font-medium"
              >
                <Cloud className="w-4 h-4 text-secondary" />
                <span>AgriCloud SSO</span>
              </button>
            </div>

            {/* Registration Link */}
            <div className="text-center mb-6">
              <p className="text-xs text-on-surface-variant">
                Don't have an enterprise account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-secondary hover:text-primary transition-colors underline-offset-4 hover:underline ml-1"
                >
                  Create Account
                </Link>
              </p>
            </div>

            {/* Security & Compliance Badges */}
            <div className="pt-4 border-t border-surface-variant/40 flex items-center justify-center gap-2 text-[11px] text-on-surface-variant">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
              <span>ISO-14064 Ag-Data Verified</span>
              <span>•</span>
              <span>End-to-End Encrypted Telemetry</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

