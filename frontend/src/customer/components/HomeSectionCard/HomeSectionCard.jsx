import { sectionData } from './MainSectionData'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';

export default function HomeSectionCard() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {sectionData.map((product) => (
              <SwiperSlide key={product.id}>
                <a href="" className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination-custom text-center mt-5">
            {sectionData.map((product, index) => (
                <div
                  key={product.id}
                  className={`swiper-pagination-bullet ${index === 0 ? 'swiper-pagination-bullet-active' : ''}`}
                >
                </div>
              ))}
          </div>
          <div className="custom-button-next swiper-button-next"></div>
          <div className="custom-button-prev swiper-button-prev"></div>
        </div>
      </div>
    </div>
  );
}
