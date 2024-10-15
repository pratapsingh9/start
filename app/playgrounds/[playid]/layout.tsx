import { SideBar } from "@/components/sidebar";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Playground",
  description: "Enjoy Your Playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className="h-screen flex">
        <SideBar />
        <div className="flex-1 overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
