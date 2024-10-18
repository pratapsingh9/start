'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Users, Search, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SideBar } from '@/components/sidebar';
import { useRouter } from 'next/navigation';

// Individual channel card component with enhanced UI
const ChannelCard = ({ name, members, description, onJoin }) => {
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-2xl hover:scale-105 border-l-4 border-blue-500 rounded-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-gray-800">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-gray-600 text-sm">
            <Users size={14} className="mr-1" />
            <span>{members} members</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          size="sm" 
          onClick={onJoin} 
          className="w-full h-9 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-md transition-all duration-300"
        >
          Join Channel
        </Button>
      </CardFooter>
    </Card>
  );
};

const ExploreChannels = () => {
  const focusRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [channels, setChannels] = useState([
    {
      name: "React Developers",
      members: "1.2K",
      description: "Discuss everything about React.",
    },
    {
      name: "TypeScript Wizards",
      members: "980",
      description: "Share tips and tricks about TypeScript.",
    },
    {
      name: "Frontend Enthusiasts",
      members: "2.1K",
      description: "Talk about frontend frameworks, tools, and trends.",
    },
    {
      name: "AI & Machine Learning",
      members: "1.8K",
      description: "Discuss advancements in AI and machine learning.",
    },
  ]);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  const handleJoinChannel = (channelName) => {
    alert(`Joined ${channelName}`);
  };

  // Filter channels based on search term
  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
            <PlusCircle size={36} className="mr-2 text-blue-600" />
            Discussion Channels
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              ref={focusRef}
              type="text"
              placeholder="Search channels"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 border-2 border-gray-200 focus:border-blue-500 rounded-full shadow-sm"
            />
          </div>
        </div>

        {/* Render filtered channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChannels.length > 0 ? (
            filteredChannels.map((channel, index) => (
              <ChannelCard
                key={index}
                {...channel}
                onJoin={() => handleJoinChannel(channel.name)}
              />
            ))
          ) : (
            <div className="text-center text-gray-600 col-span-full">
              No channels found.
            </div>
          )}
        </div>

        {/* Create Channel Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            Want to start a new discussion?
          </h2>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={() => router.push('/create')}
          >
            Create a Channel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SideBar />
      <ExploreChannels />
    </div>
  );
}
