import 'regenerator-runtime';

const fetchTorreUserBio = async ({public_id}) => {
    console.log('I am at API torre');
    console.log({public_id})
    const baseUrl = 'https://bio.torre.co'; //Provided bio endpoint
    const endpoint = '/api/bios/';
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

      //console.log({obj})
  
      // return complete list
      return obj;
    } catch (err) {
      throw ('Something went wrong with fetching user bio from torre.bio API ', err);
    }
  };

  export { fetchTorreUserBio };