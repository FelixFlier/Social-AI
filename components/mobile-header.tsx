"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Menu, Search, Bell, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MobileHeaderProps {
  onMenuToggle?: () => void
}

export function MobileHeader({ onMenuToggle }: MobileHeaderProps) {
  const [searchExpanded, setSearchExpanded] = useState(false)

  return (
    <div className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border/50 md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left - Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-lg">
                🤖
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">SocialAI Pro</span>
                <span className="text-xs text-muted-foreground">AI-Powered Social Media</span>
              </div>
            </div>
            {/* Navigation items would go here */}
          </SheetContent>
        </Sheet>

        {/* Center - Logo or Search */}
        <div className="flex-1 flex justify-center">
          {searchExpanded ? (
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Input
                placeholder="Search..."
                className="bg-muted/30 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                autoFocus
              />
              <Button variant="ghost" size="icon" onClick={() => setSearchExpanded(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold text-foreground">SocialAI Pro</div>
            </div>
          )}
        </div>

        {/* Right - Actions */}
        {!searchExpanded && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setSearchExpanded(true)}>
              <Search className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>

            <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
              <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-semibold">
                JD
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
