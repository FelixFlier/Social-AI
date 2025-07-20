"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PostDetailModal = ({ post, open, onOpenChange }: { post: any, open: boolean, onOpenChange: (open: boolean) => void }) => {
    if (!post) return null;

    const hourlyData = Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        engagement: Math.floor(Math.random() * 1000)
    }))

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Post Performance Analysis</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold mb-4">Post Content</h3>
                        <img src={post.image} className="w-full rounded-lg mb-4" />
                        <p className="text-sm">{post.title}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Performance Metrics</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={hourlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hour" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="engagement" fill="#8b5cf6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PostDetailModal;
