
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResourceCategories = [
  {
    title: "E-Books & PDFs",
    description: "Startup guides, business plans, and market research documents",
    icon: BookOpen,
    count: 24,
    path: "/resources/books",
  },
  {
    title: "Video Courses",
    description: "Curated entrepreneurship courses from Udemy and TedX talks",
    icon: Video,
    count: 12,
    path: "/resources/courses",
  }
];

const Resources = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Resource Library</h1>
        <p className="text-gray-600">
          Access curated resources to help build and grow your startup
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ResourceCategories.map((category) => (
          <Card 
            key={category.title} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(category.path)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <category.icon className="h-8 w-8 text-starthub-blue" />
                <span className="text-sm text-gray-500">{category.count} items</span>
              </div>
              <CardTitle className="mt-4">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{category.description}</p>
              <Button 
                variant="link" 
                className="mt-4 p-0 text-starthub-blue hover:text-starthub-mint"
                onClick={() => navigate(category.path)}
              >
                Browse Resources →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Resources;
