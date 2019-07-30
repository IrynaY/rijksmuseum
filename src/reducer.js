import { 
  FETCH_COLLECTIONS, FETCH_FAVOURITES, SET_ORDER, SET_KEYWORD, SET_CURRENT_PAGE, SET_PER_PAGE, UPDATE_FAVOURITES
} from './constants';

const initialState = {
  collections: {},
  favourites: [],
  order: '',
  keyword: '',
  totalPages: '',
  currentPage: 1,
  perPage: 10,
};

export default function reducer (state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case FETCH_COLLECTIONS:
      return {
        ...state,
        collections: payload.collections,
        totalPages: Math.ceil(payload.count / payload.perPage)
      };
    case FETCH_FAVOURITES:
      return {
        ...state,
        collections: payload.collections,
        totalPages: Math.ceil(payload.count / payload.perPage)
      };
    case SET_ORDER:
      return {
        ...state,
        order: payload.order
      };
    case UPDATE_FAVOURITES:
      return {
        ...state,
        favourites: [...payload.favourites]
      };
    case SET_KEYWORD:
      return {
        ...state,
        keyword: payload.keyword
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload.currentPage
      };
    case SET_PER_PAGE:
      return {
        ...state,
        perPage: payload.perPage
      };
    default:
      return state;
  }
}
