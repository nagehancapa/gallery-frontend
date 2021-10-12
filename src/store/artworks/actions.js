import { apiUrl } from "../../config/constants";
import axios from "axios";

export const FETCH_ARTWORKS_SUCCESS = "FETCH_ARTWORKS_SUCCESS";

const fetchArtworksSuccess = (artworks) => ({
  type: FETCH_ARTWORKS_SUCCESS,
  payload: artworks,
});

export const fetchArtworks = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/artworks`);
      dispatch(fetchArtworksSuccess(response.data.artworks));
    } catch (error) {
      console.log(error.message);
    }
  };
};
