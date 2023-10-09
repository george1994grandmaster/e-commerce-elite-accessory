import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decreaseFromCart, selectCartProducts, removeFromCart } from '../store/productsSlice'; // Make sure to import the selector
import { Product } from '../types';
import { StyledTypography } from '../components/material_Ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/button';
import Accordion from "../components/accordion";
import { EmptyCart } from "../components/svgFormat";

const ShoppingCart: FC = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartProducts);
  const [totalProductPrice, setTotalProductPrice] = useState<number>(0);
  
  useEffect(() => {
    const totalProductPrice = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.totalPrice;
    }, 0);
    setTotalProductPrice(totalProductPrice);
  }, [cartItems]); 
  
  const removeCartHandler = (productId: number) => {
    dispatch(removeFromCart(productId));
  }

  const addProductHandler = (product: Product) => {
    dispatch(addToCart(product));
  }

  const decreaseProductHandler = (productId: number) => {
    dispatch(decreaseFromCart(productId));
  }
  
  return (
    <>
      <div className="py-10" style={{backgroundColor: "rgb(242, 242, 242)"}}>
        <div className="container">
          <div className="d-flex jc-between f-wrap">
            {cartItems && (
              cartItems.length > 0 ? ( 
                <div className="xs-12 sm-12 md-7"> 
                  <div className="d-flex fd-column" style={{gap: "80px"}}>
                    {cartItems.map((item: Product) => (
                      <div className="d-flex jc-between ai-center f-wrap" key={item.id}>
                        <div className="px-2 py-2" style={{ width: "250px" }}>
                          <img src={item.src} alt="shopping-cart-img" style={{ display: "block", height: "250px", objectFit: "contain" }} />
                        </div>
                        <div className="px-2 py-2">
                          <div className="d-flex fd-column" style={{ height: "100%", gap: "30px" }}>
                            <div className="mb-2">
                              <StyledTypography variant="body1" fontSize="16px" fontWeight="600" className="mb-2">
                                {item.name}
                              </StyledTypography>
                              <StyledTypography variant="body1" fontSize="16px" fontWeight="500">
                                <span className="mr-2">PRICE:</span><span style={{ marginRight: "2px" }}>$</span>{item.totalPrice}
                              </StyledTypography>
                            </div>
                            <div className="d-flex f-wrap" style={{ gap: "10px" }}>
                              <div className="shopping-btn">
                                <Button svg={<FontAwesomeIcon icon={faPlus} />} bgColor="#484848" color="#fff" innerSpacing="9px" onClick={() => addProductHandler(item)} />
                              </div>
                              <StyledTypography variant="body1" fontSize="20px" fontWeight="600" color="rgba(0, 0, 0, 0.88)">
                                {item.quantity}
                              </StyledTypography>
                              <div className="shopping-btn">
                                <Button svg={<FontAwesomeIcon icon={faMinus} />} bgColor="#484848" color="#fff" innerSpacing="9px" onClick={() => decreaseProductHandler(item.id)} />
                              </div>
                              <div className="btn-content">
                                <Button text="Remove from bag" fontSize="16px" bgColor="transparent" color="rgba(0, 0, 0, 0.88)" innerSpacing="8px" onClick={() => removeCartHandler(item.id)} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="xs-12 sm-12 md-9"> 
                  <div className="d-flex jc-center fd-column ai-center py-10">
                    <div className="mb-2">
                      <EmptyCart/>
                    </div>
                    <StyledTypography variant="h2" fontSize="30px" fontWeight="500" color="rgba(0, 0, 0, 0.88)">
                      Shopping cart is empty
                    </StyledTypography>
                  </div>
                </div>
                )
            )}
            <div className="xs-12 sm-6 md-3 py-2">
              <div className="d-flex fd-column px-5 py-5 bg-light" style={{gap: "40px"}}>
                <div className="d-flex fd-column" style={{gap: "10px"}}>
                  <div className="d-flex ai-center jc-between">
                    <StyledTypography variant="body1" fontSize="14px" fontWeight="500" color="rgba(0, 0, 0, 0.88)">
                      Sub Total: 
                    </StyledTypography>
                    {totalProductPrice > 0 ? (
                      <StyledTypography variant="body1" fontSize="14px" fontWeight="600" color="rgba(0, 0, 0, 0.88)">
                        <span style={{marginRight: "2px"}}>$</span>{totalProductPrice}
                      </StyledTypography>
                    ) : (
                        <StyledTypography variant="body1" fontSize="14px" fontWeight="600" color="rgba(0, 0, 0, 0.88)">
                          &#8722;
                        </StyledTypography>
                        )
                    }
                  </div>
                </div>
                <div className="btn-content">
                  <Button width="100%" text="Proceed to order" fontSize="16px" bgColor="#00381f" color="#FFF" innerSpacing="10px 8px"/>
                </div>
                <Link to="/auth" >
                  <StyledTypography className="d-flex ai-center" style= {{gap: "8px"}}  variant="body1" fontSize="14px" fontWeight="500" color="rgba(0, 0, 0, 0.88)">
                    <span style={{textDecoration: "underline"}}>Log in</span>
                    <span>/</span>
                    <span style={{textDecoration: "underline"}}> Create Account</span>
                  </StyledTypography>
                </Link>
                <Link to="/contact">
                  <StyledTypography variant="body1" fontSize="14px" fontWeight="500" color="rgba(0, 0, 0, 0.88)" >
                    Need Help! Visit <span style={{textDecoration: "underline"}}>Custom Service</span>
                  </StyledTypography>
                </Link>
                <Accordion/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;