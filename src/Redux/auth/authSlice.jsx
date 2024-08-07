import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user_id: null,
    username: null,
    email: null,
    full_name: null,
    bio: null,
    image: null,
    authTokens: null,
    is_superuser: false,
    is_active: true,
    is_email_verified:false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.authTokens = action.payload.authTokens;
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.is_superuser = action.payload.is_superuser;
      state.is_email_verified = action.payload.is_email_verified;
      state.full_name = action.payload.full_name;
      state.image = action.payload.image;
      state.bio = action.payload.bio
    },
    signUpUser: (state, action) => {
      state.authTokens = action.payload.authTokens;
      state.full_name = action.payload.full_name;

    },
    updateUserProfile: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.full_name = action.payload.full_name;
      state.bio = action.payload.bio;
      state.image = action.payload.image;
    },
    logoutUser: (state, action) => {
      state.image = action.payload.image;
      state.bio = action.payload.bio;
      state.full_name = action.payload.full_name;
      state.authTokens = action.payload.authTokens;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.user_id = action.payload.user_id;
      state.is_superuser = action.payload.is_superuser;
    },
  },
});

export const { loginUser, signUpUser, updateUserProfile, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;
