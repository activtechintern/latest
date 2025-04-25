
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building, Clock, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import JobApplicationForm from "@/components/jobs/JobApplicationForm";
import { useAuth } from "@/context/AuthContext";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  created_at: string;
}

const Jobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // For now, we'll use mock data until we create a jobs table in Supabase
        const mockJobs = [
          {
            id: "1",
            title: "Frontend Developer",
            company: "StartHub Ventures - Ritesh Yevatkar (2027 - IT)",
            location: "Remote",
            type: "Full-time",
            description: "Looking for a frontend developer experienced in React and TailwindCSS.",
            requirements: "2+ years of frontend development experience, React, JavaScript, CSS.",
            created_at: new Date().toISOString()
          },
          {
            id: "2",
            title: "Backend Developer",
            company: "CodeCrafters Ltd - Sneha Pawar (2026 - CSE)",
            location: "Hybrid",
            type: "Full-time",
            description: "Join our backend team to build scalable APIs and services.",
            requirements: "Node.js, Express, MongoDB, REST APIs.",
            created_at: new Date().toISOString()
          },
          {
            id: "3",
            title: "Data Analyst Intern",
            company: "MahaData Labs - Aman Kulkarni (2025 - MECH)",
            location: "On-site",
            type: "Internship",
            description: "Support our analytics team with data visualization and reports.",
            requirements: "Knowledge of Excel, SQL, and Power BI or Tableau.",
            created_at: new Date().toISOString()
          },
          {
            id: "4",
            title: "Mechanical Design Engineer",
            company: "AutoMech Solutions - Raj Deshmukh (2024 - MECH)",
            location: "On-site",
            type: "Full-time",
            description: "Mechanical engineer for design and simulation projects.",
            requirements: "Experience with SolidWorks, AutoCAD, Ansys.",
            created_at: new Date().toISOString()
          },
          {
            id: "5",
            title: "Civil Site Engineer",
            company: "StructBuild Infra - Pooja Patil (2023 - CIVIL)",
            location: "On-site",
            type: "Full-time",
            description: "Manage construction projects and site execution work.",
            requirements: "AutoCAD, site experience, project coordination.",
            created_at: new Date().toISOString()
          },
          {
            id: "6",
            title: "DevOps Engineer",
            company: "CloudNinja - Shubham More (2022 - IT)",
            location: "Remote",
            type: "Full-time",
            description: "Automate deployments and maintain cloud infrastructure.",
            requirements: "CI/CD, AWS, Docker, Kubernetes.",
            created_at: new Date().toISOString()
          },
          {
            id: "7",
            title: "Production Supervisor",
            company: "MahaTextiles Pvt Ltd - Priya Gaikwad (2021 - TEXT)",
            location: "On-site",
            type: "Full-time",
            description: "Oversee textile production and ensure quality control.",
            requirements: "Basic knowledge of textile manufacturing and safety.",
            created_at: new Date().toISOString()
          },
          {
            id: "8",
            title: "Electronics Design Intern",
            company: "ElectroSpark Systems - Nikhil Sawant (2020 - ELE)",
            location: "On-site",
            type: "Internship",
            description: "Internship for circuit and PCB design.",
            requirements: "Basic electronics, PCB tools like Eagle, Altium.",
            created_at: new Date().toISOString()
          },
          {
            id: "9",
            title: "Software Developer",
            company: "BinaryBits - Rucha Jadhav (2019 - CSE)",
            location: "Hybrid",
            type: "Full-time",
            description: "Full stack developer for web app development.",
            requirements: "MERN Stack (MongoDB, Express, React, Node.js).",
            created_at: new Date().toISOString()
          },
          {
            id: "10",
            title: "Instrumentation Engineer",
            company: "InstruTech India - Akash Shinde (2018 - INSTRU)",
            location: "On-site",
            type: "Full-time",
            description: "Control system engineer for manufacturing units.",
            requirements: "PLC, SCADA, automation knowledge.",
            created_at: new Date().toISOString()
          },
          {
            id: "11",
            title: "Chemical Process Engineer",
            company: "ChemLine Pvt Ltd - Meera Joshi (2017 - CHEM)",
            location: "On-site",
            type: "Full-time",
            description: "Work on chemical plant optimization and safety.",
            requirements: "Basic chemical engineering, safety standards.",
            created_at: new Date().toISOString()
          },
          {
            id: "12",
            title: "Graphic Designer Intern",
            company: "PixelBloom Studios - Neha Rane (2016 - EXTC)",
            location: "Remote",
            type: "Internship",
            description: "Design banners, social media posts, and branding.",
            requirements: "Photoshop, Illustrator, Canva.",
            created_at: new Date().toISOString()
          },
          {
            id: "13",
            title: "QA Engineer",
            company: "TestPro Systems - Sanket Naik (2015 - IT)",
            location: "Hybrid",
            type: "Full-time",
            description: "Responsible for writing test cases and bug tracking.",
            requirements: "Manual & automation testing experience, Selenium.",
            created_at: new Date().toISOString()
          },
          {
            id: "14",
            title: "Blockchain Developer",
            company: "BlockBase Labs - Swati Mhatre (2014 - CSE)",
            location: "Remote",
            type: "Full-time",
            description: "Work on smart contract development and dApps.",
            requirements: "Solidity, Ethereum, Web3.js.",
            created_at: new Date().toISOString()
          },
          {
            id: "15",
            title: "AI/ML Research Intern",
            company: "NeuroTech Labs - Tushar Zope (2025 - IT)",
            location: "Remote",
            type: "Internship",
            description: "Work on research-oriented projects in AI/ML domain.",
            requirements: "Python, scikit-learn, basic ML concepts.",
            created_at: new Date().toISOString()
          }
          
        ];
        
        setJobs(mockJobs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getBadgeVariant = (jobType: string) => {
    switch(jobType.toLowerCase()) {
      case "full-time":
        return <Badge className="bg-starthub-blue">Full-time</Badge>;
      case "part-time":
        return <Badge variant="secondary">Part-time</Badge>;
      case "internship":
        return <Badge className="bg-starthub-mint">Internship</Badge>;
      case "contract":
        return <Badge variant="outline">Contract</Badge>;
      default:
        return <Badge variant="outline">{jobType}</Badge>;
    }
  };

  const handleApplyClick = (job: Job) => {
    if (!user) {
      toast.error("Please sign in to apply for jobs", {
        description: "You need to be logged in to submit job applications."
      });
      return;
    }
    setSelectedJob(job);
    setIsApplicationFormOpen(true);
  };

  const handleSaveJob = (job: Job) => {
    // This would be implemented when we have a saved_jobs table
    toast.success("Job saved", {
      description: `${job.title} at ${job.company} has been saved to your profile.`
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Jobs Board</h1>
        <p className="text-gray-600">
          Find opportunities with startups and companies founded by SGGS alumni and partners.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-starthub-blue border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Building className="h-4 w-4 mr-1" />
                      <span className="mr-3">{job.company}</span>
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      {getBadgeVariant(job.type)}
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Requirements:</p>
                      <p className="text-sm text-gray-600">{job.requirements}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-max">
                    <Button onClick={() => handleApplyClick(job)}>Apply Now</Button>
                    <Button variant="outline" onClick={() => handleSaveJob(job)}>Save Job</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedJob && (
        <JobApplicationForm
          isOpen={isApplicationFormOpen}
          onClose={() => setIsApplicationFormOpen(false)}
          job={selectedJob}
        />
      )}
    </div>
  );
};

export default Jobs;
