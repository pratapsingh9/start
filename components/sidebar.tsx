'use client'
import React, { useState } from 'react';
import { ExitIcon } from "@radix-ui/react-icons";
import { FileText, Hash, Inbox, PlusCircle, Settings, Menu, X } from "lucide-react";
import Link from 'next/link';
import { MdExplore } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-gray-400 text-xs uppercase mb-2">{title}</h2>
);

const SidebarItem = ({ icon: Icon, text, badge, onClick }: { icon: React.ElementType, text: string, badge?: string, onClick?: () => void }) => (
  <li 
    className="flex items-center space-x-2 mb-2 hover:bg-gray-800 p-2 rounded cursor-pointer"
    onClick={onClick}
  >
    <Icon className="w-5 h-5 text-gray-400" />
    <span className="text-gray-300">{text}</span>
    {badge && (
      <span className="ml-auto text-sm bg-gray-800 px-2 py-1 rounded-full text-gray-300">{badge}</span>
    )}
  </li>
);

const TeamItem = ({ name, badge }: { name: string, badge?: string }) => (
  <li className="flex items-center space-x-2 mb-2 hover:bg-gray-800 p-2 rounded">
    <div className="flex -space-x-1">
      <img src="/api/placeholder/24/24" alt="team-avatar" className="w-6 h-6 rounded-full border-2 border-black" />
      <img src="/api/placeholder/24/24" alt="team-avatar" className="w-6 h-6 rounded-full border-2 border-black" />
    </div>
    <span className="text-gray-300">{name}</span>
    {badge && (
      <span className="ml-auto text-sm bg-gray-800 px-2 py-1 rounded-full text-gray-300">{badge}</span>
    )}
  </li>
);

const CreateTeamDialog = () => {
  const [teamName, setTeamName] = useState('');

  const handleCreateTeam = () => {
    // Here you would typically handle the team creation logic
    console.log('Creating team:', teamName);
    // Reset the input field
    setTeamName('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="flex items-center space-x-2 mb-2 hover:bg-gray-800 p-2 rounded cursor-pointer">
          <PlusCircle className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">Create New Team</span>
        </li>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New JavaScript Playground</DialogTitle>
          <DialogDescription>
            Set up a new team with a JavaScript playground. You can collaborate and code together in real-time.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="teamName" className="text-right">
              Team Name
            </label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleCreateTeam}>Create Team</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button 
        className='lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-800 text-gray-200'
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        w-64 h-screen bg-black border-r border-gray-800 flex flex-col p-4
        fixed top-0 left-0 z-20 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isOpen ? 'overflow-y-auto' : ''}
        lg:translate-x-0 lg:static lg:w-2/12
      `}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <div className="bg-gray-800 h-8 w-8 rounded-full flex items-center justify-center">
              <span className="text-gray-200 font-bold">N</span>
            </div>
            <h1 className="text-xl font-bold text-gray-200">Nexus</h1>
          </div>
          <Link href="/settings" className='h-10 w-10 rounded-full cursor-pointer hover:bg-gray-800 flex items-center justify-center'>
            <Settings className="text-gray-400" />
          </Link>
        </div>

        <nav className="mb-6 mt-6">
          <SectionHeader title="General" />
          <ul>
            <SidebarItem icon={Inbox} text="Inbox" badge="3" />
            <SidebarItem icon={MdExplore} text="Explore" onClick={() => router.replace('/explore')} />
          </ul>
        </nav>

        <nav className="mb-6">
          <SectionHeader title="Teams" />
          <ul>
            {["UI/UX Teams", "Research Gang", "Talks Project"].map((team, index) => (
              <TeamItem key={index} name={team} badge={index === 2 ? "24" : undefined} />
            ))}
            <CreateTeamDialog />
          </ul>
        </nav>

        <nav className="mb-6">
          <SectionHeader title="Channel" />
          <ul>
            {["Mobile Designer", "Front-End Community", "UI/UX Community", "Web Designer"].map((channel, index) => (
              <SidebarItem key={index} icon={Hash} text={channel} />
            ))}
            <SidebarItem icon={PlusCircle} text="Make a Channel" />
          </ul>
        </nav>

        <div className="mt-auto bg-gray-900 px-2 py-2 rounded-md">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZl4UHNZcbXqz45eSRCOotZcVMO0fdmX1Fbw&s"
                alt="user-avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="text-sm font-medium text-gray-200">Kevin Heart</p>
                <p className="text-xs text-gray-400">On duty</p>
              </div>
            </div>
            <ExitIcon className="text-2xl text-gray-400" />
          </div>
        </div>
      </aside>
    </>
  );
};