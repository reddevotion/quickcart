import Navbar from "@/componets/seller/Navbar";
import Footer from "@/componets/seller/Footer";
import SideBar from "@/componets/seller/SideBar";



export default function SellersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar/>
    <div className="flex">
      <SideBar/>
      <div className="flex flex-col flex-1">
        {children}
        <Footer/>
      </div>
    </div>
    </>
  );
}
