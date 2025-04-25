
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, 
  DialogFooter
} from "@/components/ui/dialog";
import { Loader2, PaperclipIcon } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface JobApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: string;
    title: string;
    company: string;
  };
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
}

const JobApplicationForm = ({ isOpen, onClose, job }: JobApplicationFormProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      fullName: user?.user_metadata?.full_name || "",
      email: user?.email || "",
      phone: "",
      coverLetter: ""
    }
  });

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast.error("You must be logged in to apply for jobs");
      return;
    }

    setIsSubmitting(true);

    try {
      let resumeUrl = null;

      // Upload resume if provided
      if (resume) {
        const fileExt = resume.name.split('.').pop();
        const filePath = `${user.id}/${Math.random().toString(36).substring(2)}${fileExt ? `.${fileExt}` : ''}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('resumes')
          .upload(filePath, resume);

        if (uploadError) throw uploadError;
        resumeUrl = filePath;
      }

      // Save application to database
      const { error } = await supabase.from('job_applications').insert({
        job_id: job.id,
        user_id: user.id,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        cover_letter: data.coverLetter,
        resume_url: resumeUrl
      });

      if (error) throw error;

      toast.success("Application submitted successfully", {
        description: `Your application for ${job.title} at ${job.company} has been submitted.`
      });
      
      reset();
      setResume(null);
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application", {
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", { description: "Maximum file size is 5MB" });
        return;
      }
      setResume(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
          <DialogDescription>
            Submit your application for {job.title} at {job.company}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                {...register("phone")}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="resume">Resume (PDF, DOC, DOCX)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="resume"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById("resume")?.click()}
                  className="w-full justify-start"
                >
                  <PaperclipIcon className="mr-2 h-4 w-4" />
                  {resume ? resume.name : "Choose file"}
                </Button>
                {resume && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setResume(null)}
                    className="h-8 w-8 p-0"
                  >
                    <span className="sr-only">Remove</span>
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter (optional)</Label>
              <Textarea
                id="coverLetter"
                rows={5}
                placeholder="Tell us why you're a good fit for this position..."
                {...register("coverLetter")}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationForm;
