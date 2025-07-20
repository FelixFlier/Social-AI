"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import PostDetailModal from "./post-detail-modal"

const topPosts = [
    { id: 1, title: "How we built our AI-powered social media tool", type: "Article", image: "/placeholder.jpg", platform: "LinkedIn", date: "2024-07-20", reach: 12000, engagement: 15.2, ctr: 4.5 },
    { id: 2, title: "Behind the scenes: A day in the life of a startup", type: "Video", image: "/placeholder.jpg", platform: "Instagram", date: "2024-07-19", reach: 25000, engagement: 25.8, ctr: 8.2 },
    { id: 3, title: "5 tips for a successful product launch", type: "Carousel", image: "/placeholder.jpg", platform: "Facebook", date: "2024-07-18", reach: 8000, engagement: 10.5, ctr: 3.1 },
    { id: 4, title: "The future of social media marketing is here", type: "Infographic", image: "/placeholder.jpg", platform: "Twitter", date: "2024-07-17", reach: 5000, engagement: 8.9, ctr: 2.8 },
]

const ContentPerformanceTable = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("engagement")
    const [selectedPost, setSelectedPost] = useState<any>(null)

    const filteredPosts = topPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))

    const sortedPosts = filteredPosts.sort((a, b) => {
        if (sortBy === 'engagement') return b.engagement - a.engagement;
        if (sortBy === 'reach') return b.reach - a.reach;
        if (sortBy === 'clicks') return b.ctr - a.ctr;
        if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
        return 0;
    });

    return (
        <Card className="glass-card">
        <CardHeader>
            <div className="flex items-center justify-between">
            <CardTitle>Top Performing Content</CardTitle>
            <div className="flex items-center gap-2">
                <Input
                placeholder="Search posts..."
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="engagement">Engagement</SelectItem>
                        <SelectItem value="reach">Reach</SelectItem>
                        <SelectItem value="clicks">Clicks</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="rounded-md border">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Post</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reach</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>CTR</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {sortedPosts.map(post => (
                    <TableRow key={post.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                        <img src={post.image} className="w-10 h-10 rounded object-cover" />
                        <div>
                            <p className="font-medium truncate max-w-xs">{post.title}</p>
                            <p className="text-sm text-gray-500">{post.type}</p>
                        </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">
                        {post.platform}
                        </Badge>
                    </TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>{post.reach.toLocaleString()}</TableCell>
                    <TableCell className="text-green-600">{post.engagement}%</TableCell>
                    <TableCell>{post.ctr}%</TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setSelectedPost(post)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate Post</DropdownMenuItem>
                            <DropdownMenuItem>Download Report</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>
            <PostDetailModal post={selectedPost} open={!!selectedPost} onOpenChange={() => setSelectedPost(null)} />
        </CardContent>
        </Card>
    )
}

export default ContentPerformanceTable;
