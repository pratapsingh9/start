"use client";
import React, { useState, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { PlayCircle, RefreshCcw, Sidebar } from "lucide-react";

type PlaygroundProps = {
  params: {
    playid: string;
  };
};

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function ({ params }: PlaygroundProps) {
  const [code, setCode] = useState(`function addTwoNumbers(l1, l2) {
  // Your code here
}`);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");

  const handleEditorChange = useCallback((value: string | undefined) => {
    setCode(value || "");
  }, []);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput("");

    // Simulate code execution
    setTimeout(() => {
      setOutput("Output: [7, 0, 8]");
      setIsRunning(false);
    }, 1500);
  }, []);

  const resetCode = () => {
    setCode(`function addTwoNumbers(l1, l2) {
  // Your code here
}`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-xl font-semibold">Playground id:{params.playid}</h1>
        <div className="space-x-2 flex items-center">
          <Button
            onClick={resetCode}
            variant="outline"
            size="sm"
            className="text-cyan-400 border-cyan-400"
          >
            <RefreshCcw className="h-5 w-5" />
          </Button>
          <Button
            onClick={runCode}
            disabled={isRunning}
            className={`${
              isRunning ? "bg-cyan-600" : "bg-cyan-500 hover:bg-cyan-600"
            } text-white transition-colors duration-200`}
            size="sm"
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
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 bg-black h-full">
            {" "}
            {/* Ensure this has a height */}
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
          <div className="p-4 bg-gray-800">
            <h3 className="text-lg font-semibold">Output</h3>
            <pre className="bg-gray-900 p-4 rounded-lg mt-2 text-gray-200">
              {output || "No output yet."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
