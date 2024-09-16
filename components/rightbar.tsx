import React, { useState } from "react";
import { SearchIcon, Users, ArrowRight, Menu, X, ListCollapse } from "lucide-react";
import { GroupMaps, GroupsProps } from "@/types/grouptypes";
import { HiDotsVertical } from "react-icons/hi";

const IsDarkMode: boolean = false;

const CustomTileCard: React.FC<GroupsProps> = ({ ImageUrl, groupName, description, CommuintyPeoples }) => {
    const modifiedGroupDesc = description.substring(0, 15);
    return (
        <div className="flex ml-1 rounded-lg bg-gray-950 h-16 py-1 hover:scale-105 duration-150 transition-all">
            <img src={ImageUrl} alt="" className="ml-1 rounded-full h-12 w-12" />
            <div className="flex flex-col ml-2 overflow-hidden">
                <div className="font-semibold truncate">
                    {groupName}
                </div>
                <div>
                    <p className="text-sm text-gray-400 truncate">
                        {modifiedGroupDesc}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function RightBar() {
    const [isOpen, setIsOpen] = useState(false);
    const textTheme = IsDarkMode ? 'text-black' : 'text-white';

    const toggleRightBar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile toggle button */}
            <button 
                onClick={toggleRightBar} 
                className="lg:hidden fixed top-4 right-4 z-20 p-2 rounded-md bg-gray-800 text-white"
            >
                {isOpen ? <X size={24} /> : <HiDotsVertical  size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden" 
                    onClick={toggleRightBar}
                ></div>
            )}

            {/* RightBar */}
            <div className={`
                bg-black overflow-y-auto text-white h-screen w-4/5 sm:w-80 lg:w-1/5 flex flex-col border-l border-gray-800
                fixed top-0 right-0 z-20 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                ${isOpen ? 'w-7/12' : ''}
                lg:translate-x-0 lg:static
            `}>
                <header className="h-16 flex items-center justify-between border-b border-gray-800 px-4 lg:px-6">
                    <div className="flex items-center bg-gray-900 text-black rounded-lg h-9 w-full px-4 shadow-sm">
                        <SearchIcon className="w-5 h-5 text-white mr-2" />
                        <input
                            type="text"
                            placeholder="Find anything here"
                            className="flex-grow bg-transparent text-white border-none focus:outline-none text-sm"
                        />
                    </div>
                    {/* Close button for mobile */}
                    <button 
                        onClick={toggleRightBar}
                        className="lg:hidden ml-2 text-white"
                    >
                        <X size={24} />
                    </button>
                </header>
                <div className="mt-4 px-4 lg:px-6">
                    <strong className={`${textTheme} font-bold text-xl`}>
                        About Group
                    </strong>
                    <p className={`${textTheme} mt-2 text-gray-100 text-sm lg:text-base`}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur fugit, quasi explicabo qui rem in temporibus odit amet quibusdam repellat libero, delectus impedit officiis voluptatem iusto inventore! Sint sequi vitae cum qui accusamus, hic error debitis, praesentium temporibus optio esse!
                    </p>
                </div>

                <div className="mt-6 px-4 lg:px-6 mb-4">
                    <h2 className="text-lg lg:text-xl font-bold">
                        Recommended Groups
                    </h2>
                </div>
                <div className="px-4 lg:px-6 grid grid-cols-1 gap-4 pb-4">
                    {GroupMaps.map((group, index) => (
                        <CustomTileCard key={index} {...group} />
                    ))}
                </div>
            </div>
        </>
    );
}