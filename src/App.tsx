import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectLoading } from './store/productsSlice';
import Home from './pages/home'; 
import ProductList from './pages/productList'; 
import ShoppingCart from './pages/shoppingCart';
import SelectProduct from './pages/selectedProduct';
import SearchProducts from './pages/searchProducts';
import Form from './pages/auth';
import Contact from './pages/contact';
import Category from './pages/categories';

const App = () => {

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  if (loading === 'pending') {
    return null;
  }
  
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/products/">
              <Route index element={<ProductList />} />
              <Route path="detail/:productId" element={<SelectProduct />} />
              <Route path=":productQuery" element={<SearchProducts/>} />
              <Route path="categories/:productCategory" element={<Category/>} />
            </Route>
            <Route path="/shopping-cart" element={<ShoppingCart/>} />
            <Route path="/auth" element={<Form />}/>
            <Route path="/contact" element={<Contact/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;