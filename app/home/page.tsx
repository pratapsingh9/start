'use client'
import { useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ArrowLeft, Calendar, FileText, Hash, Inbox, Link2, LinkIcon, PlusCircle, SendIcon, Share2Icon, ShareIcon } from "lucide-react";
import { ArrowLeftIcon } from "lucide-react";

import { Settings } from "lucide-react";
const SideBar = () => {
  return (
    <aside className="w-2/12 h-screen bg-black border-r border-gray-700 flex flex-col p-4">
      {/* Nexus and Logo */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 h-8 w-8 rounded-full flex items-center justify-center">
            {/* Logo Placeholder */}
            <span className="text-white font-bold">N</span>
          </div>
          <div className="w-4 h-1">

          </div>
          <h1 className="text-xl font-bold  text-white">Nexus</h1>
        </div>
        <div>
          {/* Placeholder for settings icon */}
          <span className="text-white">
            <Settings />
          </span>
        </div>
      </div>

      {/* General Section */}
      <div className="mb-6 mt-6">
        <h2 className="text-gray-400 text-xs uppercase mb-2">General</h2>
        <ul>
          <li className="flex items-center space-x-2 mb-2 hover:bg-gray-700 p-2 rounded">
            <Inbox className="w-5 h-5 text-gray-400" />
            <span className="text-white">Inbox</span>
            <span className="ml-auto text-sm bg-gray-600 px-2 py-1 rounded-full text-gray-200">3</span>
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <FileText className="w-5 h-5 text-gray-400" />
            <span className="text-white">Draft</span>
          </li>
        </ul>
      </div>

      {/* Teams Section */}
      <div className="mb-6">
        <h2 className="text-gray-400 text-xs uppercase mb-2">Teams</h2>
        <ul>
          {["UI/UX Teams", "Research Gang", "Talks Project"].map((team, index) => (
            <li key={index} className="flex items-center space-x-2 mb-2 hover:bg-gray-700 p-2 rounded">
              <div className="flex items-center space-x-1">
                {/* Team avatars */}
                <div className="flex -space-x-1">
                  <img
                    src="https://via.placeholder.com/24"
                    alt="team-avatar"
                    className="w-6 h-6 rounded-full border-2 border-gray-800"
                  />
                  <img
                    src="https://via.placeholder.com/24"
                    alt="team-avatar"
                    className="w-6 h-6 rounded-full border-2 border-gray-800"
                  />
                </div>
              </div>
              <span className="text-white">{team}</span>
              {index === 2 && (
                <span className="ml-auto text-sm bg-gray-600 px-2 py-1 rounded-full text-gray-200">24</span>
              )}
            </li>
          ))}
          <li className="flex items-center space-x-2 text-blue-400 hover:bg-gray-700 p-2 rounded cursor-pointer">
            <PlusCircle className="w-5 h-5" />
            <span>Create New Team</span>
          </li>
        </ul>
      </div>

      {/* Channel Section */}
      <div className="mb-6">
        <h2 className="text-gray-400 text-xs uppercase mb-2">Channel</h2>
        <ul>
          {["Mobile Designer", "Front-End Community", "UI/UX Community", "Web Designer"].map((channel, index) => (
            <li key={index} className="flex items-center space-x-2 mb-2 hover:bg-gray-700 p-2 rounded">
              <Hash className="w-5 h-5 text-gray-400" />
              <span className="text-white">{channel}</span>
            </li>
          ))}
          <li className="flex items-center space-x-2 text-blue-400 hover:bg-gray-700 p-2 rounded cursor-pointer">
            <PlusCircle className="w-5 h-5" />
            <span>Make a Channel</span>
          </li>
        </ul>
      </div>

      {/* Integrations Section */}
      <div className="mb-6">
        <h2 className="text-gray-400 text-xs uppercase mb-2">Integrations</h2>
        <ul>
          <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-white">Google Calendar</span>
          </li>
        </ul>
      </div>

      {/* Footer - User Info */}
      <div className="mt-auto">
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/32"
            alt="user-avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-white">Kevin Heart</p>
            <p className="text-xs text-gray-400">On duty</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const IshaveChildre: boolean = true;

const MainGroupScreen = ({ width }) => {
  return (
    <div
      className="bg-black text-white h-screen flex flex-col"
      style={{ width: `${width}px` }}
    >
      <header className="h-16 justify-between border-b border-gray-800 flex items-center px-6">
        <button className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-400" />
        </button>
        <h1 className="text-xl font-semibold">Container</h1>
        <div className="align-middle">
          <InfoCircledIcon className="text-white" />
        </div>
      </header>

      <main className="flex-1 p-6 flex flex-col">
        <p className="text-gray-400">Main content area</p>
        <div className="mt-auto">
          <div className="bg-gray-900 rounded-xl h-14 flex items-center px-6">
            <div className="flex items-center w-full">
              <Link2 className="text-blue-400 w-7 h-7" />
              <input
                type="text"
                placeholder="Type Your Thread..."
                className="ml-4 bg-transparent py-10 text-xl font-semibold text-gray-400 focus:outline-none w-full"
              />
              <SendIcon className="text-gray-100 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

function RightBar({ width }) {
  return (
    <div
      className="h-screen bg-white"
      style={{ width: `${width}px` }}
    >
      {/* RightBar content goes here */}
    </div>
  );
}

export default function App() {
  const [mainWidth, setMainWidth] = useState(600);
  const [rightBarWidth, setRightBarWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);

  const startResize = () => {
    setIsResizing(true);
  };

  const resize = (e) => {
    if (isResizing) {
      const newMainWidth = e.clientX;
      const newRightBarWidth = window.innerWidth - newMainWidth;
      setMainWidth(newMainWidth);
      setRightBarWidth(newRightBarWidth);
    }
  };

  const stopResize = () => {
    setIsResizing(false);
  };

  return (
    <div
      className="bg-black h-screen flex"
      onMouseMove={resize}
      onMouseUp={stopResize}
    >
      <SideBar />
      <MainGroupScreen width={mainWidth} />
      {/* Divider */}
      <div
        className="bg-gray-700 h-full cursor-col-resize"
        onMouseDown={startResize}
        style={{ width: '5px' }}
      />
      <RightBar width={rightBarWidth} />
    </div>
  );
}
