"use client"

import { useSettingsStore } from "@/lib/settings-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const billingHistory = [
    { id: 1, description: "Monthly Subscription", date: "July 1, 2024", amount: "149.00" },
    { id: 2, description: "Monthly Subscription", date: "June 1, 2024", amount: "149.00" },
    { id: 3, description: "Monthly Subscription", date: "May 1, 2024", amount: "149.00" },
]

const BillingTab = () => {
    const { currentPlan, usage } = useSettingsStore()

    return (
        <div className="space-y-6">
            <Card className="glass-card mb-6">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Professional Plan</h3>
                        <p className="text-gray-600">$149/month • Billed monthly</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">10</div>
                        <div className="text-sm text-gray-600">Accounts per platform</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">Unlimited</div>
                        <div className="text-sm text-gray-600">Posts per month</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">1,250</div>
                        <div className="text-sm text-gray-600">AI Credits remaining</div>
                    </div>
                    </div>

                    <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">Change Plan</Button>
                    <Button variant="outline" className="flex-1">Cancel Subscription</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card">
                    <CardHeader>
                    <CardTitle>This Month's Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-4">
                        <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>AI Credits</span>
                            <span>850/1,250</span>
                        </div>
                        <Progress value={68} className="h-2" />
                        </div>
                        <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Posts Published</span>
                            <span>47</span>
                        </div>
                        <Progress value={47} className="h-2" />
                        </div>
                        <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Team Members</span>
                            <span>3/10</span>
                        </div>
                        <Progress value={30} className="h-2" />
                        </div>
                    </div>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-3">
                        {billingHistory.map(bill => (
                        <div key={bill.id} className="flex items-center justify-between py-2">
                            <div>
                            <p className="font-medium">{bill.description}</p>
                            <p className="text-sm text-gray-500">{bill.date}</p>
                            </div>
                            <div className="text-right">
                            <p className="font-medium">${bill.amount}</p>
                            <Button variant="ghost" size="sm" className="h-auto p-0 text-primary">
                                Download
                            </Button>
                            </div>
                        </div>
                        ))}
                    </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default BillingTab;
