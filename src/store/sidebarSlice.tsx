import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootStore } from './store';
import { SidebarCondition } from '../types';

const initialState: SidebarCondition = {
  isMenubarOpen: false,
  isMobilebarOpen: false
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setMenubarPosition: (state, action: PayloadAction<boolean>) => {
      const menubarPosition = action.payload;
      state.isMenubarOpen = menubarPosition;
    },
    setMobilebarPosition: (state, action: PayloadAction<boolean>) => {
      const mobilebarPosition = action.payload;
      state.isMobilebarOpen = mobilebarPosition;
    },
  },
});

export const { setMenubarPosition, setMobilebarPosition } = sidebarSlice.actions;
export default sidebarSlice.reducer;
export const selectMenubarPosition = (state: RootStore) => state.sidebar.isMenubarOpen;
export const selectMobilebarPosition = (state: RootStore) => state.sidebar.isMobilebarOpen;
