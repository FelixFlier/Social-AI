import * as React from 'react';
import { MoreHorizontal, Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    draft: { label: 'Draft', color: 'bg-gray-200 text-gray-800' },
    scheduled: { label: 'Scheduled', color: 'bg-blue-200 text-blue-800' },
    published: { label: 'Published', color: 'bg-green-200 text-green-800' },
  };

  const config = statusConfig[status] || statusConfig.draft;

  return (
    <Badge className={cn('text-xs', config.color)}>{config.label}</Badge>
  );
};

export const PostCard = ({ post, compact = false, onDragStart, onDragEnd, onClick }) => {
  const platformConfig = {
    instagram: { color: 'bg-pink-100 border-pink-200', icon: Instagram },
    linkedin: { color: 'bg-blue-100 border-blue-200', icon: Linkedin },
    facebook: { color: 'bg-blue-100 border-blue-300', icon: Facebook },
    twitter: { color: 'bg-gray-100 border-gray-200', icon: Twitter },
  };

  const config = platformConfig[post.platform];

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, post)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={cn(
        'rounded-lg border-2 border-dashed p-3 cursor-move transition-all hover:shadow-md',
        config.color,
        compact ? 'text-xs' : 'text-sm'
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <config.icon className="h-4 w-4" />
        <span className="font-medium truncate flex-1">
          {post.title || post.content.slice(0, 30) + '...'}
        </span>
        <Badge variant="outline" className="text-xs">
          {format(new Date(post.scheduledDate), 'HH:mm')}
        </Badge>
      </div>

      {!compact && (
        <div className="text-gray-600 text-xs line-clamp-2">
          {post.content}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <StatusBadge status={post.status} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit Post</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Change Time</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
