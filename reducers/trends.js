import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const trendsSlice = createSlice({
  name: 'trends',
  initialState,
  reducers: {
    generateTrendList: (state, action) => {
        state.value = action.payload
    },

  },
});

export const { generateTrendList } = trendsSlice.actions;
export default trendsSlice.reducer;