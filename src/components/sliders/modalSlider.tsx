import { FC, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SliderProps } from "../../types";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import  { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

SwiperCore.use([Navigation]);

 const ModalSlider: FC<SliderProps> = ({sliderParams}) => {
 const swiperRef = useRef<SwiperCore | null>(null);
  const location = useLocation();

useEffect(() => {
  if ( swiperRef.current) {
    swiperRef.current.slideTo(0); 
  }
}, [location]);
 
  return (
    <>
      <Swiper 
        className="swiper modal-swiper"
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        
        slidesPerView={1}
        //spaceBetween={40}
        grabCursor={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {sliderParams.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.src} alt={`Slide ${index}`}/>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev">
          <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.004 400.004"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757 c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072 c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315 C400.004,190.438,392.251,182.686,382.688,182.686z"></path> </g> </g></svg>
        </div>
        <div className="swiper-button-next">
          <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.004 400.004"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757 c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072 c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315 C400.004,190.438,392.251,182.686,382.688,182.686z"></path> </g> </g></svg>
        </div>
      </Swiper>
    </>
  )
}

export default  ModalSlider;

