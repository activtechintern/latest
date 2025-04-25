
import { IdeaCard } from "@/components/ideas/IdeaCard";

// Mock data for trending ideas
const trendingIdeas = [
  {
    id: "1",
    title: "Campus Food Delivery App",
    description: "An app that allows students to order food from campus cafeterias and local restaurants, with delivery to dorms and study areas.",
    upvotes: 128,
    comments: 32,
    category: "Tech",
    tags: ["Mobile App", "Food", "Delivery"],
    author: { name: "Alex Johnson", image: "https://i.pravatar.cc/150?img=1" },
    createdAt: new Date(2024, 3, 15),
    isHot: true,
  },
  {
    id: "2",
    title: "Student Mental Health Platform",
    description: "A platform where students can access mental health resources, schedule counseling sessions, and join support groups anonymously.",
    upvotes: 95,
    comments: 18,
    category: "Health",
    tags: ["Mental Health", "Wellness", "Support"],
    author: { name: "Emma Davis", image: "https://i.pravatar.cc/150?img=5" },
    createdAt: new Date(2024, 3, 17),
    isTrending: true,
  },
  {
    id: "3",
    title: "Campus Sustainability Initiative",
    description: "A program to reduce campus waste by implementing smart recycling bins, composting programs, and a rewards system for eco-friendly behaviors.",
    upvotes: 87,
    comments: 24,
    category: "Environment",
    tags: ["Sustainability", "Green Campus", "Recycling"],
    author: { name: "Michael Chen", image: "https://i.pravatar.cc/150?img=3" },
    createdAt: new Date(2024, 3, 18),
    isNew: true,
  },
];

export const TrendingIdeas = () => {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-poppins">Trending Ideas</h2>
        <a href="/ideas" className="text-starthub-blue font-medium text-sm hover:underline">
          View All
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingIdeas.map((idea) => (
          <IdeaCard key={idea.id} {...idea} />
        ))}
      </div>
    </section>
  );
};
