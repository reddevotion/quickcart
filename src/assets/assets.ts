import logo from "./logo.svg";
import star_icon from "./star_icon.svg";
import star_dull_icon  from "./star_dull_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import arrow_icon_white from "./arrow_icon_white.svg";
import header_headphone_image from "./header_headphone_image.png";
import header_playstation_image from "./header_playstation_image.png";
import header_macbook_image from "./header_macbook_image.png";
import facebook_icon from "./facebook_icon.svg";
import instagram_icon  from "./instagram_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import upload_area from "./upload_area.png";
import girl_with_headphone_image from "./girl_with_headphone_image.png";
import boy_with_laptop_image from "./boy_with_laptop_image.png";
import girl_with_earphone_image from "./girl_with_earphone_image.png";
import redirect_icon from "./redirect_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg"
import increase_arrow from "./increase_arrow.svg"
import decrease_arrow from "./decrease_arrow.svg"
import my_location_image from "./my_location_image.svg"




export const assets = {
    logo,
    arrow_icon,
    star_icon,
    star_dull_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    upload_area,
    redirect_icon,
    arrow_icon_white,
    arrow_right_icon_colored,
    increase_arrow,
    decrease_arrow,
    my_location_image
};

export const links = [{name: "Home",href: "/"}, {name: "Shop",href: "/all-products  "}, {name: "About Us",href: "/"},{name: "Contact",href: "/"}] as const;

export const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: header_macbook_image,
    },
  ] as const

  export const products = [
    {
      id: 1,
      image: girl_with_headphone_image,
      title: "Unparalleled Sound",
      description: "Experience crystal-clear audio with premium headphones.",
    },
    {
      id: 2,
      image: girl_with_earphone_image,
      title: "Stay Connected",
      description: "Compact and stylish earphones for every occasion.",
    },
    {
      id: 3,
      image: boy_with_laptop_image,
      title: "Power in Every Pixel",
      description: "Shop the latest laptops for work, gaming, and more.",
    },
  ] as const;
  

