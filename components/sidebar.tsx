"use client";
import React, { useState } from "react";
import { ExitIcon } from "@radix-ui/react-icons";
import {
  Hash,
  Inbox,
  PlusCircle,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { MdExplore } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CreateTeamDialog from "./customDialog";
// import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";

const SectionHeader = ({ title, children }) => (
  <div className="flex items-center justify-between mb-2">
    <h2 className="text-gray-400 text-xs uppercase">{title}</h2>
    {children}
  </div>
);

const SidebarItem = ({ icon: Icon, text, badge, onClick, active = false }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <li
          className={`flex items-center space-x-2 mb-2 hover:bg-gray-800 p-2 rounded cursor-pointer transition-colors duration-200 ${
            active ? "bg-gray-800" : ""
          }`}
          onClick={onClick}
        >
          <Icon
            className={`w-5 h-5 ${active ? "text-white" : "text-gray-400"}`}
          />
          <span
            className={`text-sm ${active ? "text-white" : "text-gray-300"}`}
          >
            {text}
          </span>
          {badge && (
            <span className="ml-auto text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
              {badge}
            </span>
          )}
        </li>
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const TeamItem = ({ name, badge, active = false, onClick }) => (
  <li
    className={`flex items-center space-x-2 mb-2 hover:bg-gray-800 p-2 rounded cursor-pointer transition-colors duration-200 ${
      active ? "bg-gray-800" : ""
    }`}
    onClick={onClick}
  >
    <Avatar className="w-6 h-6">
      <AvatarImage
        src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
      />
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
    <span className={`text-sm ${active ? "text-white" : "text-gray-300"}`}>
      {name}
    </span>
    {badge && (
      <span className="ml-auto text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
        {badge}
      </span>
    )}
  </li>
);

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-6">
      <SectionHeader title={title}>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-4 w-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </Button>
      </SectionHeader>
      {isOpen && children}
    </div>
  );
};

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Inbox");
  const [activeTeam, setActiveTeam] = useState(null);
  const { data } = useSession();
  const router = useRouter();
  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (item === "Explore") {
      router.prefetch("/explore");
      router.replace("/explore");
    }
  };

  const handleTeamClick = (team) => {
    setActiveTeam(team);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-20"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`w-64 h-screen bg-black border-r border-gray-800 flex flex-col p-4
        fixed top-0 left-0 z-20 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isOpen ? "overflow-y-auto" : ""}
        lg:translate-x-0 lg:static lg:w-2/12`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            {/* <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
            <h1 className="text-xl font-bold text-gray-200 ml-4">CheemtCode</h1>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => router.push("/settings")}
                >
                  <Settings className="h-5 w-5 text-gray-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <CollapsibleSection title="General">
          <ul>
            <SidebarItem
              icon={Inbox}
              text="Inbox"
              badge="3"
              active={activeItem === "Inbox"}
              onClick={() => handleItemClick("Inbox")}
            />
            <SidebarItem
              icon={MdExplore}
              text="Explore"
              active={activeItem === "Explore"}
              onClick={() => handleItemClick("Explore")}
              badge={undefined}
            />
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Teams">
          <ul>
            {["UI/UX Teams", "Research Gang", "Talks Project"].map(
              (team, index) => (
                <TeamItem
                  key={index}
                  name={team}
                  badge={index === 2 ? "24" : undefined}
                  active={activeTeam === team}
                  onClick={() => handleTeamClick(team)}
                />
              )
            )}
            <CreateTeamDialog />
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Channels">
          <ul>
            {[
              "Mobile Designer",
              "Front-End Community",
              "UI/UX Community",
              "Web Designer",
            ].map((channel, index) => (
              <SidebarItem
                key={index}
                icon={Hash}
                text={channel}
                active={activeItem === channel}
                onClick={() => handleItemClick(channel)}
                badge={undefined}
              />
            ))}
            <SidebarItem
              icon={PlusCircle}
              text="Make a Channel"
              onClick={() => {}}
              badge={undefined}
            />
          </ul>
        </CollapsibleSection>

        <div className="mt-auto bg-gray-900 px-3 py-2 rounded-md">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center">
              <Avatar className="w-8 h-8 mr-2">
                <AvatarImage src={data?.user?.image} />
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-200">Kevin Hart</p>
                <p className="text-xs text-gray-400">On duty</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ExitIcon className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
