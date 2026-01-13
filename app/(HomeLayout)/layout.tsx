import Footer from "@/Components/Shared/Footer";
import Navbar from "@/Components/Shared/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
        <Navbar />
        {children}
        <Footer />
    </div>
  );
}
