
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      toast.success("Message sent!", {
        description: "We'll get back to you as soon as possible."
      });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-gray-700 mb-6">
            Have questions, feedback, or want to get involved with StartHub? We'd love to hear from you. 
            Fill out the form and we'll get back to you as soon as possible.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-starthub-blue mr-3" />
              <span>contact@starthub.example</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-starthub-blue mr-3" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-start">
  <MapPin className="h-5 w-5 text-starthub-blue mr-3 mt-1" />
  <span>
    Sarvaha Incubation, 3rd Floor<br />
    Admin Building, SGGS Nanded<br />
    431606
  </span>
</div>

          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Office Hours</h2>
            <p className="mb-2">Monday - Friday: 9am - 4pm</p>
            <p>Weekends: Closed</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nothing"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input 
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nothing@sggs.ac.in"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Question about StartHub"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <textarea 
                id="message"
                className="w-full min-h-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-starthub-blue"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-starthub-blue hover:bg-starthub-blue/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
