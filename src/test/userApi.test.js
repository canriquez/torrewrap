import deepFreeze from 'deep-freeze';
import userApi from '../reducers/userApi';
import { updateuserDetails } from '../actions/index';

it('test updates userDetails in full', () => {
  const stateBefore = {};

  const userDetails = {
    id: 10,
    name: 'pablo',
    publicId: 'plopez',
    pictureThumbnail: 'http:',
    videoUrl: 'url',
    jsonResponse: {},
  };

  const stateAfter = userDetails;

  /* inmmutability check */
  deepFreeze(stateBefore); // makes sure reducer is pure function
  deepFreeze(updateuserDetails); // makes sure reducer is pure function

  expect(
    userApi(stateBefore, updateuserDetails(userDetails)),
  ).toEqual(stateAfter);
});
