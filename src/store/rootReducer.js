import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import artworks from "./artworks/reducer";

export default combineReducers({
  appState,
  user,
  artworks,
});
