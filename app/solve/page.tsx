'use client'
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, PlayCircle, Check, X, Code } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const SolvePage = () => {
  const [code, setCode] = useState(`class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        # Your code here
`);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');
  const focusRef = useRef(null);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const runCode = () => {
    // In a real application, this would send the code to a backend for execution
    setOutput('Output: [2,4,3]');
    setStatus('success');
  };

  return (
    <div className="flex-1 h-screen bg-gray-50 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <Link href="/explore" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2" />
            Back to Problems
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center">
            <Code size={36} className="mr-2 text-blue-600" />
            Add Two Numbers
          </h1>
          <div className="relative w-full md:w-auto">
            <Input
              ref={focusRef}
              type="text"
              placeholder="Search other problems"
              className="pl-10 pr-4 py-2 w-full md:w-80 border-2 border-gray-200 focus:border-blue-500 rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Problem Description</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              <p>
                You are given two non-empty linked lists representing two non-negative integers. 
                The digits are stored in reverse order, and each of their nodes contains a single digit. 
                Add the two numbers and return the sum as a linked list.
              </p>
              <h3 className="font-semibold mt-4 mb-2">Example:</h3>
              <pre className="bg-gray-100 p-2 rounded">
                Input: l1 = [2,4,3], l2 = [5,6,4]
                Output: [7,0,8]
                Explanation: 342 + 465 = 807.
              </pre>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg flex-grow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Code Editor</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] p-0">
                <MonacoEditor
                  height="100%"
                  language="python"
                  theme="vs-dark"
                  value={code}
                  onChange={handleEditorChange}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                  }}
                />
              </CardContent>
            </Card>

            <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Output</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-2 rounded">
                  {output || 'Run your code to see the output'}
                </pre>
              </CardContent>
              <CardFooter>
                {status && (
                  <div className={`flex items-center ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {status === 'success' ? <Check className="mr-2" /> : <X className="mr-2" />}
                    {status === 'success' ? 'All test cases passed!' : 'Some test cases failed.'}
                  </div>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={runCode} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            <PlayCircle className="mr-2" />
            Run Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SolvePage;