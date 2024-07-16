import { API_KEY,baseUrl } from "../../Constants/Constants";


const requests = {
    world :`${baseUrl}&topic=world&token=${API_KEY}`,
    busines :`${baseUrl}&topic=busines&token=${API_KEY}`,
    technology :`${baseUrl}&topic=technology&token=${API_KEY}`,
    sports :`${baseUrl}&topic=sports&token=${API_KEY}`,
    entertainment :`${baseUrl}&topic=entertainment&token=${API_KEY}`,
}


export default requests