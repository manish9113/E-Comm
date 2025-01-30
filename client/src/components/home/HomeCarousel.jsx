import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { styled } from "@mui/material"; 

const StyledCarousel=styled(Carousel)`
height: 70vh;
width: 100%;
     

`

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const HomeCarousel = () => {
  return (
    <div style={{ marginTop: 56 }}>
      <StyledCarousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
       
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img src="/images/img1.jpg" alt="img1" style={{ height: '100%', width: '100%', maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}/></div>
        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ><img src="/images/img2.jpg" alt="img2" style={{ height: '100%', width: '100%', maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}/></div>
        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img src="/images/img3.jpg" alt="img3" style={{ height: '100%', width: '100%', maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}/></div>
        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img src="/images/img4.jpg" alt="img4" style={{ height: '100%', width: '100%', maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}/></div>
      </StyledCarousel>
      
    </div>
  );
};
export default HomeCarousel;
