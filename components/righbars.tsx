'use client';

import { Menu } from "lucide-react";
import React, { useState } from "react";


export default function Rightbared() {
    const [IsOpen, setIsOpen] = useState(false);

    const toggleSideBar = () => setIsOpen(!IsOpen);
    const length = 10;
    let array = []
    function gen() {
        for (let i = 0; i < length; i++) {
            array.push(i * 5)
        }
    }
    return (
        <div className="bg-white">
            <button className="lg:hidden md:hidden fixed top-4 right-4 z-10 p-3 rounded-md bg-white text-white "
                onClick={toggleSideBar}
            >
                {IsOpen ? '' : <Menu size={24} />}
            </button>
            {
                IsOpen && (
                    <div className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
                        onClick={toggleSideBar}
                    >
                    </div>
                )
            }

            <div className={`w-4/12 bg-white opacity-75  ${IsOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {array.map((ele, idx) => {
                    return <div>
                        <div className="bg-red-400 h-5 w-6">

                        </div>
                        {array[idx]}
                    </div>
                })}
            </div>

        </div>
    )
}