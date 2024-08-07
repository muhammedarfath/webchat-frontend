import { API_KEY,baseUrl,backendUrl } from "../Constants/Constants";


const requests = {
    // urls for newsify
    world :`${backendUrl}/news/world/`,
    busines :`${backendUrl}/news/busines/`,
    technology :`${backendUrl}/news/technology/`,
    sports :`${backendUrl}/news/sports/`,
    entertainment :`${backendUrl}/news/entertainment/`,

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
    PublicMessages:`${backendUrl}/chat/public-chat`
}
export default requests
