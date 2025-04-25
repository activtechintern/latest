
interface IdeaDetailContentProps {
  description: string;
  problem: string;
  solution: string;
  market: string;
}

export const IdeaDetailContent = ({
  description,
  problem,
  solution,
  market,
}: IdeaDetailContentProps) => {
  return (
    <div className="prose max-w-none mb-8">
      <h3 className="font-poppins font-semibold text-xl mb-2">Description</h3>
      <p className="whitespace-pre-line">{description}</p>
      
      <h3 className="font-poppins font-semibold text-xl mt-6 mb-2">The Problem</h3>
      <p>{problem}</p>
      
      <h3 className="font-poppins font-semibold text-xl mt-6 mb-2">Our Solution</h3>
      <p>{solution}</p>
      
      <h3 className="font-poppins font-semibold text-xl mt-6 mb-2">Target Market</h3>
      <p>{market}</p>
    </div>
  );
};
