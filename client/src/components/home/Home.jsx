import HomeCarousel from "./HomeCarousel.jsx";
import ProductType from "./ProductType.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../footer/Footer.jsx";
import { fetchProducts } from "../../redux/store.js";
import ProductsSlider from "./ProductsSlider.jsx";

const Home = () => {
  const dispatch = useDispatch();

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Access products from Redux state
  const { products, loading, error } = useSelector((state) => state.products);



  const title1 = "HOT Selling Products";
  const title2 = "Electronic Appliances";
  const title3 = "Daily Use Products";
  const title4 = "Electronics";
  const title5 = "Cheapest Price This Year";

  return (
    <div>
      <HomeCarousel />
      <ProductType />
      {/* Conditionally render based on loading or error */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <ProductsSlider products={products} title={title1} />
          <ProductsSlider products={products} title={title2} />
          <ProductsSlider products={products} title={title3} />
          <ProductsSlider products={products} title={title4} />
          <ProductsSlider products={products} title={title5} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
