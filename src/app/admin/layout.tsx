import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
    <Sidebar />
    <MobileNav />
    {children}
  </>
}
