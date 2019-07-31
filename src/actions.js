import { 
  FETCH_COLLECTIONS, SET_ORDER, SET_KEYWORD, SET_CURRENT_PAGE, SET_PER_PAGE, UPDATE_FAVOURITES
} from './constants';

import { fetchCollectionList } from './utils';

const setOrderAction = order => ({ type: SET_ORDER, payload: { order } });
const setKeywordAction = keyword => ({ type: SET_KEYWORD, payload: { keyword } });
const setCurrentPageAction = currentPage => ({ type: SET_CURRENT_PAGE, payload: { currentPage } });
const setPerPageAction = perPage => ({ type: SET_PER_PAGE, payload: { perPage } });
const setFavouritesAction = favourites => ({ type: UPDATE_FAVOURITES, payload: { favourites } });

const fetchCollectionsAction = ( collections,  count, perPage ) =>
  ({ type: FETCH_COLLECTIONS, payload: { collections,  count, perPage }});

export const getCollections = () => async (dispatch, getState) => {
  const { keyword: q, order: s, currentPage: p, perPage: ps, favourites } = getState();
  const { artObjects, count } = await fetchCollectionList({q, s, p, ps});

  const collections = artObjects.reduce( (obj, item) => {
    obj[item.objectNumber] = {
      webImage: item.webImage ? item.webImage.url : null ,
      headerImage: item.headerImage ? item.headerImage.url : null,
      title: item.title,
      longTitle: item.longTitle,
      favourite: favourites[item.objectNumber]
    };
    return obj;
  }, {}); 

  dispatch(fetchCollectionsAction(collections, count, ps));
};

export const getCollectionsByOrder = order => async dispatch => {
  dispatch(setOrderAction(order));
  dispatch(getCollections());
};

export const getCollectionsByKeyword = keyword => async dispatch => {
  dispatch(setKeywordAction(keyword));
  dispatch(getCollections());
};

export const getCollectionsByPage = pageNumber => async dispatch => {
  dispatch(setCurrentPageAction(pageNumber));
  dispatch(getCollections());
};

export const updatePerPageView = count => async dispatch => {
  dispatch(setCurrentPageAction(1));
  dispatch(setPerPageAction(count));
  dispatch(getCollections());
};

export const updateFavourites = id => async (dispatch, getState) => {
  const { favourites } = getState();
  const index = favourites.indexOf(id);
  index >= 0 ? favourites.splice(index, 1) : favourites.push(id);
  dispatch(setFavouritesAction(favourites));
};

export const getFavourites = () => async (dispatch, getState) => {
  const { favourites } = getState();
  const promises = favourites.map( id => fetchCollectionList({ q: id }));
  
  const favouritesCollection = {};

  Promise.all(promises).then(collectionsList => { 
    collectionsList.forEach( ({artObjects: [item]}) => {
      favouritesCollection[item.objectNumber] = {
        webImage: item.webImage ? item.webImage.url : null ,
        headerImage: item.headerImage ? item.headerImage.url : null,
        title: item.title,
        longTitle: item.longTitle,
      };
    });
    dispatch(fetchCollectionsAction(favouritesCollection, favouritesCollection.length));
  }, () => {
    dispatch(fetchCollectionsAction([], 0));
  });
};
