import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
const newsData = [
  {
    id: 1,
    title: "SGGS Student Startup Secures Seed Funding for AI Research",
    category: "SGGS Startup News",
    date: "2024-04-18",
    description: "A group of students from SGGS has raised seed funding for an AI research project...",
    fullContent: `A student-led AI startup from SGGS has secured $500K in seed funding for their AI research platform. The startup focuses on improving predictive analytics for healthcare applications.

    The team, consisting of final-year computer science and biomedical students, will use the funds to:
    - Develop AI algorithms for early disease detection
    - Collaborate with local healthcare providers
    - Scale up their research and development team

    This funding marks a significant achievement for SGGS, showcasing the potential of student startups to solve real-world problems.`,
    author: "Aishwarya Deshmukh",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "SGGS Startup Weekend: Ideas Turn into Products",
    category: "SGGS Startup News",
    date: "2024-04-19",
    description: "SGGS hosts its annual startup weekend, where students bring ideas to life...",
    fullContent: `SGGS recently held its highly anticipated Startup Weekend event, where student entrepreneurs had just 54 hours to bring their startup ideas to life. Participants worked in teams to develop prototypes, get feedback, and present their ideas to a panel of investors.

    Highlights of the event included:
    - A mobile app for campus management
    - A sustainable packaging startup
    - An AI-driven career advice platform

    The event was a huge success, with several teams being offered mentorship and funding from local investors.`,
    author: "Rahul Jadhav",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "SGGS Innovation Lab Opens New Co-Working Space",
    category: "SGGS Campus News",
    date: "2024-04-20",
    description: "SGGS opens a new co-working space for student innovators and startups...",
    fullContent: `SGGS has launched a new co-working space within its Innovation Lab. The state-of-the-art facility is designed to provide students with a collaborative environment to develop their startup ideas.

    The new space features:
    - High-speed internet
    - Collaborative workstations
    - Access to prototyping and 3D printing equipment
    - Regular workshops and mentorship sessions

    The Innovation Lab aims to support SGGS students in their entrepreneurial journey by providing resources and a community of like-minded innovators.`,
    author: "Pooja Patil",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "SGGS Startup Accelerator Program Kicks Off",
    category: "SGGS Startup News",
    date: "2024-04-21",
    description: "The SGGS Startup Accelerator Program begins with its first cohort...",
    fullContent: `SGGS has officially launched its first-ever Startup Accelerator Program to help students and recent graduates transform their ideas into viable businesses. The program will provide mentorship, funding, and resources to the selected startups.

    The first cohort includes startups in fields such as:
    - Health tech
    - Edtech
    - Fintech
    - Clean energy

    The program’s goal is to nurture young entrepreneurs and foster a culture of innovation at SGGS.`,
    author: "Sandeep Shinde",
    readTime: "5 min read"
  },
  {
    id: 5,
    title: "SGGS Hosts National Innovation Conference",
    category: "SGGS Campus News",
    date: "2024-04-22",
    description: "SGGS hosts a major conference focused on innovation and entrepreneurship...",
    fullContent: `SGGS recently hosted the National Innovation Conference, which brought together entrepreneurs, innovators, and industry leaders from across India. The conference featured keynote speakers, panel discussions, and workshops on topics such as:
    - AI and machine learning in business
    - The future of sustainable technologies
    - Navigating the startup ecosystem

    The event was attended by over 500 participants and provided invaluable insights into the Indian startup ecosystem.`,
    author: "Shruti Desai",
    readTime: "4 min read"
  },
  {
    id: 6,
    title: "SGGS Students Win National Coding Championship",
    category: "SGGS Campus News",
    date: "2024-04-23",
    description: "A team of SGGS students has won the National Coding Championship...",
    fullContent: `A group of SGGS students recently clinched first place at the National Coding Championship, a prestigious event that brings together the best coders from across India.

    The team competed in multiple rounds of coding challenges, solving complex algorithmic problems in a limited time. Their victory highlights SGGS’s strong focus on fostering technical skills and innovation among its students.`,
    author: "Vishal Patil",
    readTime: "3 min read"
  },
  {
    id: 7,
    title: "SGGS Launches AI-Powered Career Portal",
    category: "SGGS Campus News",
    date: "2024-04-24",
    description: "SGGS has launched an AI-powered career portal to help students find job opportunities...",
    fullContent: `SGGS has unveiled a new AI-powered career portal designed to match students with job opportunities based on their skills and interests. The portal uses machine learning algorithms to analyze student profiles and recommend relevant job listings.

    Features of the portal include:
    - AI-based resume analysis
    - Personalized job recommendations
    - Internship and placement support
    - Career coaching sessions

    The portal aims to bridge the gap between students and the job market by providing tailored opportunities.`,
    author: "Sandeep Kulkarni",
    readTime: "4 min read"
  },
  {
    id: 8,
    title: "SGGS Students Develop Sustainable Packaging Solutions",
    category: "SGGS Startup News",
    date: "2024-04-25",
    description: "A team of SGGS students has developed an innovative sustainable packaging solution...",
    fullContent: `A group of SGGS students has developed a sustainable packaging solution made from biodegradable materials. The innovative packaging aims to replace single-use plastic in food packaging and reduce environmental impact.

    The students are currently seeking partnerships with local businesses to bring their solution to market. They are also exploring potential funding opportunities to scale their operations.`,
    author: "Madhuri More",
    readTime: "5 min read"
  },
  {
    id: 9,
    title: "SGGS Partners with Industry Leaders for Startup Mentorship",
    category: "SGGS Startup News",
    date: "2024-04-26",
    description: "SGGS has partnered with top industry leaders to provide mentorship to student startups...",
    fullContent: `SGGS has partnered with several leading industry figures to provide mentorship and resources to its student-run startups. The new initiative aims to connect students with entrepreneurs and experts who can guide them through the challenges of building a startup.

    The program will offer:
    - One-on-one mentoring sessions
    - Access to a network of investors
    - Expert-led workshops on startup growth and scaling

    The mentorship initiative is designed to help students turn their innovative ideas into successful businesses.`,
    author: "Akshay Gawande",
    readTime: "6 min read"
  },
  {
    id: 10,
    title: "SGGS Hosts Annual Tech Symposium with Focus on AI",
    category: "SGGS Campus News",
    date: "2024-04-27",
    description: "SGGS hosts its annual tech symposium, highlighting the latest trends in AI and machine learning...",
    fullContent: `SGGS’s annual tech symposium focused on artificial intelligence and its impact on various industries. The event featured workshops, demonstrations, and discussions on the latest AI trends and applications.

    Key topics included:
    - AI in healthcare
    - Machine learning in finance
    - AI-powered startups

    The event saw participation from industry leaders, researchers, and students, making it one of the most successful symposiums yet.`,
    author: "Snehal Jadhav",
    readTime: "5 min read"
  },
  {
    id: 11,
    title: "SGGS Student Startup Launches Mobile App for Campus Management",
    category: "SGGS Startup News",
    date: "2024-04-28",
    description: "A team of SGGS students has launched a mobile app designed to streamline campus management...",
    fullContent: `A group of SGGS students has successfully launched a mobile app that simplifies campus management tasks for both students and faculty. The app allows students to:
    - Track class schedules
    - Book campus facilities
    - View campus events
    - Access academic records

    The app is currently being tested in select departments, with plans to roll it out university-wide in the coming months.`,
    author: "Ravi Deshmukh",
    readTime: "4 min read"
  }
];


const News = () => {
  const [selectedNews, setSelectedNews] = useState<(typeof newsData)[0] | null>(null);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Startup News</h1>
        <p className="text-gray-600">
          Stay updated with the latest startup news and announcements
        </p>
      </div>

      <div className="space-y-6">
        {newsData.map((news) => (
          <Card 
            key={news.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedNews(news)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{news.category}</Badge>
                <span className="text-sm text-gray-500">{news.date}</span>
              </div>
              <CardTitle className="text-xl">{news.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{news.description}</p>
        
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>By {news.author}</span>
                <span>{news.readTime}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        {selectedNews && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-2">{selectedNews.title}</DialogTitle>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{selectedNews.category}</Badge>
                
                <span className="text-sm text-gray-500">{selectedNews.date}</span>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              <p className="whitespace-pre-line text-gray-600">{selectedNews.description}</p>
              
              <p className="text-gray-600 mb-4">{selectedNews.fullContent}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                <span>By {selectedNews.author}</span>
                <span>{selectedNews.readTime}</span>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default News;
