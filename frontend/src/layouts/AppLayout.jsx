import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Navbar />
      <div className="flex-1 flex w-full">
        <Sidebar />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

