'use client'
import RightBar from "@/components/rightbar";
import { SideBar } from "@/components/sidebar";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ArrowLeft, Calendar, FileText, Hash, Inbox, Info, InfoIcon, Link2, LinkIcon, Paperclip, PlusCircle, Send, SendHorizonalIcon, SendIcon, SendToBackIcon, Share2Icon, ShareIcon, Smile } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { initialMessages, Message } from "@/types/msgtypes";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
const MainGroupScreen = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const router = useRouter();
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        author: 'You',
        avatar: '/placeholder.svg?height=40&width=40',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-black flex-grow text-white overflow-hidden h-screen w-8/12 flex flex-col border-r border-gray-300">
      <header className="h-16 flex items-center justify-between border-b border-gray-800 px-6">
        <div className="h-14 w-14 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800"
          onClick={() => router.replace('/')}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-semibold">Container</h1>
        <div className="cursor-pointer hover:bg-gray-800">
          <InfoIcon className="text-white" />
        </div>
      </header>

      <main className="flex-grow flex flex-col overflow-hidden">
        <ScrollArea className="flex-grow p-4 px-12 overflow-y-auto" >
          {messages.map((message) => (
            <div key={message.id} className="flex items-start my-4 space-x-3 mb-4">
              <Avatar>
                <AvatarImage src={message.avatar} alt={message.author} />
                <AvatarFallback>{message.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{message.author}</span>
                  <span className="text-sm text-white text-opacity-60">{message.timestamp}</span>
                </div>
                <p className="mt-1 text-white text-opacity-90">{message.content}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </main>

      <footer className="p-4 border-t border-white border-opacity-10 bg-black">
        <div className="flex items-center space-x-2 w-full">
          <Button variant="ghost" size="icon" className="text-white text-opacity-60">
            <Paperclip className="w-5 h-5">
              <input type="file" />
            </Paperclip>

          </Button>
          <div className="flex-grow flex items-center space-x-2">
            <Input
              placeholder="Type a message..."
              className="flex-grow bg-white bg-opacity-5 border-white border-opacity-10 text-white placeholder-white placeholder-opacity-60"
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <Button variant="ghost" size="icon" className="text-white text-opacity-60">
              <Smile className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              className="bg-white text-black"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <div className="bg-black h-screen flex">
      <SideBar />
      <MainGroupScreen />
      <RightBar />
    </div>
  );
}