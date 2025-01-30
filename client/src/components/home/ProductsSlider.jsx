import { Typography, Box, styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 7,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const StyledCarousel = styled(Carousel)`
  max-height: 60vh;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  width: 98%;
  background-color: #ebe8e7;
`;

const Image = styled("img")({
  width: "auto",
  height: 150,
});

const ProductsSlider = ({ products, title }) => {
  return (
    <Box>
      <Box style={{ margin: 15 }}>
        <Typography style={{ fontWeight: 600 }}>{title}</Typography>
      </Box>

      <StyledCarousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        infinite={true}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px"
      >
        {products && products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product.id} // Corrected key prop placement
              to={`/products/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Paper elevation={3} style={{ cursor: "pointer", margin: 2 }}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image src={product.url} alt={product.category} />
                </Box>
                <Typography
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {product.title.shortTitle}
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  RS-{product.price.cost}
                </Typography>
              </Paper>
            </Link>
          ))
        ) : (
          <div>No products available</div>
        )}
      </StyledCarousel>
    </Box>
  );
};

export default ProductsSlider;
