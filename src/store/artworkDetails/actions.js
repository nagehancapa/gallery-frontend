import axios from "axios";
import { apiUrl } from "../../config/constants";
import { fetchArtworks } from "../artworks/actions";
import { selectUser } from "../user/selectors";
import { showMessageWithTimeout } from "../appState/actions";

export const ARTWORK_DETAILS_FETCHED = "ARTWORK_DETAILS_FETCHED";
export const HEARTS_UPDATED = "HEARTS_UPDATED";
export const BID_POST_SUCCESS = "BID_POST_SUCCESS";
export const ARTWORK_POST_SUCCESS = "ARTWORK_POST_SUCCESS";

const artworkDetailsFetched = (artwork) => ({
  type: ARTWORK_DETAILS_FETCHED,
  payload: artwork,
});

const heartsUpdated = (artwork) => ({
  type: HEARTS_UPDATED,
  payload: artwork,
});

const bidPostSuccess = (bid) => ({
  type: BID_POST_SUCCESS,
  payload: bid,
});

const artworkPostSuccess = (artwork) => ({
  type: ARTWORK_POST_SUCCESS,
  payload: artwork,
});

export const fetchArtworkById = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/artworks/${id}`);
      dispatch(artworkDetailsFetched(response.data.artwork));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateNumberOfHearts = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.patch(`${apiUrl}/artworks/${id}`);
      dispatch(heartsUpdated(response.data.artwork));
      dispatch(fetchArtworks());
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postBid = (id, amount) => {
  return async (dispatch, getState) => {
    try {
      const user = selectUser(getState());
      const response = await axios.post(
        `${apiUrl}/artworks/${id}/bids`,
        {
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(bidPostSuccess(response.data.newBid));
      dispatch(fetchArtworks());
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postArtwork = (title, imageUrl, minimumBid) => {
  return async (dispatch, getState) => {
    try {
      const user = selectUser(getState());
      const response = await axios.post(
        `${apiUrl}/artworks/`,
        {
          title,
          imageUrl,
          minimumBid,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(artworkPostSuccess(response.data.artwork));
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Artwork posted successfully",
          3000
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};
