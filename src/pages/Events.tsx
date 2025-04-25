
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const eventsData = [
  {
    id: "1",
    title: "Campus Pitch Day",
    date: "2024-05-01",
    time: "2:00 PM - 5:00 PM",
    location: "Main Auditorium",
    description: "Present your startup idea to investors and mentors.",
  },
  {
    id: "2",
    title: "Startup Weekend",
    date: "2024-05-15",
    time: "9:00 AM - 6:00 PM",
    location: "Innovation Hub",
    description: "48-hour startup building challenge with mentorship.",
  },
  {
    id: "3",
    title: "Mentor Connect",
    date: "2024-05-20",
    time: "3:00 PM - 6:00 PM",
    location: "Virtual Event",
    description: "Network with industry mentors and get guidance.",
  },
  {
    id: "4",
    title: "E-Cell Ideathon",
    date: "2024-06-05",
    time: "10:00 AM - 4:00 PM",
    location: "E-Cell Campus",
    description: "A 24-hour brainstorming and idea generation event for budding entrepreneurs.",
  },
  {
    id: "5",
    title: "Startup Bootcamp",
    date: "2024-06-10",
    time: "9:00 AM - 5:00 PM",
    location: "E-Cell Innovation Center",
    description: "An intensive 3-day bootcamp to help you accelerate your startup journey.",
  },
  {
    id: "6",
    title: "Pitch Perfect",
    date: "2024-06-15",
    time: "12:00 PM - 3:00 PM",
    location: "SGGS E-Cell",
    description: "Pitch your business idea to a panel of investors and receive feedback.",
  },
  {
    id: "7",
    title: "Startup Networking Night",
    date: "2024-06-18",
    time: "7:00 PM - 9:00 PM",
    location: "E-Cell Lounge",
    description: "A casual networking event for students, entrepreneurs, and industry professionals.",
  },
  {
    id: "8",
    title: "Entrepreneurship Talk Series",
    date: "2024-07-01",
    time: "11:00 AM - 1:00 PM",
    location: "SGGS Auditorium",
    description: "A series of talks featuring successful entrepreneurs sharing their journeys and lessons learned.",
  },
  {
    id: "9",
    title: "Venture Capital Panel Discussion",
    date: "2024-07-10",
    time: "2:00 PM - 4:00 PM",
    location: "Virtual Event",
    description: "A discussion with venture capitalists on securing funding for your startup.",
  },
  {
    id: "10",
    title: "Women in Entrepreneurship Summit",
    date: "2024-07-15",
    time: "9:00 AM - 12:00 PM",
    location: "SGGS E-Cell",
    description: "A summit highlighting the achievements and challenges of women entrepreneurs.",
  },
  {
    id: "11",
    title: "Startup Showcase",
    date: "2024-07-25",
    time: "10:00 AM - 5:00 PM",
    location: "Innovation Hub",
    description: "Showcase your startup to potential investors, partners, and customers.",
  },
  {
    id: "12",
    title: "Social Entrepreneurship Workshop",
    date: "2024-08-05",
    time: "10:00 AM - 2:00 PM",
    location: "E-Cell Campus",
    description: "A workshop focusing on building startups with a social impact.",
  },
  {
    id: "13",
    title: "Investor Meet-Up",
    date: "2024-08-10",
    time: "3:00 PM - 6:00 PM",
    location: "SGGS E-Cell",
    description: "Meet potential investors and pitch your startup for funding.",
  },
  {
    id: "14",
    title: "Startup Resource Fair",
    date: "2024-08-20",
    time: "9:00 AM - 1:00 PM",
    location: "SGGS Campus",
    description: "A fair showcasing resources and tools available for startups, including software, legal, and financial services.",
  }
];

const Events = () => {
  const { toast } = useToast();
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const handleRegister = (eventId: string, eventTitle: string) => {
    if (registeredEvents.includes(eventId)) {
      toast({
        title: "Already registered",
        description: `You have already registered for ${eventTitle}.`,
      });
      return;
    }

    setRegisteredEvents([...registeredEvents, eventId]);
    toast({
      title: "Registration successful!",
      description: `You are now registered for ${eventTitle}. Check your email for details.`,
    });
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Startup Events</h1>
        <p className="text-gray-600">
          Join upcoming events, workshops, and networking sessions
        </p>
      </div>

      <div className="space-y-6">
        {eventsData.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                  <Clock className="h-4 w-4 ml-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <p className="text-gray-600">{event.description}</p>
                <Button 
                  className={`w-full ${registeredEvents.includes(event.id) ? "bg-green-500 hover:bg-green-600" : ""}`}
                  onClick={() => handleRegister(event.id, event.title)}
                >
                  {registeredEvents.includes(event.id) ? "Registered" : "Register Now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Events;
