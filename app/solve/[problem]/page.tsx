"use client";

import React, { useState, useCallback, Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Code,
  Terminal as TerminalIcon,
  Menu,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SideBar } from "@/components/sidebar";
import Terminal from "@/components/terminal";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

type Params = {
  problem: string;
};

const SolvePage = ({ params }: { params: Params }) => {
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const defaultProblemCode = `function addTwoNumbers(l1, l2) {
  // write your code here
}
`;

  const [code, setCode] = useState(() => {
    const previousCode = localStorage.getItem(`code/${params.problem}`);
    return previousCode || defaultProblemCode;
  });

  useEffect(() => {
    const previousCode = localStorage.getItem(`code/${params.problem}`);
    if (previousCode) {
      setCode(previousCode);
    }
  }, [params.problem]);

  useEffect(() => {
    try {
      localStorage.setItem(`code/${params.problem}`, code);
    } catch (error) {
      console.error("Failed to save code to localStorage:", error);
    }
  }, [code, params.problem]);

  const handleEditorChange = useCallback((value: string | undefined) => {
    setCode(value || "");
  }, []);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput("");
    try {
      // For demonstration, we'll use eval. In a real app, use a safer method.
      const result = eval(code);
      setOutput(String(result));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleResetCode = () => {
    if (code !== defaultProblemCode) {
      setCode(defaultProblemCode);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#1e1e1e] text-white">
      {isSidebarOpen && <SideBar />}

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-3 bg-[#1e1e1e] shadow-lg border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5 text-gray-400" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-400 border-blue-400 hover:bg-blue-900"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <h2 className="text-xl font-semibold">
              Problem {params.problem}: Add Two Numbers
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-400 border-blue-400 hover:bg-blue-900"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="text-green-400 border-green-400 hover:bg-green-900"
            >
              Submit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-yellow-400 border-yellow-400 hover:bg-yellow-900"
            >
              Solutions
            </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-[40%] border-r border-gray-700 flex flex-col overflow-hidden">
            <Tabs defaultValue="description" className="flex-1 flex flex-col">
              <TabsList className="bg-gray-800 p-2 justify-start">
                <TabsTrigger
                  value="description"
                  className="flex items-center text-gray-400"
                >
                  <BookOpen className="h-4 w-4 mr-2" /> Description
                </TabsTrigger>
                <TabsTrigger
                  value="solution"
                  className="flex items-center text-gray-400"
                >
                  <Code className="h-4 w-4 mr-2" /> Solution
                </TabsTrigger>
                <TabsTrigger
                  value="submission"
                  className="flex items-center text-gray-400"
                >
                  <TerminalIcon className="h-4 w-4 mr-2" /> Submission
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="description"
                className="flex-1 overflow-auto p-6 bg-[#1e1e1e]"
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-300">
                  Problem Description
                </h3>
                <p className="mb-6 leading-relaxed text-gray-400">
                  You are given two non-empty linked lists representing two
                  non-negative integers. The digits are stored in reverse order,
                  and each node contains a single digit. Add the two numbers and
                  return the sum as a linked list.
                </p>
                <h4 className="text-xl font-semibold mb-3 text-gray-300">
                  Example:
                </h4>
                <pre className="bg-gray-900 p-4 rounded-lg text-sm shadow-inner text-gray-200">
                  <code>
                    {`Input: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807.`}
                  </code>
                </pre>
              </TabsContent>
              {/* Add content for Solution and Submission tabs as needed */}
            </Tabs>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="bg-[#1e1e1e] p-3 flex justify-between items-center border-b border-gray-700">
              <span className="font-semibold text-gray-300">Code Editor</span>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleResetCode}
                  variant="outline"
                  size="sm"
                  className="text-gray-400 border-gray-600 hover:border-gray-500 hover:bg-gray-800 transition"
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
                <Button
                  onClick={runCode}
                  disabled={isRunning}
                  size="sm"
                  className={`${
                    isRunning
                      ? "bg-blue-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  } font-medium px-4 py-1.5 rounded-md transition`}
                >
                  {isRunning ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
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
            </div>
            <div className="flex-1 overflow-hidden">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full text-white bg-center">
                    Loading...
                  </div>
                }
              >
                <MonacoEditor
                  height="100%"
                  language="javascript"
                  theme="vs-dark"
                  value={code}
                  onChange={handleEditorChange}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    lineNumbers: "on",
                    automaticLayout: true,
                    mouseWheelZoom: true,
                  }}
                />
              </Suspense>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default SolvePage;