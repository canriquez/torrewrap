import {
  UPDATE_USERTORRE_DETAILS,
} from '../helpers/help';

const state_default = {
  errors: [],
  fetching: 'idle',
  signedIn: false,
  valid: false,
  inWrapDB: false,
  persona: {},
};

const userTorre = (state = state_default, action) => {
  switch (action.type) {
    case UPDATE_USERTORRE_DETAILS:
      // eslint-disable-next-line
        console.log('Here I am Torre')
      return ({
        ...state,
        ...action.userTorre,
      });

    default:
      return state;
  }
};

export default userTorre;
