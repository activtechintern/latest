
import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data for upcoming events
const events = [
  {
    id: "1",
    title: "Spring Pitch Competition",
    date: new Date(2024, 4, 15),
    time: "3:00 PM - 6:00 PM",
    location: "Student Center Auditorium",
    category: "Competition",
  },
  {
    id: "2",
    title: "Tech Startup Workshop",
    date: new Date(2024, 4, 20),
    time: "2:00 PM - 4:00 PM",
    location: "Innovation Lab",
    category: "Workshop",
  },
  {
    id: "3",
    title: "Venture Capital Panel Discussion",
    date: new Date(2024, 4, 25),
    time: "5:00 PM - 7:00 PM",
    location: "Business School, Room 202",
    category: "Panel",
  },
];

export const UpcomingEvents = () => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      "Competition": "bg-orange-100 text-orange-800",
      "Workshop": "bg-blue-100 text-blue-800",
      "Panel": "bg-purple-100 text-purple-800",
      "Hackathon": "bg-green-100 text-green-800",
    };
    
    return categories[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-poppins">Upcoming Events</h2>
        <a href="/events" className="text-starthub-blue font-medium text-sm hover:underline">
          View All
        </a>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden card-hover">
            <CardContent className="p-0">
              <div className="flex">
                <div className="bg-starthub-blue text-white p-4 flex flex-col items-center justify-center min-w-[80px]">
                  <CalendarDays className="mb-1" />
                  <span className="text-lg font-bold">{formatDate(event.date)}</span>
                </div>

                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-poppins font-semibold text-lg mb-1">{event.title}</h3>
                      <p className="text-gray-500 text-sm mb-2">{event.time} • {event.location}</p>
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                    </div>
                    <Button size="sm" className="bg-starthub-mint hover:bg-starthub-mint/90">
                      Register
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
