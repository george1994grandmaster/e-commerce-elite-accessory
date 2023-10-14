import { FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { StyledTypography } from '../../components/material_Ui';
import { SliderProps } from "../../types";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import  { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ProductListArrowLeft, ProductListArrowRight } from '../svgFormat';

SwiperCore.use([Navigation]);

const NavigatedSlider: FC<SliderProps> = ({sliderParams}) => {
 const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <div className="products-swiper-container">
      <Swiper 
        className="swiper productList-swiper"
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
        720: {
            slidesPerView: 2,
          },
        992: {
            slidesPerView: 3,
          },
        1200: {
          slidesPerView: 4,
        },
        }}
      >
        {sliderParams && sliderParams.slice(10, 20).map((sliderParam, index) => (
          <SwiperSlide key={index}>
            <div className="card" key={sliderParam.id}>
              <Link to={`/products/detail/${sliderParam.id}`} key={sliderParam.id}>
                <div style={{ width: '100%'}}>
                  <img src={sliderParam.src} alt="product" style={{ display: 'block' }} />
                </div>
                <div className="card-body">
                  <StyledTypography  variant="body1" color="#000" fontSize="16px"  fontWeight="600" className="mb-2">
                    {sliderParam.name}
                  </StyledTypography>
                  <StyledTypography variant="body1" color="rgba(0, 0, 0, 0.88)" fontSize="16px" fontWeight="600">
                    <span className="mr-2">PRICE:</span>
                    <span style={{marginRight: "2px"}}>$</span>
                    {sliderParam.price}
                  </StyledTypography>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev">
          <ProductListArrowLeft/>
        </div>
        <div className="swiper-button-next">
          <ProductListArrowRight/>
        </div>
      </Swiper>
    </div>
  )
}

export default  NavigatedSlider;