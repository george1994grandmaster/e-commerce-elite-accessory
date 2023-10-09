import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContentValue, updateValue } from "../store/topContentSlice";
import { StyledTypography } from './material_Ui';
import { useLocation } from 'react-router-dom';

const TopWrapper: FC = () => {
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const topContentValue = useSelector(selectContentValue);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    switch (true) {
      case currentPath && /^\/products(?!\/detail)(\/.*)?$/.test(currentPath):
        dispatch(updateValue("Collection"));
        break;
      case currentPath && currentPath === "/auth":
        dispatch(updateValue("Log In / Create a New Account"));
        break;
      case currentPath && currentPath === "/shopping-cart":
        dispatch(updateValue("Shopping-Cart"));
        break;
      default:
        // Handle other cases
        break;
    }
  }, [currentPath, dispatch]);

  const allowedPaths = [
    /^\/products(?!\/detail)(\/.*)?$/,  // Matches paths that start with "/products" but not "/products/detail"
    /^\/auth$/,            
    /^\/shopping-cart$/,        
  ];

  return allowedPaths.some(path => path.test(currentPath as string)) ? (
    <div className="bg-light py-7">
      <div className="container">
        <StyledTypography variant="h2" fontSize="22px" fontWeight="600" color="rgba(0, 0, 0, 0.88)">
          {topContentValue}
        </StyledTypography>
      </div>
    </div>
  ) : null;
}

export default TopWrapper;