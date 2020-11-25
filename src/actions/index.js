import { UPDATE_USERAPI_DETAILS, UPDATE_USERTORRE_DETAILS } from '../helpers/help';


const  updateuserDetails = userApi => ({
  type: UPDATE_USERAPI_DETAILS,
  userApi
})

const updateTorreUserDetails = userTorre => ({
  type: UPDATE_USERTORRE_DETAILS,
  userTorre
})



export {  updateuserDetails, updateTorreUserDetails };
