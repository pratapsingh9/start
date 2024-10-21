"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function MainPage() {
  const [darkMode, setDarkMode] = useState(true);
  return (

      <div
        className={`min-h-screen ${
          darkMode ? "bg-zinc-900 text-zinc-100" : "bg-zinc-100 text-zinc-900"
        } p-8`}
      >
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">CheemtCode Settings</h1>
              <p className={`${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Manage your account settings and preferences
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="light-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Profile</h2>
              <p className={`${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Manage your CheemtCode profile
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="cheemtmaster123"
                  className={
                    darkMode
                      ? "bg-zinc-800 border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="cheemtmaster@example.com"
                  className={
                    darkMode
                      ? "bg-zinc-800 border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                className={
                  darkMode
                    ? "bg-zinc-800 border-zinc-700"
                    : "bg-white border-zinc-300"
                }
              />
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  alt="Profile picture"
                  src="/placeholder.svg?height=80&width=80"
                />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <div className="space-x-2">
                <Button variant="outline">Change Avatar</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select>
                <SelectTrigger
                  className={
                    darkMode
                      ? "bg-zinc-800 border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                >
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                  <SelectItem value="ist">India Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Coding Preferences</h2>
              <p className={`${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Customize your coding experience on CheemtCode
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-language">
                  Default Programming Language
                </Label>
                <Select>
                  <SelectTrigger
                    className={
                      darkMode
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-white border-zinc-300"
                    }
                  >
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Code Editor Theme</Label>
                <Select>
                  <SelectTrigger
                    className={
                      darkMode
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-white border-zinc-300"
                    }
                  >
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monokai">Monokai</SelectItem>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="dracula">Dracula</SelectItem>
                    <SelectItem value="solarized">Solarized</SelectItem>
                    <SelectItem value="nord">Nord</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select>
                  <SelectTrigger
                    className={
                      darkMode
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-white border-zinc-300"
                    }
                  >
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12px</SelectItem>
                    <SelectItem value="14">14px</SelectItem>
                    <SelectItem value="16">16px</SelectItem>
                    <SelectItem value="18">18px</SelectItem>
                    <SelectItem value="20">20px</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="auto-complete" />
                <Label htmlFor="auto-complete">Enable Auto-Complete</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="live-execution" />
                <Label htmlFor="live-execution">
                  Enable Live Code Execution
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="line-numbers" />
                <Label htmlFor="line-numbers">Show Line Numbers</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="minimap" />
                <Label htmlFor="minimap">Show Minimap</Label>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Practice Settings</h2>
              <p className={`${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Customize your practice routine
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Daily Practice Goal (problems per day)</Label>
                <Slider
                  defaultValue={[3]}
                  max={10}
                  step={1}
                  className={darkMode ? "bg-zinc-800" : "bg-zinc-200"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Preferred Problem Difficulty</Label>
                <Select>
                  <SelectTrigger
                    className={
                      darkMode
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-white border-zinc-300"
                    }
                  >
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic-focus">Topic Focus</Label>
                <Select>
                  <SelectTrigger
                    className={
                      darkMode
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-white border-zinc-300"
                    }
                  >
                    <SelectValue placeholder="Select topic focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    <SelectItem value="arrays">Arrays</SelectItem>
                    <SelectItem value="strings">Strings</SelectItem>
                    <SelectItem value="linked-lists">Linked Lists</SelectItem>
                    <SelectItem value="trees">Trees</SelectItem>
                    <SelectItem value="dynamic-programming">
                      Dynamic Programming
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="contest-reminders" />
                <Label htmlFor="contest-reminders">
                  Receive Contest Reminders
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="daily-challenge" />
                <Label htmlFor="daily-challenge">
                  Participate in Daily Challenges
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="progress-tracking" />
                <Label htmlFor="progress-tracking">
                  Enable Progress Tracking
                </Label>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">
                Notification Preferences
              </h2>
              <p className={`${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Manage how you receive notifications
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="email-notifications" />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="push-notifications" />
                <Label htmlFor="push-notifications">Push Notifications</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="weekly-digest" />
                <Label htmlFor="weekly-digest">Weekly Progress Digest</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="achievement-alerts" />
                <Label htmlFor="achievement-alerts">Achievement Alerts</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="friend-activity" />
                <Label htmlFor="friend-activity">Friend Activity Updates</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-frequency">
                  Notification Frequency
                </Label>
                <Select>
                  <SelectTrigger
                    className={
                      darkMode
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-white border-zinc-300"
                    }
                  >
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Privacy Settings</h2>
              <p className={`${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Control your privacy on CheemtCode
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="public-profile" />
                <Label htmlFor="public-profile">Make Profile Public</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="show-activity" />
                <Label htmlFor="show-activity">Show Activity on Profile</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="allow-messaging" />
                <Label htmlFor="allow-messaging">Allow Direct Messaging</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="show-online-status" />
                <Label htmlFor="show-online-status">Show Online Status</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="share-solutions" />
                <Label htmlFor="share-solutions">Share My Solutions</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-usage">Data Usage</Label>
                <Select>
                  <SelectTrigger
                    className={
                      darkMode
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-white border-zinc-300"
                    }
                  >
                    <SelectValue placeholder="Select data usage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="essential">Essential Only</SelectItem>
                    <SelectItem value="performance">
                      Performance Improvements
                    </SelectItem>
                    <SelectItem value="full">Full Data Usage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Appearance Settings</h2>
              <p className={`${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Customize the look and feel of CheemtCode
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ui-theme">UI Theme</Label>
                <Select>
                  <SelectTrigger
                    className={
                      darkMode
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-white border-zinc-300"
                    }
                  >
                    <SelectValue placeholder="Select UI theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System Default</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent-color">Accent Color</Label>
                <Select>
                  <SelectTrigger
                    className={
                      darkMode
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-white border-zinc-300"
                    }
                  >
                    <SelectValue placeholder="Select accent color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-family">Font Family</Label>
                <Select>
                  <SelectTrigger
                    className={
                      darkMode
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-white border-zinc-300"
                    }
                  >
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System Default</SelectItem>
                    <SelectItem value="sans-serif">Sans-serif</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="monospace">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="animations" />
                <Label htmlFor="animations">Enable UI Animations</Label>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Integrations</h2>
              <p className={`${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Connect your CheemtCode account with other services
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>GitHub</Label>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    Connect your GitHub account
                  </p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>LeetCode</Label>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    Sync your LeetCode progress
                  </p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>HackerRank</Label>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    Import your HackerRank badges
                  </p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Discord</Label>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    Join our community Discord
                  </p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </div>
          </section>
        </div>
      </div>
  );
}
