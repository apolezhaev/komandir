import { createStore, combineReducers } from "redux";
import reducersContentTypes from "./reducers/contentTypes";

export default createStore(
  combineReducers({
    contentTypes: reducersContentTypes
  })
);
