import { Navigation, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContext } from "react";
import { RoomsContext } from "../../App.tsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../../App.css";
import "../../App.css";
import RoomsProps from "../../interfaces/RoomsProps.ts";

function SlideBarLandingPage() {
  const context = useContext(RoomsContext);
  // console.log(context.rooms);

  return (
    <Swiper
      className=" bg-white"
      id="swiper-color"
      modules={[Navigation, Autoplay, A11y]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      spaceBetween={16}
      slidesPerView={"auto"}
      breakpoints={{
        "@0.00": {
          slidesPerView: 1,
          spaceBetween: 20,
          slidesOffsetBefore: 30,
        },
        "@0.75": {
          slidesPerView: 1,
          spaceBetween: 400,
          slidesOffsetBefore: 70,
          slidesOffsetAfter: 40,
        },
        "@1.00": {
          slidesPerView: 2,
          spaceBetween: 50,
          slidesOffsetBefore: -82,
          // slidesOffsetAfter:80,
        },
        "@1.50": {
          slidesPerView: "auto",
          spaceBetween: 16,
        },
      }}
      initialSlide={3}
      centeredSlides={true}
      centeredSlidesBounds={true}
      navigation
    >
      {context.rooms.map((room: RoomsProps) => {
        return (
          <div>
            <SwiperSlide className=" w-fit">
              <div className="w-[400px] h-[500px] ml-4">
                <img
                  alt="room image"
                  className="w-full h-full object-cover"
                  src={room.room_images[0]}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className=" w-fit">
              <div className="w-[400px] h-[500px] ml-4">
                <img
                  alt="room image"
                  className="w-full h-full object-cover"
                  src={room.room_images[1]}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className=" w-fit">
              <div className="w-[400px] h-[500px] ml-4">
                <img
                  alt="room image"
                  className="w-full h-full object-cover"
                  src={room.room_images[2]}
                />
              </div>
            </SwiperSlide>
          </div>
        );
      })}
    </Swiper>
  );
}

export default SlideBarLandingPage;
