import { AnalyticsHeader } from "@/components/analytics-header"
import { MainAnalyticsChart } from "@/components/main-analytics-chart"
import { AIInsightsCard } from "@/components/ai-insights-card"
import { TopPerformingContent } from "@/components/top-performing-content"
import { AudienceInsights } from "@/components/audience-insights"
import { PlatformPerformance } from "@/components/platform-performance"
import { CompetitorAnalysis } from "@/components/competitor-analysis"
import { AnalyticsPage } from "@/components/analytics-page"

export default function AnalyticsPageRoute() {
  return (
    <AnalyticsPage>
      {/* Header Section */}
      <AnalyticsHeader />

      {/* Main Chart */}
      <MainAnalyticsChart />

      {/* Insights Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AIInsightsCard />
        <TopPerformingContent />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <AudienceInsights />
        <PlatformPerformance />
        <CompetitorAnalysis />
      </div>
    </AnalyticsPage>
  )
}
