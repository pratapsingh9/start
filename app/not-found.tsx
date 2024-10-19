"use client";

import SideBar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row h-screen text-white 00">
      <SideBar />

      <div className="flex-1 flex justify-center items-center p-4 md:p-8">
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="w-16 h-16 md:w-20 md:h-20 text-red-500 mb-4 md:mb-6" />

          <h1 className="text-4xl md:text-6xl font-bold mb-2 md:mb-4">
            Error : 404
          </h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4 w-full flex flex-col md:flex-row justify-center">
            <Button
              onClick={() => router.push("/")}
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 w-full md:w-auto"
            >
              Go Home
            </Button>

            <Button
              onClick={() => router.back()}
              variant="outline"
              className="border-white text-white hover:bg-gray-800 px-6 py-3 w-full md:w-auto"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
