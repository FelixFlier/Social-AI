"use client"

import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Card } from './ui/card'

const PostCard = ({ post }: { post: any }) => {
    return (
        <Card className="p-4 mb-4">
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.content}</p>
        </Card>
    )
}

const VirtualizedPostList = ({ posts }: { posts: any[] }) => {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // Estimated post height
    overscan: 5
  })

  return (
    <div ref={parentRef} className="h-96 overflow-auto">
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`
            }}
          >
            <PostCard post={posts[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default VirtualizedPostList;
