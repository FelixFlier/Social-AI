"use client"

import { useState } from 'react'
import { useSettingsStore } from '@/lib/settings-store'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal } from "lucide-react"

const teamMembers = [
    { id: 1, name: "John Doe", email: "john@company.com", avatar: "/placeholder-user.jpg", role: "admin", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@company.com", avatar: "/placeholder-user.jpg", role: "editor", status: "active" },
    { id: 3, name: "Mike Johnson", email: "mike@company.com", avatar: "/placeholder-user.jpg", role: "viewer", status: "pending" },
]

const TeamManagement = () => {
    const { inviteTeamMember } = useSettingsStore()
    const [members, setMembers] = useState(teamMembers)

    const updateMemberRole = (id: number, role: string) => {
        setMembers(members.map(m => m.id === id ? { ...m, role } : m))
    }

    return (
        <Card className="glass-card">
            <CardHeader>
                <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Manage access and permissions for your team</CardDescription>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Invite Member
                </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {members.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                        <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                        {member.status}
                        </Badge>
                        <Select value={member.role} onValueChange={(role) => updateMemberRole(member.id, role)}>
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                        </Select>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                            Remove Member
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    </div>
                ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default TeamManagement;
