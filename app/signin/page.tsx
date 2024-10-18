'use client'
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SigninPage() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/explore");
    }
  }, [status, router]);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoogleClick = () => {
    signIn("google");
  };

  const handleSignIn = () => {
    // Implement sign-in logic here
    console.log("Signing in with:", formState);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center mb-4">
            <ArrowLeft className="w-6 h-6 mr-4 cursor-pointer text-gray-600" onClick={() => router.replace('/')} />
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-full mr-3" />
              <CardTitle className="text-2xl font-bold">SurBack AI</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Sign in to your account</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="mb-4"
                  onChange={handleForm}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="mb-4"
                  onChange={handleForm}
                />
                <Button className="w-full mb-4" onClick={handleSignIn}>
                  Sign In
                </Button>
              </form>
              <div className="flex items-center justify-between mb-4">
                <hr className="flex-1 border-gray-300" />
                <span className="px-4 text-gray-500">OR</span>
                <hr className="flex-1 border-gray-300" />
              </div>
              <Button variant="outline" className="w-full" onClick={handleGoogleClick}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </Button>
            </div>
            <div className="hidden md:flex flex-col justify-center items-center bg-gray-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Cheem Tcode</h3>
              <p className="text-lg text-center mb-4">"Code with fun and passion!"</p>
              <blockquote className="italic text-gray-600">
                "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
              </blockquote>
              <p className="mt-2 font-semibold">- Jules Winnfield, CEO, Acme Inc.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}