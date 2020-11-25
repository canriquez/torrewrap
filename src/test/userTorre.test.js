import deepFreeze from 'deep-freeze';
import userTorre from '../reducers/userTorre';
import { updateTorreUserDetails } from '../actions/index';

it('test updates userDetails in full', () => {
  const stateBefore = {};

  const userDetails = {
    id:10, 
    name: 'pablo',
  }

  const stateAfter = userDetails;

  /* inmmutability check */
  deepFreeze(stateBefore); // makes sure reducer is pure function
  deepFreeze(updateTorreUserDetails); // makes sure reducer is pure function

  expect(
    userTorre(stateBefore, updateTorreUserDetails(userDetails)),
  ).toEqual(stateAfter);
});
