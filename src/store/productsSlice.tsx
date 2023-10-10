import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStore } from './store';
import { Product } from '../types';
import { ProductsState } from '../types';

const initialState: ProductsState = {
  allProducts: [],
  productQuantities: {},
  products: [],
  searchedProducts: [],
  cartItems: [],
  loading: 'idle',
  error: null,
  translated: false,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await axios.get<{products: Product[]}>('/api/products.json');
    const allProducts = response.data.products;
    return allProducts;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProductsByLetter: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload.toLowerCase();
      state.searchedProducts = state.allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery)
      );
    },
    filterProductsById: (state, action: PayloadAction<number>) => {
      const searchQuery = action.payload;
      state.products = state.allProducts.filter(product =>
        product.id == searchQuery
      );
    },
    filterProductsByCategories: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload;
      state.products = state.allProducts.filter(product =>
        product.category === searchQuery
      );
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      state.translated = false;
      const newItem = { ...action.payload }; 
      const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);
      if (existingItemIndex !== -1 ) {
        state.cartItems[existingItemIndex].quantity += 1;
        state.translated = true;
        state.cartItems[existingItemIndex].totalPrice += state.cartItems[existingItemIndex].price;
      } else {
          newItem.quantity = newItem.quantity || 1; 
          newItem.totalPrice = newItem.price * newItem.quantity; 
          state.cartItems = [ newItem, ...state.cartItems ];
        }
    },
    decreaseFromCart: (state, action: PayloadAction<number>) => {
      state.translated = false;
      const newItemId = action.payload; 
      const existingItemIndex = state.cartItems.findIndex(item => item.id === newItemId);
      if (existingItemIndex !== -1 && state.cartItems[existingItemIndex].quantity > 1) {
        state.cartItems[existingItemIndex].quantity -= 1;
        state.translated = true;
        state.cartItems[existingItemIndex].totalPrice -= state.cartItems[existingItemIndex].price;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      //const productIndex = state.cartItems.findIndex(item => item.id === productId);
      state.cartItems = state.cartItems.filter(item => item.id !== productId);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = 'fulfilled';
        state.allProducts = action.payload;
        //state.allProducts = [];
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = 'rejected';
      });
  },
});

export const { filterProductsByLetter, filterProductsByCategories, filterProductsById, addToCart, decreaseFromCart, removeFromCart} = productsSlice.actions;
export default productsSlice.reducer;
export const selectLoading = (state: RootStore) => state.products.loading;
export const selectAllProducts = (state: RootStore) => state.products.allProducts;
export const selectSearchedProduts = (state: RootStore) => state.products.searchedProducts;
export const selectProducts = (state: RootStore) => state.products.products;
export const selectCartProducts = (state: RootStore) => state.products.cartItems;
export const selectProductQuantities = (state: RootStore) => state.products.productQuantities;
export const selectTranslatedcount = (state: RootStore) => state.products.translated;