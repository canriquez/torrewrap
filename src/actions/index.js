import { UPDATE_USERAPI_DETAILS, UPDATE_USERTORRE_DETAILS } from '../helpers/help';
import {fetchTorreUserBio } from '../apis/TorreCoApi'
import {checkValidTorreUser} from '../apis/TorreWrapApi'


const  updateuserDetails = userApi => ({
  type: UPDATE_USERAPI_DETAILS,
  userApi
})

const updateTorreUserDetails = userTorre => ({
  type: UPDATE_USERTORRE_DETAILS,
  userTorre
})



const validatesTorreUserApi = (userTorre) => (dispatch, getState) => checkValidTorreUser(
  {public_id: userTorre},
)
  .then(result => {
    if (result.message == 'Valid Torre.co User')
      dispatch(updateTorreUserDetails({valid: true}));
    else
      dispatch(updateTorreUserDetails({valid: false}));
    
  }).catch(error => {
    dispatch(updateTorreUserDetails({valid: false}));
    throw (error);
  });




export {  
  updateuserDetails, 
  updateTorreUserDetails,
  validatesTorreUserApi
 };
