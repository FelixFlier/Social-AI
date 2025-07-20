"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash, GripVertical } from "lucide-react"
import { motion, Reorder } from "framer-motion"
import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react"

interface UpcomingPost {
  id: string
  platform: 'instagram' | 'linkedin' | 'facebook' | 'twitter'
  content: string
  scheduledTime: Date
}

const platformIcons = {
  instagram: <Instagram className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  facebook: <Facebook className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
}

const platformColors = {
  instagram: "text-pink-500",
  linkedin: "text-blue-700",
  facebook: "text-blue-600",
  twitter: "text-sky-500",
}

const Countdown = ({ to }: { to: Date }) => {
  const [time, setTime] = useState(to.getTime() - Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(to.getTime() - Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [to])

  const hours = Math.floor(time / (1000 * 60 * 60))
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((time % (1000 * 60)) / 1000)

  return (
    <span className="font-mono text-sm">
      {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
    </span>
  )
}

const PostItem = ({ post, onEdit, onDelete }: { post: UpcomingPost, onEdit: (id: string) => void, onDelete: (id: string) => void }) => {
  const Icon = platformIcons[post.platform]
  const color = platformColors[post.platform]

  return (
    <Reorder.Item
      value={post}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex items-center gap-4 p-3 rounded-lg bg-background hover:bg-muted/50"
    >
      <GripVertical className="cursor-grab text-muted-foreground" />
      <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>{Icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium truncate">{post.content}</p>
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <Countdown to={post.scheduledTime} />
          <span>({post.scheduledTime.toLocaleDateString()})</span>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onEdit(post.id)}><Edit className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon" onClick={() => onDelete(post.id)}><Trash className="h-4 w-4" /></Button>
    </Reorder.Item>
  )
}


const UpcomingPostsPreview = ({ initialPosts }: { initialPosts: UpcomingPost[] }) => {
  const [posts, setPosts] = useState(initialPosts)

  const handleEdit = (id: string) => console.log("Edit post", id)
  const handleDelete = (id: string) => setPosts(posts.filter(p => p.id !== id))

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Upcoming Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <Reorder.Group axis="y" values={posts} onReorder={setPosts} className="space-y-2">
          {posts.slice(0, 5).map(post => (
            <PostItem key={post.id} post={post} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </Reorder.Group>
        {posts.length > 5 && (
            <Button variant="link" className="w-full mt-2">View all {posts.length} posts</Button>
        )}
      </CardContent>
    </Card>
  )
}

export default UpcomingPostsPreview
