import Footer from "@/Components/Shared/Footer";
import Sidebar from "@/Components/Shared/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
}