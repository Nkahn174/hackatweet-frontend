import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    generateTweetList: (state, action) => {
        state.value = action.payload
    },
    addTweetToStore: (state, action) => {
      state.value.push(action.payload)
    },
    deleteTweetToStore: (state,action) => {
        state.value = state.value.filter(tweet => tweet.token !== action.payload)
    },
  },
});

export const { addTweetToStore, deleteTweetToStore, generateTweetList } = tweetsSlice.actions;
export default tweetsSlice.reducer;
