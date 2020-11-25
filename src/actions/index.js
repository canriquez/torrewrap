import { UPDATE_USERAPI_DETAILS, UPDATE_USERTORRE_DETAILS, USER_RECORD } from '../helpers/help';
import { checkValidTorreUser, checkValidWrapUser, signInWarpUser, signUpTorreUserApi } from '../apis/TorreWrapApi';

const updateuserDetails = userApi => ({
  type: UPDATE_USERAPI_DETAILS,
  userApi,
});

const updateTorreUserDetails = userTorre => ({
  type: UPDATE_USERTORRE_DETAILS,
  userTorre,
});

const validatesTorreUserApi = userTorre => (dispatch, getState) => {
  dispatch(updateTorreUserDetails({ fetching: 'busy' }));
  return checkValidTorreUser(
    { public_id: userTorre },
  )
    .then(result => {
      dispatch(updateTorreUserDetails({ fetching: 'idle' }));
      if (result.message == 'Valid Torre.co User') {
        dispatch(updateTorreUserDetails({
          valid: true,
          errors: [],
        }));
      } else {
        dispatch(updateTorreUserDetails({
          valid: false,
          errors: [result.error],
        }));
      }
    }).catch(error => {
      dispatch(updateTorreUserDetails({ valid: false }));
      throw (error);
    });
};

const validatesWrapUserApi = userTorre => (dispatch, getState) => {
  dispatch(updateTorreUserDetails({ fetching: 'busy' }));
  return checkValidWrapUser(
    { public_id: userTorre },
  )
    .then(result => {
      dispatch(updateTorreUserDetails({ fetching: 'idle' }));
      if (result.message == 'Valid TorreWrap User') {
        dispatch(updateTorreUserDetails({
          inWrapDB: true,
          errors: [],
        }));
      } else {
        dispatch(updateTorreUserDetails({
          inWrapDB: false,
          createUser: userTorre,
          errors: [result.error],
        }));
      }
    }).catch(error => {
      dispatch(updateTorreUserDetails({
        inWrapDB: false,
      }));
      throw (error);
    });
};

const signInWrapUserApi = (userTorre, password) => (dispatch, getState) => {
  dispatch(updateTorreUserDetails({ fetching: 'busy' }));
  return signInWarpUser(
    {
      public_id: userTorre,
      password,
    },
  )
    .then(result => {
      dispatch(updateTorreUserDetails({ fetching: 'idle' }));
      if (result.user_id) {
        localStorage.setItem(USER_RECORD, JSON.stringify(result));
        dispatch(updateTorreUserDetails({
          signedIn: true,
          errors: [],
          ...result,
        }));
      } else {
        dispatch(updateTorreUserDetails({
          signedIn: false,
          errors: [result.message],
        }));
      }
    }).catch(error => {
      dispatch(updateTorreUserDetails({ signedIn: false }));
      throw (error);
    });
};


const signUpTorreUser = (userTorre, password) => (dispatch, getState) => {
  dispatch(updateTorreUserDetails({ fetching: 'busy' }));
  return signUpTorreUserApi(
    {
      public_id: userTorre,
      password,
    },
  )
    .then(result => {
      dispatch(updateTorreUserDetails({ fetching: 'idle' }));
      if (result.user_id) {
        localStorage.setItem(USER_RECORD, JSON.stringify(result));
        dispatch(updateTorreUserDetails({
          signedIn: true,
          errors: [],
          ...result,
        }));
      } else {
        dispatch(updateTorreUserDetails({
          signedIn: false,
          errors: [result.message],
        }));
      }
    }).catch(error => {
      dispatch(updateTorreUserDetails({ signedIn: false }));
      throw (error);
    });
};

export {
  updateuserDetails,
  updateTorreUserDetails,
  validatesTorreUserApi,
  validatesWrapUserApi,
  signInWrapUserApi,
  signUpTorreUser,
};
