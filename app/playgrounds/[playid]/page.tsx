"use client";

import React, { useState, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { PlayCircle, RefreshCcw } from "lucide-react";
import { SideBar } from "@/components/sidebar";
import Terminal from "@/components/terminal";

type PlaygroundProps = {
  params: {
    playid: string;
  };
};

var starterCode = ` // Write Your Code Here`;

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function Playground({ params }: PlaygroundProps) {
  const [code, setCode] = useState<any>();
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<any>(null);

  const handleEditorChange = useCallback((value: any) => {
    setCode(value || "");
  }, []);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput("");
    if (code !== starterCode) {
      try {
        const value = eval(code);
        setOutput(value);
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
    }
    setIsRunning(false);
  }, [code]);

  const resetCode = () => {
    setCode(starterCode);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-3 bg-[#1e1e1e] text-white shadow-lg border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {/* Add an icon (or logo) similar to VS Code */}
              <div className="bg-blue-600 p-1.5 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M12 0L2 12h10v12l10-12H12z" />
                </svg>
              </div>
              <h1 className="text-lg font-semibold">
                Playground: {params.playid}
              </h1>
            </div>
          </div>
          <div className="space-x-3 flex items-center">
            <Button
              onClick={resetCode}
              variant="outline"
              size="sm"
              className="text-gray-400 border-gray-600 hover:border-gray-500 hover:bg-gray-800 transition"
            >
              <RefreshCcw className="h-5 w-5" />
            </Button>
            <Button
              onClick={runCode}
              disabled={isRunning}
              className={`${
                isRunning
                  ? "bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              } font-medium px-4 py-1.5 rounded-md transition`}
              size="sm"
            >
              {isRunning ? (
                <span className="flex items-center sm:ml-10">
                  <svg
                    className="animate-spin h-4 w-4 mr-2 text-white"
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
        </header>

        <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
          <div className="flex-1">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full text-white">
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
          <Terminal output={output} />
        </div>
      </div>
    </div>
  );
}
