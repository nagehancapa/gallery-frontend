import { FETCH_ARTWORKS_SUCCESS } from "./actions";

const initialState = [];

export default function artworksReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ARTWORKS_SUCCESS:
      return [...action.payload];
    default:
      return state;
  }
}
