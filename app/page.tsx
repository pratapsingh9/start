'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Users, PlusCircle, MessageSquare, Share2, Menu, Github, Twitter, Facebook, Instagram } from "lucide-react"
const redirect: boolean = false;

const card = () => {
  return(
    <div>

    </div>
  )
}



export default function Component() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (redirect) {
      router.push('/home')
    }
  }, [])



  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] grid-rows-[repeat(auto-fill,minmax(50px,1fr))] opacity-5 pointer-events-none">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-white"></div>
        ))}
      </div>

      <div className="relative z-10">
        <header className={`px-4 lg:px-6 h-16 flex items-center fixed w-full top-0 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-black/50' : ''}`}>
          <Link className="flex items-center justify-center" href="#">
            <Users className="h-6 w-6 mr-2" />
            <span className="font-bold">CommunityHub</span>
          </Link>
          <nav className={`ml-auto ${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-black md:bg-transparent pb-4 md:pb-0`}>
            <div className="flex items-center justify-center md:justify-start">
              {['Features', 'Pricing', 'About', 'Contact'].map((item, index) => (
                <Link
                  key={index}
                  className="text-sm mt-2 mb-2 font-medium hover:text-gray-300 transition-colors px-4 py-2 md:py-0"
                  href="#"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
           
            <div className="mr-2"></div>
          </nav>
          <Button variant="ghost" className="ml-auto md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>

        </header>
        <main className="pt-16">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4">
            <div className="container mx-auto">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2 max-w-3xl mx-auto">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                    Connect, Create, Collaborate
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-400 text-lg sm:text-xl md:text-2xl mt-4">
                    Join CommunityHub and be part of a vibrant ecosystem of communities.
                  </p>
                </div>
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                  <Button className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 transition-colors"  onClick={()=> {
                    router.replace('/home')
                  }} >Get Started</Button>
                  <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black transition-colors">Learn More</Button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 backdrop-blur-lg bg-white/5">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-12">Featured Communities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Tech Enthusiasts', 'Fitness Fanatics', 'Book Lovers'].map((community, index) => (
                  <Card key={index} className="bg-black/50 border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-black/70">
                    <CardHeader>
                      <CardTitle>{community}</CardTitle>
                      <CardDescription className="text-gray-400">Join the conversation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400">Join {5000 + index * 1000}+ members</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-white text-black hover:bg-gray-200 transition-colors">Join Community</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4">
              <div className="flex flex-col justify-center space-y-8 text-center">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">Create Your Own Community</h2>
                  <p className="max-w-[600px] text-gray-400 text-base sm:text-lg md:text-xl mx-auto">
                    Start your own community and bring people together around shared interests or goals.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2 mx-auto">
                  <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Input className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white transition-all" placeholder="Enter community name" type="text" />
                    <Button type="submit" className="bg-white text-black hover:bg-gray-200 transition-colors">Create</Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 backdrop-blur-lg bg-white/5">
            <div className="container mx-auto px-4">
              <div className="flex flex-col justify-center space-y-8 text-center">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">Why Choose CommunityHub?</h2>
                  <p className="max-w-[600px] text-gray-400 text-base sm:text-lg md:text-xl mx-auto">
                    Discover the features that make our platform stand out.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {[
                    { icon: PlusCircle, title: "Easy Creation", description: "Create and customize your community in minutes." },
                    { icon: MessageSquare, title: "Engaging Discussions", description: "Foster meaningful conversations with powerful tools." },
                    { icon: Share2, title: "Easy Sharing", description: "Share content and ideas effortlessly within your community." }
                  ].map((feature, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-black/50 backdrop-blur-md transition-all duration-300 hover:bg-black/70">
                      <feature.icon className="h-12 w-12 text-white" />
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="w-full bg-black text-white py-12 px-4 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4 animate-fade-in-up">
                <Link href="#" className="flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  <span className="font-bold text-xl">CommunityHub</span>
                </Link>
                <p className="text-sm text-gray-400">
                  Connecting people, fostering communities, and inspiring collaboration.
                </p>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {['Home', 'About Us', 'Features', 'Pricing', 'Contact'].map((item, index) => (
                    <li key={index} className="transform transition-transform duration-300 hover:translate-x-2">
                      <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h3 className="font-semibold text-lg mb-4">Community</h3>
                <ul className="space-y-2">
                  {['Guidelines', 'FAQs', 'Support', 'API', 'Developers'].map((item, index) => (
                    <li key={index} className="transform transition-transform duration-300 hover:translate-x-2">
                      <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <h3 className="font-semibold text-lg mb-4">Stay Connected</h3>
                <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for updates</p>
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-500 focus:ring-2 focus:ring-white transition-all"
                  />
                  <Button type="submit" className="bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                    Subscribe
                  </Button>
                </form>
                <div className="flex space-x-4 mt-4">
                  {[Twitter, Facebook, Instagram, Github].map((Icon, index) => (
                    <Link key={index} href="#" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300">
                      <Icon className="h-5 w-5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <p className="text-sm text-gray-400">
                © 2023 CommunityHub. All rights reserved.
              </p>
              <div className="mt-2 space-x-4">
                <Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        </footer>
      </div>
    </div>
  )
}