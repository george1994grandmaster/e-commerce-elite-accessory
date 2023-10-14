import { FC, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMobilebarPosition, selectMobilebarPosition } from '../store/sidebarSlice';
import { filterProductsByCategories, selectAllProducts } from '../store/productsSlice';
import Button from "./button";
import { CloseBtn } from "./svgFormat";
import SearchBar from "./searchBar";

const MobileSidebar: FC = (/*{ sidebarCondition, closeSidebar }*/) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobilebarOpen: boolean = useSelector(selectMobilebarPosition);
  
  useEffect(() => {
    dispatch(setMobilebarPosition(false));
  }, [dispatch, location]);

  const filterProductsByCategory = (item: string) => {
    navigate(`/products/categories/${item}`);
  }
 
  const closeSidebar = () => {
    dispatch(setMobilebarPosition(false));
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  }

  const categoryItems = ["watches", "jewellery", "headphones", "bags"];

  return (
    <div className={`mobileSidebar ${isMobilebarOpen ? "" : "hide"}`}>
      <div className="container">
        <div style={{height: "50px", borderBottom: "1px solid rgba(0, 0, 0, 0.88)" }}>
          <SearchBar version="mobile"/>
        </div>
        <div className="mobilebar-close">
          <Button svg={<CloseBtn/>} bgColor="transparent"  onClick={closeSidebar}/>
        </div>
        <div className="d-flex fd-column jc-between py-10" style={{height: "100%", gap: "50px"}}>
          <div>
            <Button text="Discover" bgColor="transparent" fontSize="14px" color="rgba(0, 0, 0, 0.88)" innerSpacing="8px" onClick={() => handleNavigate("products")}/>
          </div>
          <ul style={{listStyle: "none"}}>
            {categoryItems.map((item, index) => (
              <li key={index}>
                <Button text={item} bgColor="transparent" color="rgba(0, 0, 0, 0.88)" innerSpacing="8px" onClick={() => filterProductsByCategory(item)}/>
              </li>
            ))}
          </ul>
          <div>
            <Button text="Contact Us" bgColor="transparent" fontSize="14px" color="rgba(0, 0, 0, 0.88)" innerSpacing="8px" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileSidebar;