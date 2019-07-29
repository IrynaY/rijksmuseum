import { FETCH_COLLECTIONS, SET_ORDER, SET_KEYWORD, SET_CURRENT_PAGE, SET_PER_PAGE } from './constants';

import { fetchCollectionList } from './utils';

const setOrderAction = order => ({ type: SET_ORDER, payload: { order } });
const setKeywordAction = keyword => ({ type: SET_KEYWORD, payload: { keyword } });
const setCurrentPageAction = currentPage => ({ type: SET_CURRENT_PAGE, payload: { currentPage } });
const setPerPageAction = perPage => ({ type: SET_PER_PAGE, payload: { perPage } });

const fetchCollectionsAction = ( list,  count, perPage ) =>
  ({ type: FETCH_COLLECTIONS, payload: { list,  count, perPage }});

export const getCollections = () => async (dispatch, getState) => {
  const { keyword: q, order: s, currentPage: p, perPage: ps } = getState();
  const { artObjects, count } = await fetchCollectionList({q, s, p, ps});
  dispatch(fetchCollectionsAction(artObjects, count, ps));
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
  dispatch(setPerPageAction(count));
  dispatch(getCollections());
};
