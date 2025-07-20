"use client"

import BillingTab from "./billing-tab"
import TeamManagement from "./team-management"
import AISettings from "./ai-settings"
import IntegrationCard from "./integration-card"
import { useSettingsStore } from "@/lib/settings-store"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Settings,
  RefreshCw,
  BarChart3,
  AlertCircle,
  Bot,
  User,
  CreditCard,
  Key,
  Bell,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
} from "lucide-react"

const socialPlatforms = [
  {
    name: "Instagram Business",
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    connected: true,
    accountName: "@yourbusiness",
    followers: "12.4K",
    lastSync: "2 minutes ago",
    permissions: ["Post", "Stories", "Insights"],
    status: "active"
  },
  {
    name: "LinkedIn Company",
    icon: Linkedin,
    color: "bg-gradient-to-r from-blue-600 to-blue-700",
    connected: true,
    accountName: "Your Company",
    followers: "8.2K",
    lastSync: "5 minutes ago",
    permissions: ["Post", "Analytics"],
    status: "active"
  },
  {
    name: "Facebook Page",
    icon: Facebook,
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    connected: false,
    accountName: null,
    status: "disconnected"
  },
  {
    name: "Twitter/X Business",
    icon: Twitter,
    color: "bg-gradient-to-r from-black to-gray-800",
    connected: true,
    accountName: "@yourcompany",
    followers: "5.8K",
    lastSync: "1 hour ago",
    permissions: ["Tweet", "Analytics"],
    status: "warning" // API issues
  }
]

const thirdPartyServices = [
  {
    id: "shopify",
    name: "Shopify",
    icon: "🛍️",
    description: "Sync products and create promotional content",
    connected: true,
    color: "#96bf48",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    icon: "📧",
    description: "Integrate email campaigns with social posts",
    connected: false,
    color: "#ffe01b",
  },
  {
    id: "analytics",
    name: "Google Analytics",
    icon: "📊",
    description: "Track social media traffic and conversions",
    connected: true,
    color: "#4285f4",
  },
  {
    id: "zapier",
    name: "Zapier",
    icon: "⚡",
    description: "Automate workflows between 5000+ apps",
    connected: false,
    color: "#ff4a00",
  },
]

export function SettingsPage() {
  const {
    brandVoice,
    customInstructions,
    contentPreferences,
    updateBrandVoice,
    setCustomInstructions,
    setUseEmojis,
    setSuggestHashtags,
    setIncludeCTA,
  } = useSettingsStore()
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const handleConnect = (platformId: string) => {
    setIsConnecting(platformId)
    setTimeout(() => {
      setIsConnecting(null)
      // Update connection status
      alert(`Connected to ${platformId}!`)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account, integrations, and preferences</p>
      </div>

      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="ai">AI Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-8">
          {/* Social Media Accounts */}
          <div className="grid gap-6 md:grid-cols-2">
            {socialPlatforms.map((platform) => (
                <IntegrationCard key={platform.name} platform={platform} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="ai">
            <AISettings />
        </TabsContent>
        <TabsContent value="team">
            <TeamManagement />
        </TabsContent>
        <TabsContent value="billing">
            <BillingTab />
        </TabsContent>
        <TabsContent value="profile" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    defaultValue="John"
                    className="bg-gray-50 border-gray-200 focus:border-primary-500"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-700">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    defaultValue="Doe"
                    className="bg-gray-50 border-gray-200 focus:border-primary-500"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@company.com"
                  className="bg-gray-50 border-gray-200 focus:border-primary-500"
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-gray-700">
                  Company
                </Label>
                <Input
                  id="company"
                  defaultValue="Your Company"
                  className="bg-gray-50 border-gray-200 focus:border-primary-500"
                />
              </div>
              <Button className="bg-primary-500 hover:bg-primary-600 text-white">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: "email", label: "Email notifications", checked: true },
                { id: "push", label: "Push notifications", checked: true },
                { id: "weekly", label: "Weekly reports", checked: false },
                { id: "mentions", label: "Social media mentions", checked: true },
              ].map((notification) => (
                <div key={notification.id} className="flex items-center justify-between">
                  <Label htmlFor={notification.id} className="text-gray-700">
                    {notification.label}
                  </Label>
                  <Checkbox id={notification.id} defaultChecked={notification.checked} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
