import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, username: null, firstname:null, tweetsliked:null},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
      state.value.tweetsliked = action.payload.tweetsliked;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.firstname = null;
      state.value.tweetsliked=null;
    },
    addTweetLiked: (state, action) => {
      if (!state.value.tweetsliked.includes(action.payload)) {
        state.value.tweetsliked.push(action.payload);
      }
    },
    removeTweetLiked: (state, action) => {
      state.value.tweetsliked = state.value.tweetsliked.filter(
        (token) => token !== action.payload
      );
    },
  },
});

export const { login, logout,addTweetLiked,removeTweetLiked } = userSlice.actions;
export default userSlice.reducer;
