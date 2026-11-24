import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const artSlice = createSlice({
  name: 'art',
  initialState: {
    searchTerm: '',
    data: [],
  },
  reducers: {
    changeSearchTerm(state, action) {
        state.searchTerm = action.payload
    }, 
    addArt(state, action) {
        state.data.push({
            id: nanoid(), 
            name: action.payload.name,
            price: action.payload.price,
        })
    }, 

    removeArt(state, action) {
        state.data = state.data.filter(item => item.id !== action.payload);
    }
  },
});

export const { changeSearchTerm, addArt, removeArt } = artSlice.actions;
export const selectSearchTerm = (state) => state.art.searchTerm;
export const selectData = (state) => state.art.data;
export default artSlice.reducer;