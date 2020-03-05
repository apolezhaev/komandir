import { createStore, combineReducers } from "redux";
import { createContentTypesStore } from "./contentTypes";
import { createFormsStore } from "./forms";

export default createStore(
  combineReducers({
    contentTypes: createContentTypesStore,
    forms: createFormsStore
  })
);