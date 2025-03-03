import Footer from "@/componets/Footer";
import Navbar from "@/componets/Navbar";



export default function AllusersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar/>
    {children}
    <Footer/>
    </>
  );
}
