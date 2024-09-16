import React, { useState } from 'react';
import { ExitIcon } from "@radix-ui/react-icons";
import { Calendar, FileText, Hash, Inbox, PlusCircle, Settings, Menu, X } from "lucide-react";
import { SiAboutdotme } from 'react-icons/si';
import { IoAlbumsOutline } from 'react-icons/io5';

export const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile menu button */}
            <button 
                onClick={toggleSidebar} 
                className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-800 text-white"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden" 
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                w-64 h-screen bg-black border-r border-gray-700 flex flex-col p-4
                fixed top-0 left-0 z-20 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                ${isOpen ? 'overflow-y-scroll' : ''}
                lg:translate-x-0 lg:static lg:w-2/12
            `}>
                {/* Nexus and Logo */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 h-8 w-8 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">N</span>
                        </div>
                        <h1 className="text-xl font-bold text-white">Nexus</h1>
                    </div>
                    <Settings className="text-white" />
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
                                    <div className="flex -space-x-1">
                                        <img
                                            src="/api/placeholder/24/24"
                                            alt="team-avatar"
                                            className="w-6 h-6 rounded-full border-2 border-gray-800"
                                        />
                                        <img
                                            src="/api/placeholder/24/24"
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
                    <div className="flex items-center justify-between space-x-2">
                        <div className="flex">
                            <img
                                src="/api/placeholder/32/32"
                                alt="user-avatar"
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            <div>
                                <p className="text-sm font-medium text-white">Kevin Heart</p>
                                <p className="text-xs text-gray-400">On duty</p>
                            </div>
                        </div>
                        <div className="justify-self-end pr-2 text-2xl text-white">
                            <ExitIcon />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};