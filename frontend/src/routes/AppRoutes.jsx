import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayout";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import DashboardPage from "../pages/DashboardPage";
import CropHealthPage from "../pages/CropHealthPage";
import GisMonitorPage from "../pages/GisMonitorPage";
import AgronomySuitePage from "../pages/AgronomySuitePage";
import AiAssistantPage from "../pages/AiAssistantPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages with PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Route>

      {/* Authenticated / Agronomy Workspace Pages with AppLayout (Sidebar + Navbar + Footer) */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/crop-health" element={<CropHealthPage />} />
        <Route path="/gis-monitor" element={<GisMonitorPage />} />
        <Route path="/ai-assistant" element={<AiAssistantPage />} />
        <Route path="/suite" element={<AgronomySuitePage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

