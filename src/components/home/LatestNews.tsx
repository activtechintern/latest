
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const newsData = [
  {
    id: 1,
    title: "SGGS Student Startup Secures Seed Funding for AI Research",
    category: "SGGS Startup News",
    date: "2024-04-18",
    description: "A group of students from SGGS has raised seed funding for an AI research project...",
  
  },
  {
    id: 2,
    title: "SGGS Startup Weekend: Ideas Turn into Products",
    category: "SGGS Startup News",
    date: "2024-04-19",
    description: "SGGS hosts its annual startup weekend, where students bring ideas to life...",
   
  },
  {
    id: 3,
    title: "SGGS Innovation Lab Opens New Co-Working Space",
    category: "SGGS Campus News",
    date: "2024-04-20",
    description: "SGGS opens a new co-working space for student innovators and startups...",
  },
  {
    id: 4,
    title: "SGGS Startup Accelerator Program Kicks Off",
    category: "SGGS Startup News",
    date: "2024-04-21",
    description: "The SGGS Startup Accelerator Program begins with its first cohort...",
  
  }
];

export const LatestNews = () => {
  const navigate = useNavigate();
  
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-poppins">Latest News</h2>
        <a href="/news" className="text-starthub-blue font-medium text-sm hover:underline">
          View All
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsData.map((news) => (
          <Card key={news.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{news.category}</Badge>
                <span className="text-sm text-gray-500">{news.date}</span>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-bold text-lg mb-2">{news.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{news.description}</p>
              <Button 
                variant="link" 
                className="p-0 text-starthub-blue hover:text-starthub-mint"
                onClick={() => navigate("/news")}
              >
                Read More →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
