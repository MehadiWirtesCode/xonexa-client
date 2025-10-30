import { Hero } from "../components/Hero";
import NewestProducts from "../components/NewestProducts";
import ShopLocations from "../components/ShopLocations";
import { useRef } from "react";
import TopProducts from "../components/TopProducts";
import FeaturedCategories from "../components/FeaturedCategories";
import TrustBanner from "../components/TrustBanner";
const Home = () => {
  const shopLocationRef = useRef(null);

  const scrollToShopLocations = () => {
    shopLocationRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center", 
    });
  };

  return (
    <>
      <Hero scrollToLocation={scrollToShopLocations} />
      <FeaturedCategories/>
      <NewestProducts />
      <TopProducts />
      <div ref={shopLocationRef}>
        <ShopLocations />
      </div>
      <TrustBanner/>
    </>
  );
};
export default Home;
