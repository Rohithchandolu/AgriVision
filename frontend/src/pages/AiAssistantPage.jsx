import React, { useState } from "react";
import { useAgronomyData } from "../hooks/useAgronomyData";
import { agroService } from "../services/agroService";
import {
  Bot,
  Send,
  Sparkles,
  Download,
  Share2,
  FileText,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Satellite,
  User,
  Printer
} from "lucide-react";

export default function AiAssistantPage() {
  const { farmData } = useAgronomyData();
  const [messages, setMessages] = useState(farmData.aiChatHistory);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      timestamp: "Just now",
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      const reply = await agroService.queryAssistant(text);
      setMessages((prev) => [...prev, reply]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleDownloadPdf = () => {
    setReportGenerated(true);
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm border border-surface-variant/40">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-container text-on-primary shadow-sm">
            <span className="material-symbols-outlined text-[28px]">psychology</span>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-secondary-fixed"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline font-bold text-xl text-on-surface">
                Gemini Agronomic Intelligence & Reporting
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono text-[10px] font-bold">
                v4.2 Grounded
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Synchronized with Sentinel-2B multispectral pass, NOAA micro-climates, & 18 farm IoT nodes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-semibold hover:bg-primary transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Gemini Agronomist Chat Interface */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl border border-surface-variant/40 shadow-sm flex flex-col h-[700px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 bg-surface-container-low border-b border-surface-variant/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-secondary-fixed" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-sm text-on-surface">
                  TerraSat Gemini Agronomist
                </h3>
                <span className="text-[10px] text-secondary font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Grounded in Sentinel-2B Reflectance
                </span>
              </div>
            </div>

            <span className="text-[10px] text-on-surface-variant font-mono">
              ESA Cop-Hub Sync OK
            </span>
          </div>

          {/* Chat Messages List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isAssistant = msg.sender === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <Bot className="w-4 h-4 text-secondary-fixed" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 shadow-sm ${
                      isAssistant
                        ? "bg-surface-container-low border border-surface-variant/40 text-on-surface"
                        : "bg-primary-container text-on-primary self-end"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 text-[10px] opacity-75 pb-1 border-b border-current/10">
                      <span className="font-semibold">
                        {isAssistant ? "AgroVision AI Agronomist" : "Sarah Jenkins"}
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Formatted Markdown-like Text Content */}
                    <div className="whitespace-pre-line font-normal space-y-1">
                      {msg.text}
                    </div>

                    {/* Badges if present */}
                    {msg.badges && msg.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {msg.badges.map((b) => (
                          <span
                            key={b}
                            className="px-2 py-0.5 rounded-md bg-secondary-fixed/20 text-on-secondary-fixed-variant text-[10px] font-semibold"
                          >
                            ✓ {b}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 shadow-sm mt-1 font-bold text-xs">
                      SJ
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 items-center text-xs text-on-surface-variant">
                <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                  <Bot className="w-4 h-4 text-secondary-fixed animate-spin" />
                </div>
                <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-variant/40">
                  <span className="font-semibold text-secondary">
                    Gemini synthesizing spectral telemetry & micro-climate models...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts Suggestions */}
          <div className="p-2.5 bg-surface-container-low/70 border-t border-surface-variant/40 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-bold uppercase text-on-surface-variant shrink-0 px-1">
              Prompts:
            </span>
            {farmData.samplePrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-lg bg-surface-container-lowest hover:bg-surface-container border border-surface-variant/40 text-[11px] text-on-surface whitespace-nowrap transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-surface-container-lowest border-t border-surface-variant/40 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Gemini about NDVI drops, irrigation prescriptions, or nutrient deficits..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-xs border border-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={isTyping || !inputText.trim()}
              className="p-2.5 rounded-xl bg-primary-container hover:bg-primary disabled:opacity-50 text-on-primary transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Compliance & Farm Health PDF Report Interface */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-variant/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-variant/30">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Executive Audit Document
              </span>
              <h3 className="font-headline font-bold text-base text-on-surface">
                Compliance & Farm Health Report
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
              READY TO PRINT
            </span>
          </div>

          {/* Document Preview Sheet */}
          <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant/50 space-y-4 text-xs font-sans">
            {/* Report Header */}
            <div className="flex items-center justify-between pb-3 border-b border-surface-variant/40">
              <div>
                <h4 className="font-headline font-bold text-sm text-on-surface">
                  AGRISAT PLANETARY HEALTH AUDIT
                </h4>
                <p className="text-[10px] text-on-surface-variant">
                  ISO-14064 Ag-Data Standards Certification
                </p>
              </div>
              <div className="text-right text-[10px] text-on-surface-variant">
                <span>Pass: Sentinel-2B</span>
                <span className="block font-mono">Date: Oct 31, 2026</span>
              </div>
            </div>

            {/* Farm Meta */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pb-3 border-b border-surface-variant/40">
              <div>
                <span className="text-on-surface-variant block">Enterprise:</span>
                <span className="font-semibold text-on-surface">Green Valley Agri-Corp</span>
              </div>
              <div>
                <span className="text-on-surface-variant block">Supervising Agronomist:</span>
                <span className="font-semibold text-on-surface">Sarah Jenkins</span>
              </div>
              <div>
                <span className="text-on-surface-variant block">Total Parcels Inspected:</span>
                <span className="font-semibold text-on-surface">18 Parcels (1,420 Ha)</span>
              </div>
              <div>
                <span className="text-on-surface-variant block">Mean NDVI Rating:</span>
                <span className="font-bold text-secondary">0.81 (Optimal Vigor)</span>
              </div>
            </div>

            {/* Executive Synthesis */}
            <div>
              <h5 className="font-bold text-xs text-on-surface mb-1">
                Executive Agronomic Summary
              </h5>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Overall agricultural biomass production is tracking <strong>+14.2% above the 5-year regional baseline</strong>. An acute hydric deficit detected on Field B-07 was mitigated via a queued 2.5-hour supplemental pulse irrigation, protecting an estimated <strong>$42,500 in harvest value</strong>.
              </p>
            </div>

            {/* Field Breakdown Table */}
            <div>
              <h5 className="font-bold text-xs text-on-surface mb-2">
                Audited Parcel Status
              </h5>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between p-1.5 rounded bg-surface-container-lowest">
                  <span>Field A-01 (Almonds - 180 Ha)</span>
                  <span className="font-mono font-bold text-secondary">NDVI 0.84 • Optimal</span>
                </div>
                <div className="flex justify-between p-1.5 rounded bg-surface-container-lowest">
                  <span>Field W-12 (Winter Wheat - 320 Ha)</span>
                  <span className="font-mono font-bold text-secondary">NDVI 0.79 • Vigorous</span>
                </div>
                <div className="flex justify-between p-1.5 rounded bg-surface-container-lowest">
                  <span>Field C-04 (Corn - 210 Ha)</span>
                  <span className="font-mono font-bold text-secondary">NDVI 0.82 • Optimal</span>
                </div>
                <div className="flex justify-between p-1.5 rounded bg-surface-container-lowest">
                  <span>Field B-07 (Almonds - 145 Ha)</span>
                  <span className="font-mono font-bold text-error">NDVI 0.58 • Stress Alert</span>
                </div>
                <div className="flex justify-between p-1.5 rounded bg-surface-container-lowest">
                  <span>Field S-03 (Canola - 325 Ha)</span>
                  <span className="font-mono font-bold text-secondary">NDVI 0.85 • Peak Vigor</span>
                </div>
              </div>
            </div>

            {/* Compliance Footer */}
            <div className="pt-2 border-t border-surface-variant/40 flex items-center justify-between text-[10px] text-on-surface-variant">
              <span>Checksum: ESA-SEN2B-9842F</span>
              <span>Auditor Signature: Verified</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownloadPdf}
              className="flex-1 py-3 px-4 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-semibold text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Print / Save PDF Report</span>
            </button>
            <button
              onClick={() => alert("Report shared with Green Valley Operations Team!")}
              className="py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs border border-surface-variant/40 transition-colors flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4 text-primary" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

