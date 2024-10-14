'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Users, Search, Code, Tag, BarChart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SideBar } from '@/components/sidebar';
import { useRouter } from 'next/navigation';

const ProblemCard = ({ title, difficulty, solvedBy, tags, problemUrl }) => {
  const router = useRouter();
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

   
  function goToProbelme() {
    router.push('/solve/99');
  } 

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
        <Button size="sm" onClick={goToProbelme} className="w-full h-9 bg-blue-600 hover:bg-blue-700 text-white">
          Solve Challenge
        </Button>
      </CardFooter>
    </Card>
  );
};

const ExploreScreen = () => {
  const focusRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  const problems = [
    {
      title: "Two Sum",
      difficulty: "Easy",
      solvedBy: "1.2M",
      tags: ["Array", "Hash Table"],
      problemUrl: "#"
    },
    {
      title: "Add Two Numbers",
      difficulty: "Medium",
      solvedBy: "980K",
      tags: ["Linked List", "Math"],
      problemUrl: "#"
    },
    {
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      solvedBy: "850K",
      tags: ["Hash Table", "String", "Sliding Window"],
      problemUrl: "#"
    },
    {
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      solvedBy: "520K",
      tags: ["Array", "Binary Search", "Divide and Conquer"],
      problemUrl: "#"
    },
  ];

  const filters = ['All', 'Easy', 'Medium', 'Hard'];

  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-8 overflow-y-auto"> {/* Added overflow-y-auto */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center">
            <Code size={36} className="mr-2 text-blue-600" />
            CheemtCode
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              ref={focusRef}
              type="text"
              placeholder="Search problems"
              className="pl-10 pr-4 py-2 w-80 border-2 border-gray-200 focus:border-blue-500 rounded-full"
            />
          </div>
        </div>

        <div className="mb-6 flex space-x-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              variant={activeFilter === filter ? "default" : "outline"}
              className={`rounded-full ${activeFilter === filter ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <ProblemCard key={index} {...problem} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Level Up Your Coding Skills?
          </h2>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            Start Coding Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="flex bg-gray-50 min-h-screen"> {/* Set min-h-screen here to ensure full height */}
      <SideBar />
      <ExploreScreen />
    </div>
  );
}
