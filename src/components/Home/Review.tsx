import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../App.css";

import { Parallax, Autoplay, Pagination, Navigation } from "swiper/modules";

function Reviews() {
  return (
    <div className=" bg-green-200 pb-[150px] pt-20 relative">
      <div className="mb-6 font-noto-serif-display text-green-800 text-headline2 text-center absolute left-0 right-0 z-40">
        Our Customer Says
      </div>

      <Swiper
        className=" bg-green-200 w-[950px]"
        style={{
          "--swiper-pagination-color": "#fff",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        id="swiper-color2"
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Autoplay, Pagination, Navigation]}
      >
        <div
          slot="container-start"
          // className="parallax-bg"
          className=" bg-white"
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide>
          <div className="py-28 flex flex-col items-center justify-center bg-green-200">
            <div className="flex items-center">
              <div className="px-16 py-16 max-w-[840px] text-center">
                “Welcome to my unbiased review of Neatly Hotel, an exquisite 5-star accommodation located in the vibrant city of Bangkok, Thailand. As a seasoned traveler myself, I understand the importance of finding the perfect place to stay, and Neatly Hotel has left no stone unturned in providing a world-class experience for its guests. In this review, I will delve into the key features it offers, from its luxurious rooms to its extensive facilities and impeccable service.”
              </div>
            </div>

            <div className="flex items-center">
              <img
                className="w-8 mr-4 rounded-full"
                alt="customer-image"
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/avatar1.jfif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2F2YXRhcjEuamZpZiIsImlhdCI6MTY5MzcxMTAyMSwiZXhwIjoxNzI1MjQ3MDIxfQ.qtzzYYCZXiVQfReMfoNNvpf-dYZRf1o06BqQehBQSjA&t=2023-09-03T03%3A17%3A00.451Z"
              />
              <span className="text-gray-600">Katherine, Company®</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-28 flex flex-col items-center justify-center bg-green-200">
            <div className="flex items-center">
              <div className="px-16 py-16 max-w-[840px] text-center">
                “Neatly Hotel prides itself on offering top-notch rooms that exude both comfort and elegance. Upon entering the hotel, guests are greeted by tastefully decorated spaces that combine modern aesthetics with a touch of Thai charm.”
              </div>
            </div>

            <div className="flex items-center">
              <img
                className="w-8 mr-4 rounded-full"
                alt="customer-image"
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/customer_said/customer2.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9jdXN0b21lcl9zYWlkL2N1c3RvbWVyMi5zdmciLCJpYXQiOjE2OTUyNjQyMzksImV4cCI6MTcyNjgwMDIzOX0.TKMMP0ReNjxSWJaVm9e_UL1C9qVziMrs1W09Nr2o790&t=2023-09-21T02%3A43%3A59.463Z"
              />
              <span className="text-gray-600">Merkado, Company®</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-28 flex flex-col items-center justify-center bg-green-200">
            <div className="flex items-center">
              <div className="px-16 py-16 max-w-[840px] text-center">
                “For those seeking relaxation and rejuvenation, Neatly Hotel offers an array of facilities that will exceed your expectations. The outdoor pool is a perfect retreat, where you can soak up the sun while enjoying a refreshing dip.”
              </div>
            </div>

            <div className="flex items-center">
              <img
                className="w-8 mr-4 rounded-full"
                alt="customer-image"
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/customer_said/customer3.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9jdXN0b21lcl9zYWlkL2N1c3RvbWVyMy5zdmciLCJpYXQiOjE2OTUyNjQyNjgsImV4cCI6MTcyNjgwMDI2OH0.4NiFxWlNTWHqDsoxHNR9d156DmKOSQIHANicJtAEidg&t=2023-09-21T02%3A44%3A28.695Z"
              />
              <span className="text-gray-600">Nordbrandly, Company®</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-28 flex flex-col items-center justify-center bg-green-200">
            <div className="flex items-center">
              <div className="px-16 py-16 max-w-[840px] text-center">
                “Neatly Hotel aims to provide nothing short of excellence, offering a range of lavish rooms and suites that exude modern elegance. Impeccably designed, each room oozes comfort and opulence, ensuring a blissful night's sleep.”
              </div>
            </div>

            <div className="flex items-center">
              <img
                className="w-8 mr-4 rounded-full"
                alt="customer-image"
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/customer_said/customer4.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9jdXN0b21lcl9zYWlkL2N1c3RvbWVyNC5zdmciLCJpYXQiOjE2OTUyNjQyODMsImV4cCI6MTcyNjgwMDI4M30.o-AAzGky3eSSCDvxTDF45qwTLnnOaEYqW_ohIfM1glE&t=2023-09-21T02%3A44%3A43.246Z"
              />
              <span className="text-gray-600">Authentika, Company®</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-28 flex flex-col items-center justify-center bg-green-200">
            <div className="flex items-center">
              <div className="px-16 py-16 max-w-[840px] text-center">
                “The Neatly Hotel experience extends beyond the ordinary, offering a sanctuary of tranquility with its luxurious spa, indoor pool, and saunas. After a long day of exploring the vibrant city, allow the expert therapists to revive your senses with a rejuvenating spa treatment.”
              </div>
            </div>

            <div className="flex items-center">
              <img
                className="w-8 mr-4 rounded-full"
                alt="customer-image"
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/customer_said/customer5.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9jdXN0b21lcl9zYWlkL2N1c3RvbWVyNS5zdmciLCJpYXQiOjE2OTUyNjQyOTcsImV4cCI6MTcyNjgwMDI5N30.-JlG00DfTVUlxFl_TnQNeELP5lXe9E1tmNRC_zm2SgM&t=2023-09-21T02%3A44%3A57.535Z"
              />
              <span className="text-gray-600">Dreambiq, Company®</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Reviews;
