import {
    UPDATE_USERTORRE_DETAILS,
  } from '../helpers/help';
  
  const userTorre = (state = {}, action) => {
    switch (action.type) {
  
      case UPDATE_USERTORRE_DETAILS:
        // eslint-disable-next-line
        console.log('Here I am Torre')
        return ({
            ...action.userTorre
        });
  
      default:
        return state;
    }
  };
  
  export default userTorre;