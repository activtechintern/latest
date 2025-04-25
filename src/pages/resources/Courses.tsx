
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const coursesData = [
  {
    title: "Marketing MASTERCLASS for Startups and Leaders",
    instructor: "Nano Mardoyan",
    duration: "2h 30m",
    level: "Intermediate",
    description: "A comprehensive guide to creating effective marketing strategies for startups.",
    platform: "Udemy",
    link: "https://www.udemy.com/course/marketing-masterclass/"
  },
  {
    title: "Digital Marketing Masterclass: AI & Social Media Marketing",
    instructor: "Phil Ebiner, Diego Davila, and Video School",
    duration: "20h+",
    level: "All Levels",
    description: "Learn how to use dozens of proven digital marketing strategies, including AI and social media marketing.",
    platform: "Udemy",
    link: "https://www.udemy.com/course/digital-marketing-masterclass/"
  },
  {
    title: "The Single Biggest Reason Why Startups Succeed",
    instructor: "Bill Gross",
    duration: "6m 40s",
    level: "All Levels",
    description: "Insights into the key factors that determine startup success.",
    platform: "TED",
    link: "https://www.youtube.com/watch?v=bNpx7gpSqbY"
  },
  {
    title: "Financial Planning & Budgeting for Non-finance Professionals",
    instructor: "John Smith",
    duration: "3h 15m",
    level: "Advanced",
    description: "Master startup financial planning and modeling.",
    platform: "Udemy",
    link: "https://www.udemy.com/course/finance-for-entrepreneurs-and-business-founders/"
  },
  {
    title: "Financial Modeling for Startups",
    instructor: "Chris Benjamin",
    duration: "4h 30m",
    level: "Intermediate",
    description: "A practical, step-by-step guide to financial modeling for startups.",
    platform: "Udemy",
    link: "https://www.udemy.com/course/financial-modeling-for-startups/"
  },
  {
    title: "Financial Planning and Forecasting for Startups",
    instructor: "Jane Doe",
    duration: "16m 3s",
    level: "All Levels",
    description: "An overview of financial planning and forecasting tailored for startups.",
    platform: "YouTube",
    link: "https://www.youtube.com/watch?v=eeHU54JXqrE"
  },
  {
    title: "Become a Product Manager | Learn the Skills & Get the Job",
    instructor: "Cole Mercer & Evan Kimbrell",
    duration: "13h+",
    level: "Beginner to Intermediate",
    description: "The most complete course available on Product Management.",
    platform: "Udemy",
    link: "https://www.udemy.com/course/become-a-product-manager-learn-the-skills-get-a-job/"
  },
  {
    title: "New Product Development (NPD) - How the Big Brands Do It",
    instructor: "Dr. John Smith",
    duration: "2h 45m",
    level: "Intermediate",
    description: "Learn the fundamentals of New Product Development as applied in industry.",
    platform: "Udemy",
    link: "https://www.udemy.com/course/new-product-development-how-the-big-brands-do-it/"
  },
  {
    title: "The New Paradigms of Product Development",
    instructor: "Günther Schuh",
    duration: "15m 20s",
    level: "All Levels",
    description: "Insights into modern approaches to product development.",
    platform: "TEDx",
    link: "https://www.youtube.com/watch?v=ezYXI5eEMLU"
  },
  {
    title: "Startup India Learning Program",
    instructor: "Various Experts",
    duration: "10+ hours",
    level: "Beginner",
    description: "A free learning program by Startup India and UpGrad for aspiring entrepreneurs.",
    platform: "YouTube",
    link: "https://youtube.com/playlist?list=PL5q_lef6zVkaTY_cT1k7qFNF2TidHCe-1"
  },
  
  {
    title: "Startup Masterclass: The Ultimate Guide For Young Startups",
    instructor: "Leon Chaudhari",
    duration: "6h 30m",
    level: "All Levels",
    description: "Learn how to build a profitable startup, pitch to investors, and market your product globally.",
    platform: "Udemy",
    link: "https://www.udemy.com/course/startupmasterclass"
  },
  {
    title: "Entrepreneurship 101 - From Idea to Launch (And Beyond)",
    instructor: "Master It",
    duration: "3h 45m",
    level: "Beginner",
    description: "Discover how to uncover business ideas, conduct market research, and launch your business on a budget.",
    platform: "Udemy",
    link: "https://www.udemy.com/course/entrepreneurship-101-from-idea-to-launch-and-beyond"
  },
  {
    title: "MasterClass: Becoming a Successful Tech Startup Founder",
    instructor: "The Entrepreneurship MasterClass",
    duration: "5h 15m",
    level: "Intermediate",
    description: "Gain insights into startup ideation, product development, and securing funding for your tech startup.",
    platform: "Udemy",
    link: "https://www.udemy.com/course/masterclass-becoming-a-successful-tech-startup-founder"
  },
  {
    title: "Marketing MASTERCLASS for Startups and Leaders",
    instructor: "Chris Haroun",
    duration: "8h",
    level: "All Levels",
    description: "Master marketing strategies to grow your startup and lead your team effectively.",
    platform: "Udemy",
    link: "https://www.udemy.com/course/marketing-masterclass"
  },
  {
    title: "Finance for Startups",
    instructor: "KAIST (Coursera)",
    duration: "Approx. 8h (4 weeks)",
    level: "Intermediate",
    description: "Learn the fundamentals of startup finance, including budgeting, forecasting, and financial modeling.",
    platform: "Coursera",
    link: "https://www.coursera.org/learn/finance-for-startups"
  },
  {
    title: "An Essential Guide to Start-Up Success",
    instructor: "Various TED Speakers",
    duration: "Varies (Playlist)",
    level: "All Levels",
    description: "Insights into startup success covering adaptability, company culture, and business models.",
    platform: "TED",
    link: "https://www.ted.com/playlists/795/an_essential_guide_to_start_up_success"
  },
  {
    title: "Startup & Entrepreneurship YouTube Playlist",
    instructor: "Various",
    duration: "Varies",
    level: "Beginner to Advanced",
    description: "A complete video series for startup and entrepreneurship learning.",
    platform: "YouTube",
    link: "https://youtube.com/playlist?list=PL5q_lef6zVkaTY_cT1k7qFNF2TidHCe-1&si=7HJ0fejPv_f_XM__"
  }
];

const Courses = () => {
  return (
    <>
      <Link to="/resources" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Resources
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Video Courses</h1>
        <p className="text-gray-600">
          Learn from expert-curated video courses on entrepreneurship
        </p>
      </div>

      <div className="grid gap-6">
        {coursesData.map((course) => (
          <Card key={course.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Video className="h-8 w-8 text-starthub-blue" />
                <Badge>{course.platform}</Badge>
              </div>
              <CardTitle className="mt-4">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By {course.instructor}</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{course.level}</Badge>
                  <button onClick={() => window.open(course.link, "_blank")}>
        Watch Course
      </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Courses;
