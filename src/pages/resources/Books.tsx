
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const booksData =[
  {
    title: "The Startup Owner's Manual",
    author: "Steve Blank & Bob Dorf",
    category: "Entrepreneurship",
    description: "Step-by-step guide to building a successful startup",
    downloadLink: "https://archive.org/download/TheStartupsOwnersManual/Startup%20Owners%20Manual%20-%20Steve%20Blank.pdf",
    format: "PDF",
    size: "7.5 MB"
  },
  {
    title: "The Art of the Start 2.0",
    author: "Guy Kawasaki",
    category: "Entrepreneurship",
    description: "A guide to starting a business with a focus on pitching",
    downloadLink: "https://archive.org/download/TheArtOfTheStartGuyKawasaki/The%20Art%20of%20the%20Start%202.0%20-%20Guy%20Kawasaki.pdf",
    format: "PDF",
    size: "4.2 MB"
  },
  {
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    category: "Business Strategy",
    description: "Real-world advice on how to navigate the challenges of building a company",
    downloadLink: "https://archive.org/download/TheHardThingAboutHardThings/Hard%20Thing%20About%20Hard%20Things%20-%20Ben%20Horowitz.pdf",
    format: "PDF",
    size: "4.9 MB"
  },
  {
    title: "The E-Myth Revisited",
    author: "Michael E. Gerber",
    category: "Business Strategy",
    description: "Why most small businesses don't work and what to do about it",
    downloadLink: "https://archive.org/download/TheEMythRevisitedMichaelGerber/The%20E-Myth%20Revisited%20-%20Michael%20E.%20Gerber.pdf",
    format: "PDF",
    size: "3.8 MB"
  },
  {
    title: "The $100 Million Dollar Startup",
    author: "Marlon Nichols",
    category: "Entrepreneurship",
    description: "The inside story of how to build a startup that scales to $100 million",
    downloadLink: "https://archive.org/download/The100MillionDollarStartup/The%20100%20Million%20Dollar%20Startup%20-%20Marlon%20Nichols.pdf",
    format: "PDF",
    size: "5.0 MB"
  },
  {
    title: "Start With Why",
    author: "Simon Sinek",
    category: "Leadership",
    description: "Discover the importance of purpose in leadership and business",
    downloadLink: "https://archive.org/download/StartWithWhySimonSinek/Start%20With%20Why%20-%20Simon%20Sinek.pdf",
    format: "PDF",
    size: "3.5 MB"
  },
  {
    title: "The Lean Product Playbook",
    author: "Dan Olsen",
    category: "Product Development",
    description: "A guide to building products that customers love using lean methodologies",
    downloadLink: "https://archive.org/download/TheLeanProductPlaybookDanOlsen/The%20Lean%20Product%20Playbook%20-%20Dan%20Olsen.pdf",
    format: "PDF",
    size: "5.7 MB"
  },
  {
    title: "Grit",
    author: "Angela Duckworth",
    category: "Motivation",
    description: "The power of passion and perseverance in achieving success",
    downloadLink: "https://archive.org/download/GritAngelaDuckworth/Grit%20-%20Angela%20Duckworth.pdf",
    format: "PDF",
    size: "4.0 MB"
  },
  {
    title: "The Innovator's Dilemma",
    author: "Clayton Christensen",
    category: "Innovation",
    description: "Why large companies fail and how they can sustain profitable growth",
    downloadLink: "https://archive.org/download/TheInnovatorsDilemmaClaytonChristensen/Innovator's%20Dilemma%20-%20Clayton%20Christensen.pdf",
    format: "PDF",
    size: "5.4 MB"
  },
  {
    title: "Business Model Generation",
    author: "Alexander Osterwalder & Yves Pigneur",
    category: "Business Strategy",
    description: "A guide to creating innovative business models",
    downloadLink: "https://archive.org/download/BusinessModelGenerationAlexanderOsterwalder/Business%20Model%20Generation%20-%20Alexander%20Osterwalder.pdf",
    format: "PDF",
    size: "6.1 MB"
  },
  {
    title: "Rework",
    author: "Jason Fried & David Heinemeier Hansson",
    category: "Business Strategy",
    description: "How to work smarter, not harder, and succeed in your business",
    downloadLink: "https://archive.org/download/ReworkJasonFried/Rework%20-%20Jason%20Fried.pdf",
    format: "PDF",
    size: "3.2 MB"
  },
  
    {
      title: "Start with Why",
      author: "Simon Sinek",
      category: "Leadership",
      description: "Learn how great leaders inspire action",
      downloadLink: "https://archive.org/download/StartWithWhy-SimonSinek/Start%20With%20Why%20-%20Simon%20Sinek.pdf",
      format: "PDF",
      size: "4.0 MB"
    },
    {
      title: "The Hard Thing About Hard Things",
      author: "Ben Horowitz",
      category: "Entrepreneurship",
      description: "The challenges of building a startup and how to handle them",
      downloadLink: "https://archive.org/download/HardThingAboutHardThingsBenHorowitz/Hard%20Thing%20About%20Hard%20Things%20-%20Ben%20Horowitz.pdf",
      format: "PDF",
      size: "3.8 MB"
    },
    {
      title: "Good to Great",
      author: "Jim Collins",
      category: "Business Strategy",
      description: "How companies transition from good to great",
      downloadLink: "https://archive.org/download/GoodToGreatJimCollins/Good%20To%20Great%20-%20Jim%20Collins.pdf",
      format: "PDF",
      size: "4.3 MB"
    },
    {
      title: "The Innovator's Dilemma",
      author: "Clayton Christensen",
      category: "Innovation",
      description: "Why large companies fail to innovate and how to avoid it",
      downloadLink: "https://archive.org/download/innovatorsdilemma00chri/Innovators%20Dilemma%20-%20Clayton%20Christensen.pdf",
      format: "PDF",
      size: "5.0 MB"
    },
    {
      title: "Venture Deals",
      author: "Brad Feld & Jason Mendelson",
      category: "Finance",
      description: "Learn how venture capital deals work and how to get funding",
      downloadLink: "https://archive.org/download/VentureDeals-BFeld/venture-deals-bfeld.pdf",
      format: "PDF",
      size: "3.0 MB"
    },
    {
      title: "The Art of Start",
      author: "Guy Kawasaki",
      category: "Entrepreneurship",
      description: "A guide to starting your own business",
      downloadLink: "https://archive.org/download/TheArtOfStart-GuyKawasaki/The%20Art%20Of%20Start%20-%20Guy%20Kawasaki.pdf",
      format: "PDF",
      size: "3.4 MB"
    },
    {
      title: "The E-Myth Revisited",
      author: "Michael E. Gerber",
      category: "Business Management",
      description: "How to build a business that works without you",
      downloadLink: "https://archive.org/download/TheEMythRevisitedMichaelGerber/The%20E-Myth%20Revisited%20-%20Michael%20Gerber.pdf",
      format: "PDF",
      size: "3.2 MB"
    },
    {
      title: "The Founder’s Dilemmas",
      author: "Noam Wasserman",
      category: "Entrepreneurship",
      description: "The challenges every entrepreneur faces when starting up",
      downloadLink: "https://archive.org/download/FoundersDilemmasNoamWasserman/Founders%20Dilemmas%20-%20Noam%20Wasserman.pdf",
      format: "PDF",
      size: "4.1 MB"
    },
    {
      title: "The Art of the Start 2.0",
      author: "Guy Kawasaki",
      category: "Entrepreneurship",
      description: "Updated strategies for starting a business in the modern world",
      downloadLink: "https://archive.org/download/TheArtOfTheStart2.0GuyKawasaki/The%20Art%20Of%20The%20Start%202.0%20-%20Guy%20Kawasaki.pdf",
      format: "PDF",
      size: "3.6 MB"
    },
    {
      title: "Rework",
      author: "Jason Fried & David Heinemeier Hansson",
      category: "Business Strategy",
      description: "Radical new rules for starting and running a business",
      downloadLink: "https://archive.org/download/ReworkJasonFried/Rework%20-%20Jason%20Fried.pdf",
      format: "PDF",
      size: "3.7 MB"
    },
      {
        title: "The Lean Startup",
        author: "Eric Ries",
        category: "Methodology",
        description: "Learn how to build a lean and efficient startup",
        downloadLink: "https://archive.org/download/TheLeanStartupErickRies/The%20Lean%20Startup%20-%20Erick%20Ries.pdf",
        format: "PDF",
        size: "3.5 MB"
      },
      {
        title: "Zero to One",
        author: "Peter Thiel",
        category: "Innovation",
        description: "Create groundbreaking startups that go from zero to one",
        downloadLink: "https://archive.org/download/zero-to-one-peter-thiel/Zero%20to%20One%20-%20Peter%20Thiel.pdf",
        format: "PDF",
        size: "2.8 MB"
      },
      {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Nir Eyal",
        category: "Product Design",
        description: "Build habit-forming products that users love",
        downloadLink: "https://archive.org/download/hookedhowtobuild0000eyal/Hooked%20-%20Nir%20Eyal.pdf",
        format: "PDF",
        size: "3.1 MB"
      },
      {
        title: "The $100 Startup",
        author: "Chris Guillebeau",
        category: "Entrepreneurship",
        description: "Start a business on a shoestring budget",
        downloadLink: "https://archive.org/download/100startupreinve0000guil/100%20Startup%20-%20Chris%20Guillebeau.pdf",
        format: "PDF",
        size: "2.6 MB"
      },
      {
        title: "Contagious: Why Things Catch On",
        author: "Jonah Berger",
        category: "Marketing",
        description: "Discover why products and ideas go viral",
        downloadLink: "https://archive.org/download/contagiouswhythi0000berg/Contagious%20-%20Jonah%20Berger.pdf",
        format: "PDF",
        size: "2.9 MB"
      },
      {
        title: "Measure What Matters",
        author: "John Doerr",
        category: "Goal Setting",
        description: "Implement OKRs to drive startup performance",
        downloadLink: "https://archive.org/download/SC_10029/%5BStudycrux.com%5D%20Measure%20What%20Matters%20-%20John%20Doerr-X.pdf",
        format: "PDF",
        size: "4.2 MB"
      },
      {
        title: "Rework",
        author: "Jason Fried & David Heinemeier Hansson",
        category: "Business Strategy",
        description: "Radical new rules for starting and running a business",
        downloadLink: "https://archive.org/download/rework0000frie/Rework%20-%20Jason%20Fried.pdf",
        format: "PDF",
        size: "3.7 MB"
      },
      {
        title: "Running Lean",
        author: "Ash Maurya",
        category: "Lean Methodology",
        description: "Iterate your startup idea towards success",
        downloadLink: "https://cdn.bookey.app/files/pdf/book/en/running-lean.pdf",
        format: "PDF",
        size: "1.5 MB"
      }
    
]


const Books = () => {
  return (
    <>
      <Link to="/resources" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Resources
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">E-Books & PDFs</h1>
        <p className="text-gray-600">
          Access our curated collection of startup guides and resources
        </p>
      </div>

      <div className="grid gap-6">
        {booksData.map((book) => (
          <Card key={book.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <BookOpen className="h-8 w-8 text-starthub-blue" />
                <Badge>{book.format}</Badge>
              </div>
              <CardTitle className="mt-4">{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">{book.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By {book.author}</span>
                  <span>{book.size}</span>
                </div>
                <button onClick={() => window.open(book.downloadLink, "_blank")}>
       Open Pdf
      </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Books;
