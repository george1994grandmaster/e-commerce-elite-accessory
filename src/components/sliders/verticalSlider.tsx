import { FC, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSlideIndex, selectSlideIndex } from '../../store/sliderSlice';
import { SliderProps } from "../../types";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import  { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { VerticalArrowLeft, VerticalArrowRight } from '../svgFormat';

SwiperCore.use([Navigation]);

const VerticalSlider: FC<SliderProps> = ({sliderParams}) => {
  const slideIndex = useSelector(selectSlideIndex) as number ;
  const dispatch = useDispatch();
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(slideIndex);
    }
  }, [slideIndex]);

  const handleSlideClick = (index: number) => {
    if(swiperRef.current) {
      const slideIndex = index; 
      dispatch(setSlideIndex(slideIndex));
    }
  };

  return (
    <div className="vertical-swiper-container">
      <Swiper 
        className="swiper vertical-swiper"
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        slidesPerView={4}
        direction={'vertical'}
        spaceBetween={40}
        
        onSwiper={(swiper) => {
          swiperRef.current = swiper; 
        }}
       >
        {sliderParams.map((item, index) => (
          <SwiperSlide onClick={() => handleSlideClick(index)} key={index} style={{cursor: "pointer"}}>
            <img src={item.src} alt={`Slide ${index}`}/>
          </SwiperSlide>
        ))}
        <VerticalArrowLeft/>
        <VerticalArrowRight/>
      </Swiper>
    </div>
  )
}

export default  VerticalSlider;

