'use client'
import React, { useState } from 'react';
import { Users, Search, Image, Settings, Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SideBar } from '@/components/sidebar';
import RightBar from '@/components/rightbar';

const steps = [
  { title: "Basic Info", icon: Users },
  { title: "Description", icon: Search },
  { title: "Cover Image", icon: Image },
  { title: "Settings", icon: Settings },
];


  const js = () => {
     
  }

const StepIndicator = ({ currentStep }) => (
  <div className="flex justify-between mb-8">
    {steps.map((step, index) => (
      <div key={index} className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
          {index < currentStep ? <Check size={20} /> : <step.icon size={20} />}
        </div>
        <span className="mt-2 text-sm">{step.title}</span>
      </div>
    ))}
  </div>
);

const CommunityCreationStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    coverImage: null,
    privacy: 'public',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, coverImage: e.target.files[0] }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

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
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
              <Image size={24} />
              <span className="mt-2 text-base leading-normal">Select a file</span>
              <input type='file' className="hidden" onChange={handleFileChange} />
            </label>
            {formData.coverImage && <p className="mt-2">{formData.coverImage.name}</p>}
          </div>
        );
      case 3:
        return (
          <div>
            <p className="mb-2">Privacy Settings:</p>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="public"
                name="privacy"
                value="public"
                checked={formData.privacy === 'public'}
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
                checked={formData.privacy === 'private'}
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
    <div className="flex-1 h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Create Your Community</h1>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Step {currentStep + 1}: {steps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <StepIndicator currentStep={currentStep} />
          {renderStepContent()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous</Button>
          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">Create Community</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

const App = () => (
  <div className="flex bg-gray-50">
    <SideBar />
    <CommunityCreationStepper />
    <RightBar />
  </div>
);

export default App;