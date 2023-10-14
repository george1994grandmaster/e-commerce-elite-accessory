import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStore } from './store';
import { PresentContent } from '../types';
import { HomePageContent } from '../types';


const initialState: PresentContent = {
  content: { src: '', title: '', text: '' },
  loading: 'idle',
  error: null,
};

export const fetchPresentContent = createAsyncThunk('presentation/fetchPresentContent', async () => {
  try {
    const response = await axios.get<{ present: HomePageContent }>('/api/presentContent.json');
    const presentItems = response.data.present;
    return presentItems;
  } catch (error) {
    throw new Error('Failed to fetch presentation content');
  }
});

const presentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPresentContent.pending, (state) => {
      })
      .addCase(fetchPresentContent.fulfilled, (state, action: PayloadAction<HomePageContent>) => {
        state.loading = 'fulfilled';
        state.content = action.payload;
      })
      .addCase(fetchPresentContent.rejected, (state) => {
       
      });
  },
});

export default presentationSlice.reducer;
export const selectPresentationContent = (state: RootStore) => state.presentation.content;