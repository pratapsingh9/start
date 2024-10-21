"use client";
import React, { useState } from "react";
import {
  Users,
  Search,
  Image,
  Settings,
  Check,
  ArrowUpSquare,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SideBar } from "@/components/sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";

const steps = [
  { title: "Basic Info", icon: Users },
  { title: "Description", icon: Search },
  { title: "Cover Image", icon: Image },
  { title: "Settings", icon: Settings },
];

const StepIndicator = ({ currentStep }) => (
  <div className="flex justify-between mb-8">
    {steps.map((step, index) => (
      <div key={index} className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out transform ${
            index <= currentStep
              ? "bg-blue-600 text-white scale-110"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {index < currentStep ? <Check size={20} /> : <step.icon size={20} />}
        </div>
        <span
          className={`mt-2 text-sm ${
            index <= currentStep
              ? "text-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          {step.title}
        </span>
      </div>
    ))}
  </div>
);

const CommunityCreationStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    coverImage: null,
    privacy: "public",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, coverImage: e.target.files[0] }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  async function handleSubmit() {
    console.log("Form submitted:", formData);
    const request = await axios.post("create/community", formData);
    if (request.status === 200) {
      console.log("Community created successfully");
      setTimeout(() => {
        console.log("Redirecting to channel page");
      }, 500);
      router.replace(`/channel/${formData.name}`);
    } else {
      console.log("Error creating community");
      alert("Error creating community");
    }
  }
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Community Name"
              className="mb-4"
            />
            <Input
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Category"
            />
          </>
        );
      case 1:
        return (
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your community..."
            rows={5}
          />
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            <label className="w-64 flex flex-col items-center px-6 py-8 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out">
              <Image size={32} className="mb-2" />
              <span className="text-base font-semibold">Choose a file</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {formData.coverImage && (
              <div className="mt-4 w-full flex flex-col items-center">
                <p className="text-sm text-gray-700">
                  {formData.coverImage.name}
                </p>

                {/* Progress Bar (only show when file is uploading) */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <p className="mb-2 text-lg font-semibold">Privacy Settings:</p>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="public"
                name="privacy"
                value="public"
                checked={formData.privacy === "public"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="public">Public</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="private"
                name="privacy"
                value="private"
                checked={formData.privacy === "private"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="private">Private</label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Create Your Community
      </h1>
      <Card className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg">
        <CardHeader className="p-6">
          <CardTitle className="text-xl font-semibold text-gray-700">
            Step {currentStep + 1}: {steps[currentStep].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <StepIndicator currentStep={currentStep} />
          {renderStepContent()}
        </CardContent>
        <CardFooter className="p-6 flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="ghost"
            className="bg-gray-200 hover:bg-gray-300"
          >
            Previous
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Create Community
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

const App = () => (
  <div className="flex bg-gray-50 min-h-screen">
    <SideBar />
    <CommunityCreationStepper />
  </div>
);

export default App;
