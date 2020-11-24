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
    const c = `?password_confirmation=${password_confirmation}`;
    const d = `?picture_thumbnail=${picture_thumbnail}`;
    const appURL = [baseUrl + endpoint + a + b + c + d];
    const request = {
        headers: {
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



export { signUpTorreWrapApi  };
