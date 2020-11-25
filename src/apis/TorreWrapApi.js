import 'regenerator-runtime';

const signUpTorreWrapApi = async ({
    name, 
    public_id,
    password, 
    password_confirmation,
    picture_thumbnail
    }) => {
    const baseUrl = 'https://torrewrap-api.herokuapp.com'; //Heroku app
    // const baseUrl = 'http://127.0.0.1:5000';
    const endpoint = '/signup';
    const a = `?name=${name}`;
    const b = `?public_id=${public_id}`;
    const c = `?password=${password}`;
    const d = `?password_confirmation=${password_confirmation}`;
    const e = `?picture_thumbnail=${picture_thumbnail}`;
    const appURL = [baseUrl + endpoint + a + b + c + d + e];
    const request = {
        headers: {
            method: 'POST',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      };
    try {
      const response = await fetch(appURL, request);
      const obj = await response.json();
  
      // return complete list
      return obj;
    } catch (err) {
      throw ('Something went Signing up on Torre Wrap API ', err);
    }
};

const checkValidTorreUser = async ({public_id}) => {
  console.log('I am at API torre');
  console.log({public_id})
  const baseUrl = 'https://torrewrap-api.herokuapp.com'; //Provided bio endpoint
  const endpoint = '/auth/person/';
  const a = `${public_id}`;
  const appURL = [baseUrl + endpoint + a ];

  console.log(appURL)

  const request = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(appURL, request);
    console.log(response)
    const obj = await response.json();

    console.log({obj})

    // return complete list
    return obj;
  } catch (err) {
    throw ('Something went wrong with fetching user bio from torre.bio API ', err);
  }
};



export { signUpTorreWrapApi, checkValidTorreUser };
