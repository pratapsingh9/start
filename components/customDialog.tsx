import React, { useState } from 'react';
import { ExitIcon } from "@radix-ui/react-icons";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreateTeamDialog = () => {
  const [teamName, setTeamName] = useState('');

  const handleCreateTeam = () => {
    console.log('Creating team:', teamName);
    setTeamName('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="flex items-center space-x-2 mb-2 hover:bg-gray-800 p-2 rounded cursor-pointer transition-transform transform hover:scale-105">
          <PlusCircle className="w-5 h-5 text-indigo-400" />
          <span className="text-gray-300">Create New Team</span>
        </li>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Create a New Team</DialogTitle>
          <DialogDescription className="text-sm text-gray-400">
            Start a new journey with your team. You can collaborate and code in real-time with your friends!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="teamName" className="text-right text-gray-300">
              Team Name
            </label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="col-span-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleCreateTeam}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
          >
            Create Team
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
