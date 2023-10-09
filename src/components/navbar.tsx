import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setMenubarPosition, setMobilebarPosition } from '../store/sidebarSlice';
import { NavbarLogo, SidebarOpen } from "./svgFormat"; 
import SearchBar from "./searchBar";
import Cart from "./cart";
import Button from "./button";
import { UserIcon, CartIcon } from "./svgFormat";
import MenuSidebar from "./menubar";
import MobileNavbar from "./mobilebar";

const Header: FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleNavigate = (path: string) => {
    navigate(path);
  }

  const openMenubar = () => {
    dispatch(setMenubarPosition(true));
  };

  const openMobilebar = () => {
    dispatch(setMobilebarPosition(true));
  };
  
  return (
    <>
      <MenuSidebar/>
      <MobileNavbar/>
      <div className="navbar-wrapper desktop-navbar-wrapper">
        <div className="d-flex">
          <div className="col-1">
            <Button text={"Shop"} color="rgba(0, 0, 0, 0.88)" onClick={openMenubar}/>
          </div>
          <div style={{width: "1px", height: "50px", backgroundColor: "rgb(0, 56, 31)"}}></div>
          <div className="col-1">
            <Button text={"Discover"} color="rgba(0, 0, 0, 0.88)" onClick={() => handleNavigate("products")}/>
          </div>
          <div style={{width: "1px", height: "50px", backgroundColor: "rgb(0, 56, 31)"}}></div>
          <div className="col-1">
            <Button svg={<NavbarLogo/>} onClick={() => handleNavigate("")}/>
          </div>
          <div style={{width: "1px", height: "50px", backgroundColor: "rgb(0, 56, 31)"}}></div>
          <div className="col-full-auto">
            <SearchBar/>
          </div>
          <div style={{width: "1px", height: "50px", backgroundColor: "rgb(0, 56, 31)"}}></div>
          <div className="col-1">
            <Button svg={<UserIcon/>} height="100%" onClick={() => handleNavigate("auth")}/>
          </div>
          <div style={{width: "1px", height: "50px", backgroundColor: "rgb(0, 56, 31)"}}></div>
          <div className="col-1">
            <div className="d-flex ai-center mx-auto p-relative " style={{height: "100%", maxWidth: "75px"}}>
              <Button svg={<CartIcon/>} height="100%" onClick={() => handleNavigate("shopping-cart")}/>
            <Cart/>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-wrapper mobile-navbar-wrapper">
        <div className="d-flex">
          <div className="col-full-auto">
            <Button svg={<NavbarLogo/>} innerSpacing="10px 15px" onClick={() => handleNavigate("")}/>
          </div>
          <div style={{width: "1px", height: "50px", backgroundColor: "rgb(0, 56, 31)"}}></div>
          <div style={{width: "100px"}}>
            <Button svg={<UserIcon/>} height="100%" onClick={() => handleNavigate("auth")}/>
          </div>
          <div style={{width: "1px", height: "50px", backgroundColor: "rgb(0, 56, 31)"}}></div>
          <div style={{width: "100px"}}>
            <div className="d-flex mx-auto p-relative ai-center" style={{height: "100%", maxWidth: "75px"}}>
              <Button svg={<CartIcon/>} height="100%" onClick={() => handleNavigate("shopping-cart")}/>
              <Cart/>
            </div>
          </div>
          <div style={{width: "1px", height: "50px", backgroundColor: "rgb(0, 56, 31)"}}></div>
          <div style={{width: "50px"}}>
            <Button svg={<SidebarOpen/>} height="100%" onClick={openMobilebar}/>
          </div>
        </div>
      </div>
    </>
  )
};

export default Header;