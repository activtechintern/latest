
import { Link } from "react-router-dom";
import { Heart, MessageSquare, Users, Share } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface IdeaCardProps {
  id: string;
  title: string;
  description: string;
  upvotes: number;
  comments: number;
  category: string;
  tags: string[];
  author: {
    name: string;
    image?: string;
  };
  createdAt: Date;
  isHot?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
}

export const IdeaCard = ({
  id,
  title,
  description,
  upvotes,
  comments,
  category,
  tags,
  author,
  createdAt,
  isHot,
  isNew,
  isTrending,
}: IdeaCardProps) => {
  const [likes, setLikes] = useState(upvotes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href
      });
    }
  };

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
  };

  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      "Tech": "bg-blue-100 text-blue-800",
      "Business": "bg-green-100 text-green-800",
      "Social": "bg-purple-100 text-purple-800",
      "Health": "bg-red-100 text-red-800",
      "Education": "bg-yellow-100 text-yellow-800",
      "Environment": "bg-emerald-100 text-emerald-800",
    };
    
    return categories[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden card-hover">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={author.image} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{author.name}</p>
              <p className="text-xs text-gray-500">{timeAgo(createdAt)}</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            {isHot && <Badge className="badge-hot">HOT🔥</Badge>}
            {isNew && <Badge className="badge-new">NEW✨</Badge>}
            {isTrending && <Badge className="badge-trending">TRENDING📈</Badge>}
          </div>
        </div>
        
        <Link to={`/ideas/${id}`} className="block">
          <h3 className="font-poppins font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        </Link>
        
        <div className="flex items-center space-x-2 mb-4">
          <Badge className={cn("rounded-full", getCategoryColor(category))}>
            {category}
          </Badge>
          
          {tags.slice(0, 2).map((tag, i) => (
            <Badge key={i} variant="outline" className="rounded-full">
              {tag}
            </Badge>
          ))}
          
          {tags.length > 2 && (
            <Badge variant="outline" className="rounded-full">
              +{tags.length - 2}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-gray-600 ${isLiked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <Heart className="h-4 w-4 mr-1" fill={isLiked ? "currentColor" : "none"} />
            {likes}
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-600">
            <MessageSquare className="h-4 w-4 mr-1" />
            {comments}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600"
            onClick={handleShare}
          >
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};
