
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    image?: string;
  };
  createdAt: Date;
  upvotes: number;
}

interface IdeaCommentsProps {
  comments: Comment[];
}

export const IdeaComments = ({ comments: initialComments }: IdeaCommentsProps) => {
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");
  const { toast } = useToast();

  const handleCommentSubmit = () => {
    if (!commentText.trim()) {
      toast({
        title: "Comment cannot be empty",
        description: "Please write something before posting a comment.",
        variant: "destructive",
      });
      return;
    }

    const newComment = {
      id: `${comments.length + 1}`,
      content: commentText,
      author: { name: "You", image: "https://i.pravatar.cc/150?img=10" },
      createdAt: new Date(),
      upvotes: 0,
    };

    setComments([newComment, ...comments]);
    setCommentText("");

    toast({
      title: "Comment posted!",
      description: "Your comment has been added to the discussion.",
    });
  };

  // Function to handle replies
  const handleReplyClick = () => {
    toast({
      title: "Reply feature",
      description: "Reply functionality would be implemented here in a production app.",
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold font-poppins mb-4">Comments</h2>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=10" alt="Your avatar" />
              <AvatarFallback>YA</AvatarFallback>
            </Avatar>
            <div className="font-medium">Add your comment</div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What are your thoughts on this idea?"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="focus-visible:ring-starthub-blue"
          />
        </CardContent>
        <CardFooter>
          <Button 
            className="bg-starthub-blue hover:bg-starthub-blue/90" 
            onClick={handleCommentSubmit}
          >
            Post Comment
          </Button>
        </CardFooter>
      </Card>
      
      {comments.map((comment) => (
        <Card key={comment.id} className="mb-4">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.author.image} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{comment.author.name}</div>
                  <div className="text-sm text-gray-500">{timeAgo(comment.createdAt)}</div>
                </div>
                <p className="mt-2">{comment.content}</p>
                <div className="flex items-center space-x-4 mt-3">
                  <Button variant="ghost" size="sm" className="text-gray-600 h-auto py-1">
                    <Heart className="h-4 w-4 mr-1" />
                    {comment.upvotes}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600 h-auto py-1"
                    onClick={handleReplyClick}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
