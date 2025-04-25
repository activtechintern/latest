import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Edit, Plus, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
  status?: string;
}

const Profile = () => {
  const { user, setUserMetadata } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.user_metadata?.full_name || "");
  const [bio, setBio] = useState(user?.user_metadata?.bio || "Student entrepreneur passionate about edtech solutions.");
  const [userIdeas, setUserIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserIdeas = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('ideas')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
            
          if (error) {
            throw error;
          }
          
          setUserIdeas(data || []);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching user ideas:', error);
          toast.error("Failed to fetch your ideas");
          setIsLoading(false);
        }
      }
    };

    fetchUserIdeas();
  }, [user]);

  const getStatusBadge = (status?: string) => {
    switch(status) {
      case "approved":
        return <Badge className="bg-emerald-500">Approved</Badge>;
      case "under-review":
        return <Badge variant="secondary">Under Review</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Draft</Badge>;
    }
  };

  const getInitials = () => {
    const fullName = user?.user_metadata?.full_name || 'User';
    return fullName
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.username || user?.email || 'User';

  const handleUpdateProfile = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: name,
          bio: bio
        }
      });

      if (error) throw error;

      if (data.user) {
        setUserMetadata(data.user.user_metadata);
        
        toast.success("Profile updated", {
          description: "Your profile has been updated successfully."
        });
        
        setIsEditing(false);
      }
    } catch (error: any) {
      toast.error("Update failed", {
        description: error.message || "There was a problem updating your profile."
      });
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:items-center">
              <Avatar className="h-24 w-24 mb-4 md:mb-0 md:mr-6">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`} />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
              <div>
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                      <Input 
                        id="name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="max-w-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <Textarea 
                        id="bio"
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)}
                        className="max-w-md"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold">{user?.user_metadata?.full_name || displayName}</h1>
                    <p className="text-gray-600">
                      {user?.email}
                    </p>
                    {user?.user_metadata?.bio && (
                      <p className="text-gray-700 mt-2">
                        {user.user_metadata.bio}
                      </p>
                    )}
                    <div className="flex gap-2 mt-3">
                      <Badge>New Member</Badge>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {isEditing ? (
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateProfile}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="mt-4 md:mt-0"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-4 h-4 mr-2" /> Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Ideas</CardTitle>
          <Button asChild size="sm">
            <Link to="/submit-idea">
              <Plus className="w-4 h-4 mr-1" /> New Idea
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-starthub-blue border-t-transparent"></div>
            </div>
          ) : userIdeas.length > 0 ? (
            <div className="space-y-4">
              {userIdeas.map((idea) => (
                <div key={idea.id} className="border rounded-lg p-4 hover:border-starthub-blue/40 hover:bg-blue-50/30 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/ideas/${idea.id}`} className="text-lg font-semibold hover:text-starthub-blue">
                        {idea.title}
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">{idea.description}</p>
                    </div>
                    <div>{getStatusBadge(idea.status)}</div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Badge variant="outline" className="mr-2">
                        {idea.category.charAt(0).toUpperCase() + idea.category.slice(1)}
                      </Badge>
                      <span>Submitted {new Date(idea.created_at).toLocaleDateString()}</span>
                    </div>
                    <Link to={`/ideas/${idea.id}`}>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600 mb-4">You haven't submitted any ideas yet</p>
              <Button asChild>
                <Link to="/submit-idea">
                  <Plus className="w-4 h-4 mr-2" /> Submit Your First Idea
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-600">No recent activity</p>
            <p className="text-sm text-gray-500 mt-2">Your activities will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
