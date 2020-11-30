import 'regenerator-runtime';

const signUpTorreWrapApi = async ({
  name,
  public_id,
  password,
  password_confirmation,
  picture_thumbnail,
}) => {
  //const baseUrl = 'https://torrewrap-api.herokuapp.com'; // Provided bio endpoint
  const baseUrl = 'http://127.0.0.1:5000';
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
    },
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

const checkValidTorreUser = async ({ public_id }) => {
  console.log('I am at API torre');
  console.log({ public_id });
  //const baseUrl = 'https://torrewrap-api.herokuapp.com'; // Provided bio endpoint
  const baseUrl = 'http://127.0.0.1:5000';
  const endpoint = '/auth/person/';
  const a = `${public_id}`;
  const appURL = [baseUrl + endpoint + a];

  console.log(appURL);

  const request = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(appURL, request);
    console.log(response);
    const obj = await response.json();

    console.log({ obj });

    // return complete list
    return obj;
  } catch (err) {
    throw ('Something went wrong with fetching user bio from torre.bio API ', err);
  }
};

const checkValidWrapUser = async ({ public_id }) => {
  console.log('I am at API Wrap User');
  console.log({ public_id });
  //const baseUrl = 'https://torrewrap-api.herokuapp.com'; // Provided bio endpoint
  const baseUrl = 'http://127.0.0.1:5000';
  const endpoint = '/auth/wrapuser/';
  const a = `${public_id}`;
  const appURL = [baseUrl + endpoint + a];

  console.log(appURL);

  const request = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(appURL, request);
    console.log(response);
    const obj = await response.json();

    console.log({ obj });

    // return complete list
    return obj;
  } catch (err) {
    throw ('Something went wrong with fetching user bio from torre.bio API ', err);
  }
};

const signInWarpUser = async ({ public_id, password }) => {
  console.log('I am at API Wrap User');
  console.log({ public_id });
  //const baseUrl = 'https://torrewrap-api.herokuapp.com'; // Provided bio endpoint
  const baseUrl = 'http://127.0.0.1:5000';
  const endpoint = '/auth/login?';
  const a = `public_id=${public_id}`;
  const b = `&password=${password}`;
  const appURL = [baseUrl + endpoint + a + b];

  console.log(appURL);

  const request = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(appURL, request);
    console.log(response);
    const obj = await response.json();

    console.log({ obj });

    // return complete list
    return obj;
  } catch (err) {
    throw ('Something went wrong with fetching user bio from torre.bio API ', err);
  }
};

const signUpTorreUserApi = async ({ public_id, password }) => {
  console.log('I am at API Wrap User');
  console.log({ public_id });
  //const baseUrl = 'https://torrewrap-api.herokuapp.com'; // Provided bio endpoint
  const baseUrl = 'http://127.0.0.1:5000';
  const endpoint = '/signup?';
  const a = `public_id=${public_id}`;
  const b = `&password=${password}`;
  const c = `&picture_thumbnail=http`
  const appURL = [baseUrl + endpoint + a + b + c];

  console.log(appURL);

  const request = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(appURL, request);
    console.log(response);
    const obj = await response.json();

    console.log({ obj });

    // return complete list
    return obj;
  } catch (err) {
    throw ('Something went wrong with fetching user bio from torre.bio API ', err);
  }
};

const storeProfileAssetApi = async ({ user, auth, asset_type, payload }) => {
  console.log('I am at API StoreProfilePicture');
  //const baseUrl = 'https://torrewrap-api.herokuapp.com'; // Provided bio endpoint
  const baseUrl = 'http://127.0.0.1:5000';
  const endpoint = '/asset_upload?';
  const a = `user=${user}`;
  const b = `&auth=${auth}`;
  const c = `&asset_type=${asset_type}`;
  const d = `&payload=${payload}`;
  const appURL = [baseUrl + endpoint + a + b + c ];

  console.log(appURL);

  const request = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({payload: payload})
  };
  try {
    const response = await fetch(appURL, request);
    console.log(response);
    const obj = await response.json();

    console.log({ obj });

    // return complete list
    return obj;
  } catch (err) {
    throw ('Something went wrong with fetching user bio from torre.bio API ', err);
  }
};

const saveProfileAssetApi = async ({ user, auth, asset_type}) => {
  console.log('I am at API StoreProfilePicture');
  //const baseUrl = 'https://torrewrap-api.herokuapp.com'; // Provided bio endpoint
  const baseUrl = 'http://127.0.0.1:5000';
  const endpoint = '/asset_save?';
  const a = `user=${user}`;
  const b = `&auth=${auth}`;
  const c = `&asset_type=${asset_type}`;
  const appURL = [baseUrl + endpoint + a + b + c ];

  console.log(appURL);

  const request = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(appURL, request);
    console.log(response);
    const obj = await response.json();

    console.log({ obj });

    // return complete list
    return obj;
  } catch (err) {
    throw ('Something went wrong with fetching user bio from torre.bio API ', err);
  }
};

const clearProfileAssetApi = async ({ user, auth, asset_type, cloud_url}) => {
  console.log('I am at API StoreProfilePicture');
  //const baseUrl = 'https://torrewrap-api.herokuapp.com'; // Provided bio endpoint
  const baseUrl = 'http://127.0.0.1:5000';
  const endpoint = '/asset_delete?';
  const a = `user=${user}`;
  const b = `&auth=${auth}`;
  const c = `&asset_type=${asset_type}`;
  const d = `&cloud_url=${cloud_url};`
  const appURL = [baseUrl + endpoint + a + b + c + d];

  console.log(appURL);

  const request = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(appURL, request);
    console.log(response);
    const obj = await response.json();

    console.log({ obj });

    // return complete list
    return obj;
  } catch (err) {
    throw ('Something went wrong with fetching user bio from torre.bio API ', err);
  }
};

const refreshProfileApi = async ({ user, auth}) => {
  console.log('I am at API StoreProfilePicture');
  //const baseUrl = 'https://torrewrap-api.herokuapp.com'; // Provided bio endpoint
  const baseUrl = 'http://127.0.0.1:5000';
  const endpoint = '/asset_delete?';
  const a = `user=${user}`;
  const b = `&auth=${auth}`;

  const appURL = [baseUrl + endpoint + a + b ];

  console.log(appURL);

  const request = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(appURL, request);
    console.log(response);
    const obj = await response.json();

    console.log({ obj });

    // return complete list
    return obj;
  } catch (err) {
    throw ('Something went wrong with fetching user bio from torre.bio API ', err);
  }
};

export {
  signUpTorreWrapApi, 
  checkValidTorreUser, 
  checkValidWrapUser, 
  signInWarpUser, 
  signUpTorreUserApi,
  storeProfileAssetApi,
  saveProfileAssetApi,
  clearProfileAssetApi,
  refreshProfileApi
};
