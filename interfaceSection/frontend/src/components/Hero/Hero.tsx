import Slider from "react-slick";
import { useEffect, useState } from "react";
import { bannerApi } from "../../api-client/api";

// const ImageList = [
//   {
//     id: 1,
//     img: Image1,
//     title: "Giày thể thao Allbirds Women Wool Runner",
//     description:
//       "Giày thể thao nhẹ và thoáng mát được người hâm mộ yêu thích, được thiết kế để mang hàng ngày.",
//   },
//   {
//     id: 2,
//     img: Image2,
//     title: "Giày chạy bộ nam Tree Runner Go",
//     description:
//       "Giày thể thao hàng ngày thoáng khí, được nâng cấp với độ bền và đệm được cải thiện.",
//   },
//   {
//     id: 3,
//     img: Image3,
//     title: "Giày Ecco M Core White chính hãng",
//     description:
//       "Nhẹ, thoáng khí và được thiết kế để di chuyển và nhún nhảy mà không bị xê dịch.",
//   },
// ];

const Hero = () => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  interface HomeBanner {
    id: string;
    title: string;
    content: string;
    imageName: string;
  }

  const [homeBanners, setHomeBanners] = useState<HomeBanner[]>([]);

  const loadBanners = async () => {
    try {
      const { data } = await bannerApi.getHomeBanners();
      setHomeBanners(data);
    } catch (error) {
      console.error("Lỗi gọi API:", error);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 ">
      {/* background pattern */}
      <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
      {/* hero section */}
      <div className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {homeBanners.map((data) => (
            <div key={data.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* text content section */}
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1

                    className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {data.title}
                  </h1>
                  <p

                    className="text-sm"
                  >
                    {data.content}
                  </p>
                  {/* <div
                    
                  >
                    <button
                      className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                    >
                      Order Now
                    </button>
                  </div> */}
                </div>
                {/* image section */}
                <div className="order-1 sm:order-2">
                  <div

                    className="relative z-10"
                  >
                    <img
                      src={
                        typeof data.imageName === 'string'
                            ? data.imageName.startsWith('data:image') || data.imageName.startsWith('blob:')
                                ? data.imageName // ảnh mới upload
                                : import.meta.env.VITE_API_URL_BANNER_IMG + data.imageName // ảnh từ server
                            : '/path/to/default-image.jpg'
                    }
                      alt=""
                      className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto drop-shadow-xl"
                    />

                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
