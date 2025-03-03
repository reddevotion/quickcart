import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-4 md:px-8">
      <div className="flex items-center gap-4">
        <Image className="hidden md:block cursor-pointer" src={assets.logo}  alt="logo" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright 2025 © quickcart.com All Right Reserved.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a href="#">
          <Image src={assets.facebook_icon} alt="facebook_icon" />
        </a>
        <a href="#">
          <Image src={assets.twitter_icon} alt="twitter_icon" />
        </a>
        <a href="#">
          <Image src={assets.instagram_icon} alt="instagram_icon" />
        </a>
      </div>
    </footer    >
  );
};

export default Footer;