const formSlice = createSlice({
  name: 'form',
  initialState: {
    name: '',
    price: 0,
  },
  reducers: {
    nameChanged: (state, action) => {
      state.name = action.payload;
    },
    emailChanged: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { nameChanged, emailChanged } = formSlice.actions;
export const selectName = (state) => state.form.name;
export const selectEmail = (state) => state.form.email;
export default formSlice.reducer;