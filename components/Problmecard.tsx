import React, { useEffect, useState } from 'react';
import { Users, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const ProblemCard = ({ title, difficulty, solvedBy, tags }) => {
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect) {
      router.push('/'); // Change to your desired route
    }
  }, [redirect, router]); // Add router to the dependency array

  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <Card className="w-full max-h-72 overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-blue-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${difficultyColor[difficulty]}`}>
            {difficulty}
          </span>
          <div className="flex items-center text-gray-600 text-sm">
            <Users size={14} className="mr-1" />
            <span>{solvedBy} solved</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center">
              <Tag size={10} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          size="sm"
          onClick={() => {
            setRedirect(true); // Set redirect to true
          }}
          className="w-full h-9 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Solve Challenge
        </Button>
      </CardFooter>
    </Card>
  );
};


export default ProblemCard;