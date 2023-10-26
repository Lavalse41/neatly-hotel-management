import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../App.css";
import { Parallax, Autoplay, Pagination, Navigation } from "swiper/modules";

function RoomDetailSlidebar({ roomImages }: { roomImages: string[] }) {
  return (
    <div className="bg-transparent z-0">
      <Swiper
        className="bg-transparent"
        id="swiper-color"
        modules={[Parallax, Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={400}
        style={{
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={24}
        slidesPerView={"auto"}
        initialSlide={2}
        pagination={{
          clickable: true,
        }}
        // slidesOffsetBefore={-200}
        //   slidesOffsetAfter={40}
        centeredSlides={true}
        centeredSlidesBounds={true}
        navigation={true}
      >
        {roomImages.map((image, index) => {
          return (
            <div key={index}>
              <SwiperSlide className=" w-fit z-0">
                <div className="w-[930px] h-[580px] ml-4">
                  <img
                    className="w-full h-full object-cover"
                    src={image}
                    alt="image slide"
                  />
                </div>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </div>
  );
}

export default RoomDetailSlidebar;
