
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

// Mock data for latest discussions
const discussions = [
  {
    id: "1",
    title: "Finding technical co-founders for fintech startup",
    category: "Team Building",
    author: { name: "Sarah Kalamm", image: "https://i.pravatar.cc/150?img=10" },
    replies: 24,
    views: 156,
    likes: 48,
    createdAt: new Date(2024, 3, 18),
    lastActive: new Date(2024, 3, 19),
    tags: ["fintech", "co-founders", "developers"]
  },
  {
    id: "2",
    title: "Best resources for learning startup legal basics?",
    category: "Resources",
    author: { name: "Deep Wankhade", image: "https://i.pravatar.cc/150?img=11" },
    replies: 17,
    views: 89,
    likes: 21,
    createdAt: new Date(2024, 3, 17),
    lastActive: new Date(2024, 3, 19),
    tags: ["legal", "resources", "incorporation"]
  },
  {
    id: "3",
    title: "Pitching to the university angel investors - tips?",
    category: "Funding",
    author: { name: "Priya Patel", image: "https://i.pravatar.cc/150?img=12" },
    replies: 31,
    views: 203,
    likes: 52,
    createdAt: new Date(2024, 3, 16),
    lastActive: new Date(2024, 3, 18),
    tags: ["pitching", "investors", "angel funding"]
  },
  {
    id: "4",
    title: "Remote internship opportunities for student startups",
    category: "Opportunities",
    author: { name: "Amit Lodhe", image: "https://i.pravatar.cc/150?img=13" },
    replies: 12,
    views: 78,
    likes: 19,
    createdAt: new Date(2024, 3, 15),
    lastActive: new Date(2024, 3, 17),
    tags: ["internships", "recruiting", "remote work"]
  },
];

export const LatestDiscussions = () => {
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    
    return Math.floor(seconds) + "s";
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-poppins">Latest Discussions</h2>
        <a href="/discussions" className="text-starthub-blue font-medium text-sm hover:underline">
          View All
        </a>
      </div>

      <Card>
        {discussions.map((discussion, index) => (
          <a key={discussion.id} href={`/discussions/${discussion.id}`}>
            <CardContent className={`flex items-start justify-between py-4 px-6 ${index !== 0 ? 'border-t' : ''}`}>
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={discussion.author.image} alt={discussion.author.name} />
                  <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-medium text-base mb-1">{discussion.title}</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <Badge variant="outline" className="rounded-full">
                      {discussion.category}
                    </Badge>
                    <span className="flex items-center">
                      <MessageSquare className="h-3.5 w-3.5 mr-1" />
                      {discussion.replies} replies
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 text-right">
                <div>Started {timeAgo(discussion.createdAt)}</div>
                <div className="font-medium text-starthub-blue">
                  Active {timeAgo(discussion.lastActive)}
                </div>
              </div>
            </CardContent>
          </a>
        ))}
      </Card>
    </section>
  );
};
