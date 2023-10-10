import { FC, useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSlideIndex } from '../store/sliderSlice';
import SliderOptional from '../components/sliders/sliderOptional';
import { selectAllProducts } from '../store/productsSlice';
import { selectProducts, selectCartProducts, filterProductsById, addToCart, removeFromCart} from '../store/productsSlice';
import { StyledTypography } from '../components/material_Ui';
import Button  from '../components/button';
import { Product } from '../types';
import { CloseModal, Success } from "../components/svgFormat"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';


const SelectProduct: FC = () => {
  const allProducts = useSelector(selectAllProducts);
  const { productId } = useParams<{ productId: string }>(); 
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartProducts);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const successModal = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (productId) {
      dispatch(filterProductsById(parseInt(productId)));
      const checkIsInCart = cartItems.some((item: Product) => item.id === parseInt(productId));
      setIsInCart(checkIsInCart); 
    }
  }, [dispatch, productId, cartItems]);

  
  useEffect(() => {
    dispatch(setSlideIndex(0));
    window.scrollTo(0, 0);
  },[dispatch, location]);


  const addProductHandler = (product: Product) => {
    dispatch(addToCart(product));
    successModal.current?.classList.add("show");
    setTimeout(() => {
      successModal.current?.classList.remove("show");
    }, 2000); 
  }

  const removeCartHandler = (productId: number) => {
    dispatch(removeFromCart(productId));
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="py-10" style={{backgroundColor: "rgb(242, 242, 242)"}}>
        <div className="success-modal" ref={successModal}>
          <div className="d-flex ai-center">
            <div className="successIcon-content">
              <Success/>
            </div>
            <StyledTypography color="#00381f" variant="body1" fontSize="16px" fontWeight="600">
              Product has been added to the cart
            </StyledTypography>
          </div>
        </div>
        <div className="container">
          {products && products[0] && (
            <>
              <div className={`modal-wrapper ${isModalOpen ? "open" : ""}`}>
                <div className="modal-content" >
                  <div className="closeModal-btn">
                    <Button svg={<CloseModal/>}  onClick={() => closeModal()}/>
                  </div>
                  <SliderOptional sliderName="modalSlider" sliderParams={products[0].variations}/>
                </div>
              </div>
              <div className="d-flex ai-center jc-center">
                <div className="xs-12 md-11">
                  <div className="d-flex mb-10">
                    <Link to={"/"} className="d-flex ai-center hovered-underline">
                      <FontAwesomeIcon className="success mr-2" size="lg" icon={faArrowRotateLeft} style={{ color: "#00381f" }}/>
                      <StyledTypography color="#00381f" variant="body1" fontSize="16px" fontWeight="600">
                        Back to home
                      </StyledTypography>
                    </Link>
                  </div>
                  <div className="d-flex jc-between f-wrap">
                    <div className="xs-12 sm-12 md-7 p-relative">
                      <div className="open-modal">
                        <Button text="+" fontSize="30px" color="rgba(0, 0, 0, 0.88)" onClick={() => openModal()}/>
                      </div> 
                      <SliderOptional sliderName="selectedProductSlider" sliderParams={products[0].variations}/>
                    </div>
                    <div className="xs-12 sm-12 md-4 px-3">
                      <div className="d-flex fd-column" style={{gap: "20px"}}>
                        <StyledTypography style={{lineHeight: "1.3"}} color="rgba(0, 0, 0, 0.88)" variant="h3" fontSize="24px" fontWeight="600">
                          {products[0].name}
                        </StyledTypography>
                        <StyledTypography color="rgba(0, 0, 0, 0.88)" variant="h3" fontSize="24px" fontWeight="600">
                          Price:&nbsp;&nbsp;${products[0].price}
                        </StyledTypography>
                        <div className="btn-content">
                          <Button onClick={() => addProductHandler(products[0])} width="100%" text="Add to bag" innerSpacing="10px 8px" bgColor="#00381f" color="#fff"/>
                        </div>
                          {isInCart ? (
                            <div className="btn-content">
                              <Button onClick={() => removeCartHandler(products[0].id)} width="100%" text="Remove from Bag" innerSpacing="10px 8px" bgColor="#484848" color="#fff"/>
                            </div>
                          ) : (
                          <div className="btn-content">
                            <Button onClick={() => removeCartHandler(products[0].id)} width="100%" text="Remove from Bag" innerSpacing="10px 8px" bgColor="#484848" color="#fff" opacity={0.4}/>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </> 
          )}
        </div>
      </div>
      <div className="py-10 bg-light">
        <div className="container">
          <div className="d-flex">
            <div className="xs-12 md-8">
              <StyledTypography variant="h4" color="rgba(0, 0, 0, 0.88)" fontSize="36px" fontWeight="600" className="mb-6">
                Description
              </StyledTypography>
              <StyledTypography variant="body1" color="rgba(0, 0, 0, 0.88)" fontSize="14px" fontWeight="500" className="mb-5">
                {products[0] && products[0].description}
              </StyledTypography>
              <StyledTypography variant="body1" color="rgba(0, 0, 0, 0.88)" fontSize="16px" fontWeight="500" className="mb-3">
                Specs
              </StyledTypography>
              <ul>
                {products[0] && products[0].specifications && Object.entries(products[0].specifications).map(([key, value]) => (
                  <li key={key} style={{ margin: "10px 20px", listStyleType: "circle" }}>
                    <StyledTypography variant="body1" color="rgba(0, 0, 0, 0.88)" fontSize="14px" fontWeight="500">
                      {key} : {value}
                    </StyledTypography>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {allProducts && 
        <div className="py-10" style={{backgroundColor: "rgb(242, 242, 242)"}}>
          <div className="container">
            <StyledTypography variant="h4" color="rgba(0, 0, 0, 0.88)" fontSize="23px" fontWeight="600" className="mb-3 px-4">
              Trending Arrivals
            </StyledTypography>
            <SliderOptional sliderName="productListSlider" sliderParams={allProducts}/>
          </div>
        </div>
      }
    </>
  );
};

export default SelectProduct;