"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePWAInstall } from '@/hooks/use-pwa-install'
import { Button } from '@/components/ui/button'
import { Bot } from 'lucide-react'

const PWAInstallBanner = () => {
  const { isInstallable, handleInstall } = usePWAInstall()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (isInstallable) {
      setTimeout(() => setShowBanner(true), 3000) // Show after 3 seconds
    }
  }, [isInstallable])

  if (!showBanner || !isInstallable) return null

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-4 left-4 right-4 bg-white rounded-xl shadow-2xl border p-4 z-50 lg:hidden"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">Install SocialAI Pro</h3>
          <p className="text-sm text-gray-600">Get the full app experience</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setShowBanner(false)}>
            Later
          </Button>
          <Button size="sm" onClick={handleInstall}>
            Install
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default PWAInstallBanner;
