"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Settings, Plus, CheckCircle, AlertCircle } from "lucide-react"

const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'active') {
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="h-3 w-3 mr-1" /> Active</Badge>
    }
    if (status === 'warning') {
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><AlertCircle className="h-3 w-3 mr-1" /> Warning</Badge>
    }
    return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" /> Disconnected</Badge>
}

const IntegrationCard = ({ platform }: { platform: any }) => {
    return (
        <Card className="glass-card">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${platform.color}`}>
                    <platform.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                    <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                    {platform.connected ? (
                        <div className="space-y-1">
                        <p className="text-sm text-gray-600">{platform.accountName}</p>
                        <p className="text-xs text-gray-500">{platform.followers} followers</p>
                        <p className="text-xs text-gray-500">Last sync: {platform.lastSync}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">Not connected</p>
                    )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <StatusBadge status={platform.status} />
                    {platform.connected ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Manage
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuItem>View Permissions</DropdownMenuItem>
                        <DropdownMenuItem>Sync Now</DropdownMenuItem>
                        <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                            Disconnect
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    ) : (
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Connect
                    </Button>
                    )}
                </div>
                </div>

                {platform.connected && (
                <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Permissions:</span>
                    <div className="flex gap-1">
                        {platform.permissions.map((permission: any) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                            {permission}
                        </Badge>
                        ))}
                    </div>
                    </div>
                </div>
                )}
            </CardContent>
        </Card>
    )
}

export default IntegrationCard;
