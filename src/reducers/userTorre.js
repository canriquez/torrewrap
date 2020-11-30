import {
  UPDATE_USERTORRE_DETAILS,
} from '../helpers/help';

const state_default = {
  errors: [],
  fetching: 'idle',
  uploading: 'idle',
  signedIn: false,
  valid: false,
  inWrapDB: false,
  createUser:'',
  persona: {},
  picture_thumbnail: '',
  draft_thumbnail: undefined,
  video_url: 'test',
  savedProfilePicture: 'false'
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
