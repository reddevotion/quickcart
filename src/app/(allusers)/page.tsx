import Banner from "@/componets/Banner";
import FeaturedProduct from "@/componets/FeaturedProducts";
import HeaderSlider from "@/componets/HeaderSlider";
import NewsLetter from "@/componets/NewsLetter";
import ProductList from "@/componets/ProductList";

export default function Home() {
  return (
    <div className="section">
      <HeaderSlider/>
      <ProductList title="Popular products" home={true}/>
      <FeaturedProduct/>
      <Banner/>
      <NewsLetter/>
    </div>
  );
}
