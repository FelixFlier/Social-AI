"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface StrategyCardProps {
  title: string
  description: string
  onApply: () => void
}

export function StrategyCard({ title, description, onApply }: StrategyCardProps) {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <Button onClick={onApply} className="mt-4">Apply Strategy</Button>
      </CardContent>
    </Card>
  )
}
