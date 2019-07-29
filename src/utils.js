const API_KEY = 'x7YBMwPb';
const RIJK_URL = 'https://www.rijksmuseum.nl/api/nl/collection/';
// const BASE_PARAMS = new URLSearchParams([['key', API_KEY],['format', 'json']]);
const ALLOWED_PARAMS = ['q', 's', 'p', 'ps'];

const fetchy = uri => fetch(uri).then(resp => {
  if(resp.ok)
    return resp.json();
  throw new Error(resp.statusText);
});

export const fetchCollectionList = params => {
  const BASE_PARAMS = new URLSearchParams([['key', API_KEY],['format', 'json']]);

  for(const key in params) {
    if(params[key] !== '' && ALLOWED_PARAMS.includes(key))
      BASE_PARAMS.append(key, params[key]);
  }
  const uri = RIJK_URL + `?${BASE_PARAMS.toString()}`;

  return fetchy(uri);
};

export const fetchObject = id => {
  let uri = RIJK_URL + id + `?key=${API_KEY}&format=json`;

  return fetchy(uri);
};
