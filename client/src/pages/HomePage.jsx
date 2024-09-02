import BannerSummerSale from "../homepage/BannerSummerSale";
import Hero from "../homepage/Hero";
import PopularProductsSection from "../homepage/PopularProductsSection";
import LatestProducts from "../homepage/LatestProducts";
import ChatComplaint from "../homepage/ChatComplaint";

function HomePage() {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <PopularProductsSection />
      <BannerSummerSale />
      <LatestProducts />
      <ChatComplaint />
    </div>
  );
}
export default HomePage;
