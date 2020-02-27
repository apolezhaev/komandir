import { createStore, combineReducers } from "redux";
import contentTypesStore from "./reducers/contentTypes";

export default createStore(
  combineReducers({
    contentTypes: contentTypesStore
  })
);