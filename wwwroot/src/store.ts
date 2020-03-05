import { createStore, combineReducers } from "redux";
import contentTypesStore from "./reducers/contentTypes";
import formsStore from "./reducers/forms";

export default createStore(
  combineReducers({
    contentTypes: contentTypesStore,
    forms: formsStore
  })
);