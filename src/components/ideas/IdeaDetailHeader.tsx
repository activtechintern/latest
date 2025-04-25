
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/utils";

interface IdeaDetailHeaderProps {
  title: string;
  author: {
    name: string;
    image?: string;
  };
  createdAt: Date;
  category: string;
  tags: string[];
  isHot?: boolean;
}

export const IdeaDetailHeader = ({
  title,
  author,
  createdAt,
  category,
  tags,
  isHot,
}: IdeaDetailHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.image} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author.name}</p>
            <p className="text-sm text-gray-500">Posted {timeAgo(createdAt)}</p>
          </div>
        </div>
        {isHot && <Badge className="badge-hot">HOT🔥</Badge>}
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-4">{title}</h1>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge className="bg-blue-100 text-blue-800">{category}</Badge>
        {tags.map((tag, i) => (
          <Badge key={i} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </>
  );
};
