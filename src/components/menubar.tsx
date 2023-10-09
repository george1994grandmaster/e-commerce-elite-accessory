import { FC, useEffect } from "react";
import { useNavigate, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMenubarPosition, selectMenubarPosition } from '../store/sidebarSlice';
import Button from "./button";
import { CloseBtn } from "./svgFormat";


const MenuSidebar: FC = (/*{ sidebarCondition, closeSidebar }*/) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMenuBar: boolean = useSelector(selectMenubarPosition);

  useEffect(() => {
    dispatch(setMenubarPosition(false));
  }, [dispatch, location]);

  
 const closeSidebar = () => {
    dispatch(setMenubarPosition(false));
  };


  const categoryItems = ["watches", "jewellery", "headphones", "bags"];

  return (
    <div className={`menuSidebar ${isMenuBar ? "" : "hide"}`}>
      <div className="menubar-close">
        <Button svg={<CloseBtn/>} bgColor="transparent"  innerSpacing="8px" onClick={closeSidebar}/>
      </div>
      <div className="menubar-content">
        <ul>
          {categoryItems.map((item, index) => (
            <li key={index} className="menubar-list">
              <Button text={item} bgColor="transparent" color="rgba(0, 0, 0, 0.88)" innerSpacing="8px" onClick={() => navigate(`/products/categories/${item}`)}/>
            </li>
          ))}
        </ul>
        <div>
          <Button text="Contact Us" bgColor="transparent" fontSize="14px" color="rgba(0, 0, 0, 0.88)" innerSpacing="8px" onClick={() => navigate('/contact')}/>
        </div>
      </div>
    </div>
  )
}

export default MenuSidebar;