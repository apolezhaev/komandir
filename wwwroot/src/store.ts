import { createStore, combineReducers } from "redux";
import contentTypesStore from "./reducers/contentTypes";
import { reducer as reduxFormReducer } from "redux-form";

export default createStore(
  combineReducers({
    contentTypes: contentTypesStore,
    form: reduxFormReducer
  })
);