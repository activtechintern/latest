import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Search, Filter, PlusCircle, ThumbsUp, Eye } from "lucide-react";
import { timeAgo } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const discussionData = [
  {
    id: "1",
    title: "Finding technical co-founders for fintech startup",
    category: "Team Building",
    content: "I'm looking for talented developers interested in fintech to join my startup. We're building a platform that helps students manage their finances and build credit history. Anyone with experience in React, Node.js, or financial APIs like Plaid would be a perfect fit. We're planning to launch a beta next semester.",
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
    content: "I'm starting to formalize my business and need to understand the legal aspects of running a startup. What are some beginner-friendly resources that cover topics like incorporation, equity distribution, intellectual property, and basic contracts? I'm especially interested in resources specifically for student startups operating from university campuses.",
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
    content: "Our team has been invited to pitch to our university's angel investor network next month. This is our first real pitch to investors, and we want to make a great impression. Does anyone have experience pitching to university-affiliated investors? Any specific things they look for or common mistakes to avoid? We're a B2B SaaS startup focusing on sustainability management for small businesses.",
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
    content: "Has anyone had success finding remote interns for their startup? We're looking to bring on marketing and design interns for the summer, but we're struggling to find the right channels to recruit. Are there specific platforms that cater to students looking for startup experience? Also curious about how you've structured these internships - paid vs. unpaid, credit arrangements, etc.",
    author: { name: "Amit Lodhe", image: "https://i.pravatar.cc/150?img=13" },
    replies: 12,
    views: 78,
    likes: 19,
    createdAt: new Date(2024, 3, 15),
    lastActive: new Date(2024, 3, 17),
    tags: ["internships", "recruiting", "remote work"]
  },
  {
    id: "5",
    title: "How to validate product-market fit as a student?",
    category: "Strategy",
    content: "I'm working on an app for student organizations to manage their events and membership. I've done some initial interviews with club leaders at my university, but I want to make sure there's real product-market fit before investing more time in development. What are some effective ways to validate your idea when your initial market is limited to your campus? Has anyone successfully expanded from a single-campus solution to multiple universities?",
    author: { name: "Kajal Patil", image: "https://i.pravatar.cc/150?img=14" },
    replies: 19,
    views: 124,
    likes: 37,
    createdAt: new Date(2024, 3, 14),
    lastActive: new Date(2024, 3, 16),
    tags: ["validation", "product-market fit", "strategy"]
  },
  {
    id: "6",
    title: "Setting up a student-run venture fund",
    category: "Funding",
    content: "A group of us are trying to establish a student-run venture fund at our university to invest in student startups. Does anyone have experience with this? We're looking for advice on structure, fundraising from alumni, partnership with the university, and legal considerations. Any templates or case studies from other universities would be incredibly helpful!",
    author: { name: "Amira Chang", image: "https://i.pravatar.cc/150?img=15" },
    replies: 8,
    views: 67,
    likes: 24,
    createdAt: new Date(2024, 3, 13),
    lastActive: new Date(2024, 3, 15),
    tags: ["venture fund", "student investors", "university"]
  },{
    id: "7",
    title: "Looking for co-founder for agritech startup",
    category: "Team Building",
    content: "I'm a student from Nagpur working on an AI-based crop monitoring system to help small farmers reduce pesticide usage and increase yield. We’re using satellite and drone data for insights. I'm looking for a co-founder with experience in IoT or machine learning. If you're passionate about agri-tech and solving real problems in rural India, let’s connect and make this vision scalable!",
    author: { name: "Rohan Deshmukh", image: "https://i.pravatar.cc/150?img=20" },
    replies: 11,
    views: 83,
    likes: 22,
    createdAt: new Date(2024, 3, 18),
    lastActive: new Date(2024, 3, 19),
    tags: ["agritech", "co-founder", "machine learning"]
  },
  {
    id: "8",
    title: "Is MCA registration needed for student SaaS startups?",
    category: "Legal",
    content: "We’re a group of students from Pune building a SaaS tool for managing college fest logistics and campus clubs. We’re planning to start accepting payments and scale to other colleges. Should we register under MCA as a Pvt Ltd or go with LLP for now? What are the tax/legal risks if we delay incorporation?",
    author: { name: "Neha Kulkarni", image: "https://i.pravatar.cc/150?img=21" },
    replies: 14,
    views: 91,
    likes: 25,
    createdAt: new Date(2024, 3, 17),
    lastActive: new Date(2024, 3, 19),
    tags: ["startup", "legal", "student founders"]
  },
  {
    id: "9",
    title: "Best pitch deck templates for early-stage edtech?",
    category: "Funding",
    content: "We’re building an edtech platform for regional language learners in Maharashtra. Our focus is on competitive exams and career prep in Marathi. We're preparing our first pitch deck for a grant program. Any suggestions for deck templates or successful examples from Indian founders?",
    author: { name: "Tanaya Shinde", image: "https://i.pravatar.cc/150?img=22" },
    replies: 16,
    views: 102,
    likes: 30,
    createdAt: new Date(2024, 3, 16),
    lastActive: new Date(2024, 3, 18),
    tags: ["edtech", "pitch deck", "funding"]
  },
  {
    id: "10",
    title: "How to get initial users for a student fintech app?",
    category: "Strategy",
    content: "We're launching a finance tracker specifically for college students to track spending and learn about budgeting. We’ve built an MVP using React Native and Razorpay API. What’s the best way to get our first 100 users from Maharashtra campuses? Campus ambassadors? WhatsApp campaigns?",
    author: { name: "Akash Patil", image: "https://i.pravatar.cc/150?img=23" },
    replies: 13,
    views: 88,
    likes: 19,
    createdAt: new Date(2024, 3, 16),
    lastActive: new Date(2024, 3, 18),
    tags: ["fintech", "user growth", "strategy"]
  },
  {
    id: "11",
    title: "Need UI/UX feedback on mental health app for students",
    category: "Feedback",
    content: "I’m building a mobile app for peer-to-peer emotional support in colleges. We’ve launched a closed beta in two Mumbai colleges. Can anyone help review our current UI flow or suggest best practices for keeping users engaged in mental health apps?",
    author: { name: "Sneha Nair", image: "https://i.pravatar.cc/150?img=24" },
    replies: 9,
    views: 72,
    likes: 17,
    createdAt: new Date(2024, 3, 15),
    lastActive: new Date(2024, 3, 17),
    tags: ["mental health", "UI/UX", "student apps"]
  },
  {
    id: "12",
    title: "How to structure equity between student co-founders?",
    category: "Legal",
    content: "We are three co-founders from different colleges in Maharashtra working on a B2B logistics SaaS product. We haven’t registered yet but want clarity on how to split equity fairly. Any real examples or tools that helped you decide? Should we give vesting agreements this early?",
    author: { name: "Harshad Joshi", image: "https://i.pravatar.cc/150?img=25" },
    replies: 21,
    views: 108,
    likes: 31,
    createdAt: new Date(2024, 3, 15),
    lastActive: new Date(2024, 3, 17),
    tags: ["equity", "founders", "legal"]
  },
  {
    id: "13",
    title: "Hiring app dev interns for social impact startup",
    category: "Opportunities",
    content: "We’re running a startup from Nashik focused on water conservation using IoT-based systems. We need app development interns to help build our field data collection app. Any suggestions for where to post this? We’re open to remote interns with basic React Native knowledge.",
    author: { name: "Isha Pawar", image: "https://i.pravatar.cc/150?img=26" },
    replies: 7,
    views: 61,
    likes: 13,
    createdAt: new Date(2024, 3, 14),
    lastActive: new Date(2024, 3, 16),
    tags: ["internships", "app dev", "social impact"]
  },
  {
    id: "14",
    title: "Affordable branding resources for student founders?",
    category: "Resources",
    content: "Does anyone know affordable freelancers or student designers who can help with branding (logo, colors, fonts)? We’re building a home-cooked food delivery platform in Solapur and want a friendly, local look. Don’t have budget for agencies right now.",
    author: { name: "Vaibhavi More", image: "https://i.pravatar.cc/150?img=27" },
    replies: 10,
    views: 66,
    likes: 16,
    createdAt: new Date(2024, 3, 14),
    lastActive: new Date(2024, 3, 16),
    tags: ["branding", "design", "resources"]
  },
  {
    id: "15",
    title: "Seeking mentors for early-stage cleantech idea",
    category: "Mentorship",
    content: "We’re a team from Kolhapur working on a low-cost air quality monitoring device using open-source tech. We need help with GTM strategy and partnerships with civic bodies. Any mentors here who’ve worked with cleantech or govt collaborations?",
    author: { name: "Omkar Salunkhe", image: "https://i.pravatar.cc/150?img=28" },
    replies: 6,
    views: 59,
    likes: 18,
    createdAt: new Date(2024, 3, 13),
    lastActive: new Date(2024, 3, 15),
    tags: ["cleantech", "mentorship", "strategy"]
  },
  {
    id: "16",
    title: "What to include in a student startup media kit?",
    category: "Resources",
    content: "We're prepping for a student startup expo in Mumbai and want to build a press/media kit. What should we include – one-pager, product screenshots, founder bios? Any templates you’ve used that worked well during college expos or demo days?",
    author: { name: "Ananya Khedekar", image: "https://i.pravatar.cc/150?img=29" },
    replies: 8,
    views: 62,
    likes: 14,
    createdAt: new Date(2024, 3, 12),
    lastActive: new Date(2024, 3, 14),
    tags: ["media kit", "student startup", "expo"]
  }
  
];

const Discussions = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState<typeof discussionData[0] | null>(null);
  const [replyText, setReplyText] = useState("");
  const { toast } = useToast();
  
  const handleReplySubmit = () => {
    if (!replyText.trim()) {
      toast({
        title: "Reply cannot be empty",
        description: "Please write something before posting a reply.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would post this to the backend
    toast({
      title: "Reply posted!",
      description: "Your reply has been added to the discussion.",
    });

    // Clear the reply text
    setReplyText("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Discussions</h1>
          <p className="text-muted-foreground">Connect and share with the StartHub community</p>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Discussion
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Discussion</DialogTitle>
                <DialogDescription>
                  Start a new conversation with the StartHub community
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Enter a descriptive title..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full h-10 px-3 py-2 border rounded-md">
                    <option>Team Building</option>
                    <option>Funding</option>
                    <option>Resources</option>
                    <option>Strategy</option>
                    <option>Opportunities</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <textarea 
                    className="w-full min-h-32 p-3 border rounded-md"
                    placeholder="Describe your question or topic in detail..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags (comma separated)</label>
                  <Input placeholder="e.g. funding, advice, technical" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">Cancel</Button>
                <Button>Post Discussion</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="all">All Discussions</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 pt-4">
          {discussionData.map((discussion) => (
            <Card key={discussion.id} className="transition-all hover:border-starthub-blue/40 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={discussion.author.image} alt={discussion.author.name} />
                      <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{discussion.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="bg-blue-50">
                          {discussion.category}
                        </Badge>
                        {discussion.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-600 line-clamp-2">{discussion.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-3">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {discussion.replies}
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {discussion.views}
                  </span>
                  <span className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {discussion.likes}
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedDiscussion(discussion)}
                      className="text-starthub-blue"
                    >
                      View Discussion
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    {selectedDiscussion && (
                      <>
                        <DialogHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar>
                              <AvatarImage 
                                src={selectedDiscussion.author.image} 
                                alt={selectedDiscussion.author.name} 
                              />
                              <AvatarFallback>
                                {selectedDiscussion.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm">{selectedDiscussion.author.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Posted {timeAgo(selectedDiscussion.createdAt)}
                              </p>
                            </div>
                          </div>
                          <DialogTitle className="text-xl mb-1">{selectedDiscussion.title}</DialogTitle>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="bg-blue-50">
                              {selectedDiscussion.category}
                            </Badge>
                            {selectedDiscussion.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </DialogHeader>
                        <div className="my-4">
                          <p className="whitespace-pre-line">{selectedDiscussion.content}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-b py-3 my-4">
                          <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              Like ({selectedDiscussion.likes})
                            </Button>
                            <span className="flex items-center text-sm text-muted-foreground">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {selectedDiscussion.replies} replies
                            </span>
                            <span className="flex items-center text-sm text-muted-foreground">
                              <Eye className="h-4 w-4 mr-1" />
                              {selectedDiscussion.views} views
                            </span>
                          </div>
                          <Button size="sm">Reply</Button>
                        </div>
                        <div className="space-y-4">
                          <h3 className="font-medium">Replies</h3>
                          <div className="border rounded-lg p-4 bg-gray-50">
                            <p className="text-center text-sm text-muted-foreground py-8">
                              This is a demo - replies aren't stored but the form now works
                            </p>
                          </div>
                          <div className="pt-4">
                            <textarea
                              className="w-full min-h-24 p-3 border rounded-md"
                              placeholder="Write your reply..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <div className="flex justify-end mt-2">
                              <Button onClick={handleReplySubmit}>Post Reply</Button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
                <div className="text-xs text-right text-muted-foreground">
                  Active {timeAgo(discussion.lastActive)}
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="popular" className="pt-4">
          <p className="text-center py-12 text-muted-foreground">
            Popular discussions will appear here
          </p>
        </TabsContent>
        <TabsContent value="recent" className="pt-4">
          <p className="text-center py-12 text-muted-foreground">
            Recent discussions will appear here
          </p>
        </TabsContent>
        <TabsContent value="unanswered" className="pt-4">
          <p className="text-center py-12 text-muted-foreground">
            Unanswered discussions will appear here
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Discussions;
