import {
  UPDATE_USERAPI_DETAILS,
} from '../helpers/help';

const userApi = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USERAPI_DETAILS:
      // eslint-disable-next-line
        console.log('Here I am')
      return ({
        ...action.userApi,
      });

    default:
      return state;
  }
};

export default userApi;
