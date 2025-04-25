
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

interface IdeaTeamSectionProps {
  teamMembers: TeamMember[];
  seeking: string[];
}

export const IdeaTeamSection = ({ teamMembers, seeking }: IdeaTeamSectionProps) => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="font-poppins font-semibold text-xl mb-4">Team</h3>
      
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">Current Members</h4>
        <div className="flex flex-wrap gap-4">
          {teamMembers.map((member, i) => (
            <div key={i} className="flex items-center space-x-2 bg-gray-50 rounded-full py-1 pl-1 pr-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-medium mb-3">Looking For</h4>
        <div className="flex flex-wrap gap-2">
          {seeking.map((role, i) => (
            <Badge key={i} className="bg-starthub-mint text-white">
              {role}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
