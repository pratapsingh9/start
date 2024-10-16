"use client";
import React, { useState, useCallback, Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Code,
  Terminal,
  Menu,
  Moon,
  Sun,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SideBar } from "@/components/sidebar";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

type Params = {
  problem: string;
};

const SolvePage = ({ params }: { params: Params }) => {
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [code, setCode] = useState(`function addTwoNumbers(l1, l2) {\n  // Your code here\n}`);

  const testCases = [
    {
      input: "([2,4,3], [5,6,4])",
      expectedOutput: "[7,0,8]",
    },
    {
      input: "([0], [0])",
      expectedOutput: "[0]",
    },
    {
      input: "([9,9,9,9,9,9,9], [9,9,9,9])",
      expectedOutput: "[8,9,9,9,0,0,0,1]",
    },
  ];

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput("");
    setStatus("");

    setTimeout(() => {
      // Simulating code execution output
      setOutput("Output: " + testCases.map(tc => `Input: ${tc.input} => Output: ${tc.expectedOutput}`).join('\n'));
      setStatus("success");
      setIsRunning(false);
    }, 1500);
  }, [testCases]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleResetCode = () => setCode(`function addTwoNumbers(l1, l2) {\n  // Your code here\n}`);

  return (
    <div className={`flex flex-col h-screen bg-black ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
      {isSidebarOpen && <SideBar />}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className={`border-b p-4 flex justify-between items-center ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5 text-gray-400" />
            </Button>
            <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400">
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <h2 className="text-xl font-semibold">Problem {params.problem}: Add Two Numbers</h2>
            <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400">
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden cursor-pointer">
          <div className={`w-[45%] border-r ${isDarkMode ? "border-gray-700" : "border-gray-200"} flex flex-col overflow-hidden`}>
            <Tabs defaultValue="description" className="flex-1 flex flex-col">
              <TabsList className={`${isDarkMode ? "bg-gray-900" : "bg-gray-100"} p-2 justify-start`}>
                <TabsTrigger value="description" className="flex items-center text-gray-400">
                  <BookOpen className="h-4 w-4 mr-2" /> Description
                </TabsTrigger>
                <TabsTrigger value="solution" className="flex items-center text-gray-400">
                  <Code className="h-4 w-4 mr-2" /> Solution
                </TabsTrigger>
                <TabsTrigger value="submission" className="flex items-center text-gray-400">
                  <Terminal className="h-4 w-4 mr-2" /> Submission
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className={`flex-1 overflow-auto p-6 ${isDarkMode ? "bg-black" : "bg-white"}`}>
                <h3 className="text-2xl font-semibold mb-4 text-gray-300">Problem Description</h3>
                <p className={`mb-6 leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each node contains a single digit. Add the two numbers and return the sum as a linked list.
                </p>
                <h4 className="text-xl font-semibold mb-3 text-gray-300">Example:</h4>
                <pre className={`${isDarkMode ? "bg-gray-900" : "bg-gray-100"} p-4 rounded-lg text-sm shadow-inner text-gray-200`}>
                  <code>{`Input: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807.`}</code>
                </pre>
              </TabsContent>
              {/* Solution and Submission tabs content remain similar */}
            </Tabs>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className={`${isDarkMode ? "bg-black border-gray-700" : "bg-gray-100 border-gray-200"} p-3 flex justify-between items-center border-b`}>
              <span className="font-semibold text-gray-300">Code Editor</span>
              <div className="ml-auto mr-4 h-7 bg-gray-800 cursor-pointer w-5" onClick={handleResetCode}>
                <RefreshCcw />
              </div>
              <Button onClick={runCode} disabled={isRunning} size="sm" className={`${isRunning ? "bg-cyan-600" : "bg-cyan-500 hover:bg-cyan-600"} text-white transition-colors duration-200`}>
                {isRunning ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running...
                  </span>
                ) : (
                  <>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Run Code
                  </>
                )}
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Suspense fallback={<div className="flex items-center justify-center h-full text-white bg-center">Loading...</div>}>
                <MonacoEditor
                  height="100%"
                  language="javascript"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{ selectOnLineNumbers: true, automaticLayout: true }}
                />
              </Suspense>
            </div>
            <div className={`border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"} p-4 overflow-auto flex flex-col`}>
              <h3 className="text-lg font-semibold mb-2">Output</h3>
              <pre className={`whitespace-pre-wrap p-2 rounded-md ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} text-sm`}>
                {output || "No output yet."}
              </pre>
              {status && <div className={`mt-2 ${status === "success" ? "text-green-500" : "text-red-500"}`}>{status}</div>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SolvePage;
