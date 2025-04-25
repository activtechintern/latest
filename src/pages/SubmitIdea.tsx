
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Upload, X } from "lucide-react";

const categories = [
  { value: "tech", label: "Tech", emoji: "💻" },
  { value: "business", label: "Business", emoji: "💼" },
  { value: "health", label: "Health", emoji: "❤️" },
  { value: "education", label: "Education", emoji: "📚" },
  { value: "environment", label: "Environment", emoji: "🌱" },
  { value: "social", label: "Social", emoji: "🤝" },
];

const SubmitIdea = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    problem: "",
    solution: "",
    market: "",
    category: "",
    tags: "",
  });
  
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user) {
        toast.error("You must be logged in to submit an idea");
        return;
      }

      const { error } = await supabase.from('ideas').insert({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        user_id: user.id,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      });

      if (error) {
        throw error;
      }

      toast.success("Your startup idea has been submitted successfully.");
      
      navigate('/profile');
      
    } catch (error) {
      toast.error("Failed to submit idea", {
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Submit Your Startup Idea</h1>
        <p className="text-gray-600">
          Share your innovative concept with the campus community and find collaborators.
        </p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>New Startup Idea</CardTitle>
          <CardDescription>
            Fill out the form below to submit your startup idea. Be as detailed as possible to attract potential team members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Idea Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Give your startup idea a catchy name"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category *
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center">
                          <span className="mr-2">{category.emoji}</span>
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description *
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your startup idea in detail"
                  rows={5}
                  required
                />
              </div>

              <div>
                <label htmlFor="problem" className="block text-sm font-medium mb-1">
                  Problem Statement *
                </label>
                <Textarea
                  id="problem"
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  placeholder="What problem does your idea solve?"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label htmlFor="solution" className="block text-sm font-medium mb-1">
                  Solution *
                </label>
                <Textarea
                  id="solution"
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  placeholder="How does your idea solve the problem?"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label htmlFor="market" className="block text-sm font-medium mb-1">
                  Target Market
                </label>
                <Textarea
                  id="market"
                  name="market"
                  value={formData.market}
                  onChange={handleChange}
                  placeholder="Who is your target audience?"
                  rows={2}
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-1">
                  Tags
                </label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Add tags separated by commas (e.g. AI, Mobile, Sustainability)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Upload Image or Poster (Optional)
                </label>
                
                {image ? (
                  <div className="relative mb-4">
                    <img
                      src={image}
                      alt="Idea visual"
                      className="rounded-lg max-h-64 object-contain"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Click to upload an image or poster (PNG, JPG)
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Max size: 5MB</p>
                    </label>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-starthub-blue to-starthub-mint text-white w-full py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Idea"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default SubmitIdea;
