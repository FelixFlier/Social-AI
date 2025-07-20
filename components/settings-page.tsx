"use client"

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
} from "lucide-react"

const socialPlatforms = [
  {
    id: "facebook",
    name: "Facebook Business",
    icon: "📘",
    connected: true,
    accountName: "Your Business",
    lastSync: "2 min ago",
    color: "#1877f2",
  },
  {
    id: "instagram",
    name: "Instagram Creator",
    icon: "📸",
    connected: true,
    accountName: "@yourbrand",
    followers: "3.2K followers",
    lastSync: "5 min ago",
    color: "#E4405F",
  },
  {
    id: "linkedin",
    name: "LinkedIn Company",
    icon: "💼",
    connected: false,
    color: "#0077b5",
  },
  {
    id: "twitter",
    name: "Twitter/X Business",
    icon: "🐦",
    connected: true,
    accountName: "@yourbrand",
    lastSync: "1 min ago",
    color: "#000000",
  },
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
  const [activeTab, setActiveTab] = useState("integrations")
  const [brandVoice, setBrandVoice] = useState("professional")
  const [selectedStyles, setSelectedStyles] = useState(["educational"])
  const [postingFrequency, setPostingFrequency] = useState([14])
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const handleConnect = (platformId: string) => {
    setIsConnecting(platformId)
    setTimeout(() => {
      setIsConnecting(null)
      // Update connection status
      alert(`Connected to ${platformId}!`)
    }, 2000)
  }

  const handleStyleChange = (styleId: string, checked: boolean) => {
    if (checked) {
      setSelectedStyles([...selectedStyles, styleId])
    } else {
      setSelectedStyles(selectedStyles.filter((id) => id !== styleId))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account, integrations, and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-gray-50">
          <TabsTrigger value="integrations" className="data-[state=active]:bg-white">
            <Settings className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-white">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-white">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-white">
            <Key className="h-4 w-4 mr-2" />
            API
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-8">
          {/* Social Media Accounts */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Accounts</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {socialPlatforms.map((platform) => (
                <Card
                  key={platform.id}
                  className={`glass-card transition-all duration-200 hover:scale-105 ${
                    platform.connected ? "border-secondary-200" : "border-gray-200"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{platform.icon}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                            {platform.connected ? (
                              <div className="flex items-center gap-1 text-secondary-500 text-sm">
                                <CheckCircle className="h-3 w-3" />
                                <span>Connected</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <AlertCircle className="h-3 w-3" />
                                <span>Not Connected</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Account Info */}
                      {platform.connected && (
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-gray-600">Account: </span>
                            <span className="font-medium text-gray-900">{platform.accountName}</span>
                          </div>
                          {platform.followers && (
                            <div className="text-sm">
                              <span className="text-gray-600">Followers: </span>
                              <span className="font-medium text-gray-900">{platform.followers}</span>
                            </div>
                          )}
                          {platform.lastSync && (
                            <div className="text-sm text-gray-500">Last sync: {platform.lastSync}</div>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        {platform.connected ? (
                          <>
                            <Button size="sm" variant="outline" className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                              <Settings className="h-3 w-3 mr-1" />
                              Manage
                            </Button>
                            <Button size="sm" variant="outline" className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Refresh
                            </Button>
                            <Button size="sm" variant="outline" className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                              <BarChart3 className="h-3 w-3 mr-1" />
                              Insights
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            className="w-full text-white"
                            style={{ backgroundColor: platform.color }}
                            onClick={() => handleConnect(platform.id)}
                            disabled={isConnecting === platform.id}
                          >
                            {isConnecting === platform.id ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                                Connecting...
                              </>
                            ) : (
                              "🔗 Connect Account"
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Configuration */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                <Bot className="h-5 w-5 text-primary-500" />
                AI Assistant Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Brand Voice */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Brand Voice</Label>
                <Select value={brandVoice} onValueChange={setBrandVoice}>
                  <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-primary-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Content Style */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Content Style</Label>
                <div className="space-y-2">
                  {[
                    { id: "educational", label: "Educational" },
                    { id: "promotional", label: "Promotional" },
                    { id: "behind-scenes", label: "Behind-the-scenes" },
                  ].map((style) => (
                    <div key={style.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={style.id}
                        checked={selectedStyles.includes(style.id)}
                        onCheckedChange={(checked) => handleStyleChange(style.id, checked as boolean)}
                      />
                      <Label htmlFor={style.id} className="text-sm text-gray-700">
                        {style.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Posting Frequency */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Weekly Posting Target</Label>
                  <span className="text-sm font-semibold text-primary-500">{postingFrequency[0]} posts</span>
                </div>
                <Slider
                  value={postingFrequency}
                  onValueChange={setPostingFrequency}
                  max={35}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 post</span>
                  <span>35 posts</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Third-party Integrations */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">Advanced Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {thirdPartyServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-xl">{service.icon}</div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900">{service.name}</h4>
                          {service.connected ? (
                            <div className="flex items-center gap-1 text-secondary-500 text-xs">
                              <CheckCircle className="h-3 w-3" />
                              <span>Connected</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">Not connected</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-4">{service.description}</p>

                    <div className="flex gap-2">
                      {service.connected ? (
                        <Button size="sm" variant="outline" className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                          Manage
                        </Button>
                      ) : (
                        <Button size="sm" className="bg-primary-500 hover:bg-primary-600 text-white">
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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

        <TabsContent value="billing" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg border border-primary-200">
                <div>
                  <h3 className="font-semibold text-gray-900">Pro Plan</h3>
                  <p className="text-sm text-gray-600">$49/month • Billed monthly</p>
                </div>
                <Badge className="bg-secondary-50 text-secondary-600 border-secondary-200">Active</Badge>
              </div>
              <div className="mt-4">
                <Button className="bg-primary-500 hover:bg-primary-600 text-white">Upgrade Plan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">API Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      value="sk-1234567890abcdef..."
                      readOnly
                      className="bg-gray-50 border-gray-200 font-mono text-sm"
                    />
                    <Button variant="outline" className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                      Copy
                    </Button>
                  </div>
                </div>
                <Button className="bg-primary-500 hover:bg-primary-600 text-white">Generate New Key</Button>
              </div>
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
