import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Glimpses.css";

const images = [
  "./images/img1.jpg",
  "./images/img2.jpg",
  "./images/img3.jpg",
  "./images/img4.jpg",
  "./images/img5.jpg",
  "./images/img6.jpg",
  "./images/img7.jpg",
  "./images/img10.jpg",
];

const Glimpses = () => {
  return (
    <div className="glimpses-container" data-aos="fade-up">
      <h2 className="section-title text-center mb-5">
          <span className="glimpses-heading">Glimpses</span>
          <br />
      </h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },  // Mobile (1 image per slide)
          640: { slidesPerView: 1 },  
          768: { slidesPerView: 2 },  // Tablet (2 images per slide)
          1024: { slidesPerView: 3 }, // Desktop (3 images per slide)
        }}
        className="glimpses-slider"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="glimpses-slide">
            <img src={img} alt={`Event ${index + 1}`} className="glimpse-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Glimpses;
