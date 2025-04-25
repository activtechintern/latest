import { useState } from "react";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for ideas
const initialIdeasData = [
  {
    id: "1",
    title: "Campus Food Delivery App",
    description: "An app that allows students to order food from campus cafeterias and local restaurants, with delivery to dorms and study areas.",
    upvotes: 128,
    comments: 32,
    category: "Tech",
    tags: ["Mobile App", "Food", "Delivery"],
    author: { name: "Nishkant Chunkar", image: "https://i.pravatar.cc/150?img=1" },
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
    author: { name: "Mohit Kumar", image: "https://i.pravatar.cc/150?img=5" },
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
    author: { name: "Ritesh Yevatkar", image: "https://i.pravatar.cc/150?img=3" },
    createdAt: new Date(2024, 3, 18),
    isNew: true,
  },
  {
    id: "4",
    title: "Study Buddy Matching App",
    description: "An AI-powered app that matches students for study sessions based on courses, study habits, and availability.",
    upvotes: 76,
    comments: 15,
    category: "Education",
    tags: ["Study", "Matching", "AI"],
    author: { name: "Pratik Solakar", image: "https://i.pravatar.cc/150?img=4" },
    createdAt: new Date(2024, 3, 14),
  },
  {
    id: "5",
    title: "Student Marketplace Platform",
    description: "A secure platform for students to buy, sell, and exchange textbooks, furniture, electronics, and other items within the campus community.",
    upvotes: 112,
    comments: 27,
    category: "Business",
    tags: ["Marketplace", "Ecommerce", "Student Life"],
    author: { name: "Palash Smith", image: "https://i.pravatar.cc/150?img=6" },
    createdAt: new Date(2024, 3, 10),
    isHot: true,
  },
  {
    id: "6",
    title: "Research Collaboration Tool",
    description: "A platform connecting students and professors across departments for interdisciplinary research projects and paper collaborations.",
    upvotes: 68,
    comments: 12,
    category: "Education",
    tags: ["Research", "Collaboration", "Academic"],
    author: { name: "Rafael Moreno", image: "https://i.pravatar.cc/150?img=7" },
    createdAt: new Date(2024, 3, 12),
  },
];

// Additional ideas data for "Load More"
const additionalIdeasData = [
  {
    id: "7",
    title: "Student Housing Finder App",
    description: "An app that helps students find affordable housing near campus with roommate matching and virtual tours.",
    upvotes: 94,
    comments: 23,
    category: "Tech",
    tags: ["Housing", "Real Estate", "Student Life"],
    author: { name: "Olivia Jones", image: "https://i.pravatar.cc/150?img=20" },
    createdAt: new Date(2024, 3, 13),
    isNew: true,
  },
  {
    id: "8",
    title: "Campus Waste Reduction Program",
    description: "A comprehensive program to reduce single-use plastics on campus through reusable container systems and incentives.",
    upvotes: 67,
    comments: 15,
    category: "Environment",
    tags: ["Sustainability", "Zero Waste", "Campus Life"],
    author: { name: "Jordan Rivera", image: "https://i.pravatar.cc/150?img=21" },
    createdAt: new Date(2024, 3, 11),
  },
  {
    id: "9",
    title: "Skill Exchange Platform",
    description: "A platform where students can exchange skills and knowledge, teaching what they know and learning what they need.",
    upvotes: 82,
    comments: 19,
    category: "Education",
    tags: ["Skill Share", "Learning", "Community"],
    author: { name: "Taylor Williams", image: "https://i.pravatar.cc/150?img=22" },
    createdAt: new Date(2024, 3, 9),
    isTrending: true,
  },
  {
    id: "10",
    title: "Health Monitoring Wearable",
    description: "A wearable device designed specifically for students that monitors stress levels, sleep quality, and provides wellness recommendations.",
    upvotes: 71,
    comments: 14,
    category: "Health",
    tags: ["Wearable", "Health Tech", "Wellness"],
    author: { name: "Cameron Lee", image: "https://i.pravatar.cc/150?img=23" },
    createdAt: new Date(2024, 3, 7),
  },
];

const Ideas = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [loadedIdeas, setLoadedIdeas] = useState(initialIdeasData);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Filter ideas based on search query and category
  const filteredIdeas = loadedIdeas.filter((idea) => {
    const matchesSearch = 
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === "" || categoryFilter === "all" || idea.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Sort ideas based on selected criteria
  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    if (sortBy === "latest") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else if (sortBy === "popular") {
      return b.upvotes - a.upvotes;
    } else if (sortBy === "comments") {
      return b.comments - a.comments;
    }
    return 0;
  });

  const loadMoreIdeas = () => {
    // Simulate loading more ideas
    if (page === 1) {
      setLoadedIdeas([...loadedIdeas, ...additionalIdeasData]);
      setHasMore(false);
      setPage(2);
    } else {
      setHasMore(false);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setSortBy("latest");
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Startup Ideas</h1>
        <p className="text-gray-600">
          Browse and discover innovative startup ideas from students across campus.
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center bg-white rounded-full border px-4 py-2 flex-1 md:max-w-md">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search ideas..."
            className="bg-transparent border-none outline-none flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Tech">Tech</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Environment">Environment</SelectItem>
              <SelectItem value="Social">Social</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Most Upvotes</SelectItem>
              <SelectItem value="comments">Most Comments</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedIdeas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedIdeas.map((idea) => (
            <IdeaCard key={idea.id} {...idea} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold mb-2">No ideas found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
          <Button onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      )}
      
      {sortedIdeas.length > 0 && hasMore && (
        <div className="mt-8 text-center">
          <Button 
            onClick={loadMoreIdeas}
            className="bg-gradient-to-r from-starthub-blue to-starthub-mint text-white rounded-full py-6 px-8 font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            Load More Ideas
          </Button>
        </div>
      )}
    </>
  );
};

export default Ideas;
