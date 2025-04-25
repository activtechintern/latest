import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  return (
    <section className="py-12 bg-white" id="faq">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-starthub-blue mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about StartHub and how it can help you launch your entrepreneurial journey.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is StartHub?</AccordionTrigger>
            <AccordionContent>
              StartHub is a campus platform designed to help students transform their ideas into viable startups. 
              It provides tools for ideation, collaboration, and access to resources needed to launch successful ventures.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Who can use StartHub?</AccordionTrigger>
            <AccordionContent>
              StartHub is open to all university students, faculty, and alumni interested in entrepreneurship. 
              Whether you're just starting with an idea or looking to join an existing project, StartHub has resources for you.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How do I submit an idea?</AccordionTrigger>
            <AccordionContent>
              After creating an account, navigate to the "Submit Idea" page from the dashboard. 
              Fill out the form with your idea details, including title, description, category, and any additional information. 
              Once submitted, your idea will be reviewed and published to the platform.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Can I collaborate with others on StartHub?</AccordionTrigger>
            <AccordionContent>
              Absolutely! StartHub is built for collaboration. You can browse ideas, join existing teams, or invite others to 
              collaborate on your projects. Use discussion forums to connect with like-minded entrepreneurs and potential team members.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>What resources are available for my startup?</AccordionTrigger>
            <AccordionContent>
              StartHub offers a variety of resources including mentorship connections, funding opportunities, educational materials, 
              workshops, and networking events. Visit our Resources section to explore what's available to help your startup grow.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>How do I find mentors or advisors?</AccordionTrigger>
            <AccordionContent>
              StartHub connects you with experienced mentors and advisors through our network. 
              You can browse mentor profiles in the Resources section and request mentorship based on your specific needs and interests.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
