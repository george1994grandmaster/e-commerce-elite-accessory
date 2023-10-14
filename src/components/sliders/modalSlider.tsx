import { FC, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SliderProps } from "../../types";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import  { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ModalArrowLeft, ModalArrowRight } from "../svgFormat"

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
          <ModalArrowLeft/>
        </div>
        <div className="swiper-button-next">
          <ModalArrowRight/>
        </div>
      </Swiper>
    </>
  )
}

export default  ModalSlider;

