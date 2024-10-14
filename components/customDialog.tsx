import React, { useState } from "react";
import { ExitIcon } from "@radix-ui/react-icons";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

// Define the validation schema
const formSchema = z.object({
  teamName: z.string().min(1, { message: "Team name is required" }),
});

const CreateTeamDialog = () => {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState<string | null>(null); // State for error message

  const handleCreateTeam = () => {
    console.log("Creating team:", teamName);
    setTeamName("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      formSchema.parse({ teamName });
      setError(null);
      handleCreateTeam();
      console.log("Form submitted successfully");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else{
        throw new Error(err);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="flex items-center space-x-2 mb-2 hover:bg-gray-900 p-2 rounded cursor-pointer transition-transform transform hover:scale-105">
          <PlusCircle className="w-5 h-5 text-indigo-400" />
          <span className="text-gray-300">Add Playground</span>
        </li>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Create a New Playground
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-400">
            Start a new journey with your team. You can collaborate and code in
            real-time with your friends!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Wrap the form inputs with a form element */}
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
            {error && ( // Display error message if there is one
              <div className="text-red-500 text-sm">{error}</div>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="submit" // Change to type="submit" to trigger form submission
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
            >
              Create Team
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
