import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/app/globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Providers from "@/utils/Providers";
import { AppContextProvider } from "@/context/AppContext";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })
export const metadata: Metadata = {
  title: "QuickCart",
  description: "Shop premium electronics and cutting-edge technology at QuickCart. Explore top-rated audio, computing, and entertainment devices with fast shipping and exclusive deals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${outfit.className} antialiased`}
      >
        <ClerkLoading>
          <div className="fixed top-0 w-screen h-screen bg-white flex justify-center items-center">
            <p className="text-2xl font-bold text-gray-800">Loading...</p>
          </div>
        </ClerkLoading>
        <ClerkLoaded>
        <Toaster position="bottom-right"
  reverseOrder={false}/>       
          <Providers>
          <AppContextProvider>
            {children}
          </AppContextProvider>
          </Providers>
        </ClerkLoaded>
      </body>
    </html>
    </ClerkProvider>
  );
}
