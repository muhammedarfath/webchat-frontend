import { API_KEY,baseUrl,backendUrl } from "../Constants/Constants";


const requests = {
    // urls for newsify
    world :`${baseUrl}&topic=world&token=${API_KEY}`,
    busines :`${baseUrl}&topic=busines&token=${API_KEY}`,
    technology :`${baseUrl}&topic=technology&token=${API_KEY}`,
    sports :`${baseUrl}&topic=sports&token=${API_KEY}`,
    entertainment :`${baseUrl}&topic=entertainment&token=${API_KEY}`,

    //urls for backend
    signupUser :`${backendUrl}/users_auth/signup/`,
    verifyOtp :`${backendUrl}/users_auth/verify-otp/`,
    resendOtp :`${backendUrl}/users_auth/resend-otp/`,
    loginUser :`${backendUrl}/users_auth/login/`,
    resetPassword :`${backendUrl}/users_auth/reset-password/`,
    passwordResetConfirm :`${backendUrl}/users_auth/password-reset-confirm/`,
    fetchUserProfile :`${backendUrl}/app_profile/userprofile/`,
    editUserProfile :`${backendUrl}/users_auth/edit/`,
    fetchPosts :`${backendUrl}/posts/posts/`, 
    likePost :`${backendUrl}/posts/like-post/`,
    savePost :`${backendUrl}/posts/fav-post/`,
    commentPost :`${backendUrl}/posts/comment-post/`,
    handleChat: `${backendUrl}/chat/`, 
    fetchAllUser:`${backendUrl}/chat/users/`,
    lastThreeMessges:`${backendUrl}/home/last-three-messages/`,
    suggestedFriends:`${backendUrl}/chat/suggested_friends/`,
    checkRelationShip:`${backendUrl}/app_profile/check_relationship/`,
    sendFollowRequest:`${backendUrl}/app_profile/send_follow_request/`,
    sendFollowBackRequest:`${backendUrl}/app_profile/follow_back_request/`,
    sendFollowUnfollowRequest:`${backendUrl}/app_profile/unfollow_request/`,

}
export default requests
