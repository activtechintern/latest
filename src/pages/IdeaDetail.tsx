import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share, ArrowLeft } from "lucide-react";
import { IdeaDetailHeader } from "@/components/ideas/IdeaDetailHeader";
import { IdeaDetailContent } from "@/components/ideas/IdeaDetailContent";
import { IdeaTeamSection } from "@/components/ideas/IdeaTeamSection";
import { IdeaComments } from "@/components/ideas/IdeaComments";

// Mock idea data
const ideaData = {
  id: "1",
  title: "Campus Food Delivery App",
  description: `Our idea is to create a food delivery app specifically for our campus community. The app will allow students to:

1. Order food from campus cafeterias, avoiding long lines during peak hours
2. Pre-order meals for pickup at specific times
3. Get deliveries from local restaurants with special student discounts
4. Share group orders with roommates or study groups
5. Pay using student meal plans or other payment methods

The platform will create part-time delivery jobs for students and help local businesses reach the campus market. We'll implement a rating system, estimated delivery times, and real-time tracking.

Our revenue model includes taking a small percentage of each order and offering premium memberships with free delivery.`,
  problem: "Long cafeteria lines during peak hours waste valuable student time. Many students miss meals due to busy schedules. Local restaurants struggle to efficiently serve the campus community.",
  solution: "A dedicated food delivery platform tailored to campus needs, supporting both cafeterias and local restaurants while creating student employment opportunities.",
  market: "20,000+ students and faculty on campus, plus nearby local restaurants looking to expand their reach to students.",
  upvotes: 128,
  comments: 32,
  category: "Tech",
  tags: ["Mobile App", "Food", "Delivery", "Campus Life", "Student Jobs"],
  author: { name: "Alex Johnson", image: "https://i.pravatar.cc/150?img=1" },
  createdAt: new Date(2024, 3, 15),
  isHot: true,
  seeking: ["Mobile Developer", "UI/UX Designer", "Marketing Specialist"],
  teamMembers: [
    { name: "Alex Johnson", role: "Project Lead", image: "https://i.pravatar.cc/150?img=1" },
    { name: "Jamie Lee", role: "Business Development", image: "https://i.pravatar.cc/150?img=8" },
  ],
};

// Mock comments
const commentsData = [
  {
    id: "1",
    content: "This is a fantastic idea! I'd definitely use this service. Have you thought about partnering with the student union?",
    author: { name: "Sarah Miller", image: "https://i.pravatar.cc/150?img=9" },
    createdAt: new Date(2024, 3, 16),
    upvotes: 12,
  },
  {
    id: "2",
    content: "I work at the main cafeteria and we've actually been discussing something similar. Would love to connect and discuss potential collaboration.",
    author: { name: "James Wilson", image: "https://i.pravatar.cc/150?img=11" },
    createdAt: new Date(2024, 3, 17),
    upvotes: 8,
  },
  {
    id: "3",
    content: "Have you considered how you'll handle food temperature during delivery? That might be a challenge for certain menu items.",
    author: { name: "Emily Chen", image: "https://i.pravatar.cc/150?img=5" },
    createdAt: new Date(2024, 3, 18),
    upvotes: 4,
  },
];

const IdeaDetail = () => {
  const { id } = useParams();
  const [idea] = useState(ideaData);
  const [isUpvoted, setIsUpvoted] = useState(false);

  const handleUpvote = () => {
    setIsUpvoted(!isUpvoted);
  };

  return (
    <>
      <Link to="/ideas" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Ideas
      </Link>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <IdeaDetailHeader
            title={idea.title}
            author={idea.author}
            createdAt={idea.createdAt}
            category={idea.category}
            tags={idea.tags}
            isHot={idea.isHot}
          />
          
          <IdeaDetailContent
            description={idea.description}
            problem={idea.problem}
            solution={idea.solution}
            market={idea.market}
          />
          
          <IdeaTeamSection
            teamMembers={idea.teamMembers}
            seeking={idea.seeking}
          />
          
          <div className="flex items-center justify-between mt-8 border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-2 ${isUpvoted ? 'text-starthub-coral' : 'text-gray-600'}`}
                onClick={handleUpvote}
              >
                <Heart className="h-5 w-5" fill={isUpvoted ? "#FF6B81" : "none"} />
                <span>{isUpvoted ? idea.upvotes + 1 : idea.upvotes} Upvotes</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600">
                <MessageSquare className="h-5 w-5" />
                <span>{commentsData.length} Comments</span>
              </Button>
            </div>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>
      
      <IdeaComments comments={commentsData} />
    </>
  );
};

export default IdeaDetail;
