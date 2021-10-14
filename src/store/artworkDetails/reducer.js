import {
  ARTWORK_DETAILS_FETCHED,
  BID_POST_SUCCESS,
  HEARTS_UPDATED,
  ARTWORK_POST_SUCCESS,
} from "./actions";

const initialState = {
  bids: [],
};

export default function artworkDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case ARTWORK_DETAILS_FETCHED:
      return { ...state, ...action.payload };
    case HEARTS_UPDATED:
      return { ...state, ...action.payload };
    case BID_POST_SUCCESS:
      return { ...state, bids: [...state.bids, action.payload] };
    case ARTWORK_POST_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
