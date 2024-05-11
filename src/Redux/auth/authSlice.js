import {createSlice} from '@reduxjs/toolkit'



export const authSlice = createSlice({
    name:"auth",
    initialState:{
        user_id: null,
        username: null,
        email: null,
        full_name: null,
        bio: null,
        image:null,
        authTokens: null,
        is_superuser:false,
        is_active:true,
    },
    reducers:{
        loginUser:(state,action)=>{
            state.authTokens = action.payload.authTokens;
            state.user_id = action.payload.user_id;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.is_superuser = action.payload.is_superuser;
        },
        signUpUser: (state, action) => {
            state.user_id = action.payload.user;
        },
        updateUserProfile: (state, action) => {
            state.full_name = action.payload.full_name;
            state.bio = action.payload.bio;
            state.image = action.payload.image;
        },
    }
    
})

export const {loginUser,signUpUser,updateUserProfile} = authSlice.actions
export default authSlice.reducer