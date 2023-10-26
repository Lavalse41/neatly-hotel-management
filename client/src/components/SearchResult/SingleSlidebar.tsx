import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../App.css";
import { Parallax, Autoplay, Pagination, Navigation } from "swiper/modules";
import "@splidejs/react-splide/css";
import RoomDetailsTableType from "../../interfaces/RoomDetailsTableType";

function SingleSlidebar({ roomImages }: RoomDetailsTableType) {
  // console.log(roomImages);

  return (
    <Swiper
      className=" bg-white w-[640px] h-[400px] rounded-md"
      id="swiper-single"
      modules={[Parallax, Autoplay, Pagination, Navigation]}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      speed={400}
      style={{
        "--swiper-pagination-color": "#fff",
      }}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      // slidesOffsetBefore={-200}
      //   slidesOffsetAfter={40}
      centeredSlides={true}
      centeredSlidesBounds={true}
      navigation={true}
    >
      {roomImages.map((image) => {
        return (
          <SwiperSlide>
            <div className="w-full h-full ">
              <img
                className="w-full h-full object-cover rounded-md"
                src={image}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SingleSlidebar;
