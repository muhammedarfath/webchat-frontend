import { API_KEY,baseUrl,backendUrl } from "../Constants/Constants";


const requests = {
    // urls for newsify
    world :`${baseUrl}&topic=world&token=${API_KEY}`,
    busines :`${baseUrl}&topic=busines&token=${API_KEY}`,
    technology :`${baseUrl}&topic=technology&token=${API_KEY}`,
    sports :`${baseUrl}&topic=sports&token=${API_KEY}`,
    entertainment :`${baseUrl}&topic=entertainment&token=${API_KEY}`,

    //urls for backend
    fetchUserProfile :`${backendUrl}/app_profile/userprofile/`,
    fetchPosts :`${backendUrl}/posts/posts/`, 
    likePost :`${backendUrl}/posts/like-post/`,
    savePost :`${backendUrl}/posts/fav-post/`


}


export default requests