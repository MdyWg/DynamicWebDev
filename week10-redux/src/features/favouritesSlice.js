// action type: favourites/favouriteToggled
// what it changed: added id 'p1' to favourites.ids, or removed it if it was already there

import {createSlice} from '@reduxjs/toolkit'

const favouritesSlice = createSlice({
  name: 'favourites',

  initialState: {
    ids: [],
  },

  reducers: {
    favouriteToggled(state, action) {
      const existing = state.ids.find((id) => id === action.payload)

      if (existing) {
        state.ids = state.ids.filter((id) => id !== action.payload)
        return
      }

      state.ids.push(action.payload)
    },
  },
})

export const {
  favouriteToggled,
} = favouritesSlice.actions

export const selectFavouriteIds = (state) => state.favourites.ids
export const selectFavouriteCount = (state) => state.favourites.ids.length
export const selectIsFavourite = (id) => (state) =>
  state.favourites.ids.includes(id)

export default favouritesSlice.reducer
