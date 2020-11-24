import 'regenerator-runtime';

const fetchTorreUserBio = async ({public_id}) => {

    const baseUrl = ' https://torre.bio'; //Provided bio endpoint
    const endpoint = '/api/bios/';
    const a = `?username=${public_id}`;
    const appURL = [baseUrl + endpoint + a ];

    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(appURL, request);
      const obj = await response.json();
  
      // return complete list
      return obj;
    } catch (err) {
      throw ('Something went wrong with fetching user bio from torre.bio API ', err);
    }
  };

  export { fetchTorreUserBio  };