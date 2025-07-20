"use client"

import type React from "react"

import { useState } from "react"
import { FloatingNavigation } from "@/components/floating-navigation"
import { MobileBottomNavigation } from "@/components/mobile-bottom-navigation"
import PWAInstallBanner from "@/components/pwa-install-banner"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
  }

  return (
    <>
      <FloatingNavigation activeItem={currentPage} onPageChange={handlePageChange} />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-24 md:pb-8 transition-all duration-300">
        <div className="page-transition">
          {currentPage === "dashboard" && <DashboardPage onPageChange={handlePageChange} />}
          {currentPage === "content" && <ContentCreationPage />}
          {currentPage === "analytics" && <AnalyticsPage />}
          {currentPage === "ai-strategy" && <AIStrategyPage />}
          {currentPage === "settings" && <SettingsPage />}
        </div>
      </main>
      <MobileBottomNavigation activeItem={currentPage} onPageChange={handlePageChange} />
      <PWAInstallBanner />
    </>
  )
}

// Import components
import { DashboardPage } from "@/components/dashboard-page"
import { ContentCreationPage } from "@/components/content-creation-page"
import { AnalyticsPage } from "@/components/analytics-page"
import { AIStrategyPage } from "@/components/ai-strategy-page"
import { SettingsPage } from "@/components/settings-page"
