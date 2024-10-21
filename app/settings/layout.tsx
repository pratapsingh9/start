import SideBar from "@/components/sidebar";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Settings",
  description: "Welcome To communitz",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <div className="flex flex-row">
      <SideBar />

      <div className="flex-1 h-screen overflow-y-auto">{children}</div>
    </div>
  );
}
