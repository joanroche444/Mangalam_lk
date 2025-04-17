import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const images = [
  "/dashboard1.jpg",
  "/dashboard2.jpg",
  "/dashboard3.jpg",
  "/dashboard4.jpg",
];

export default function WeddingSlider() {
  return (
    <div className="max-w-7xl mx-auto mt-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="rounded-lg shadow-lg "
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full mx-auto h-80 object-cover rounded-lg" // Adjusted width here
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
