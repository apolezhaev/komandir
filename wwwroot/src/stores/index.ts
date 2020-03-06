import { createStore, combineReducers, applyMiddleware } from "redux";
import { createContentTypesStore } from "./contentTypes";
import { createFormsStore } from "./forms";
import { IAction } from "../interfaces";
import { CONTENT_TYPE_LIST_LOAD, CONTENT_TYPE_LIST_ERROR } from "../actions";

const customMiddleWare = (store: any) => (next: any) => (action: IAction) => {
  if (action.type === CONTENT_TYPE_LIST_LOAD) {
    fetch("http://localhost:5000/api/ContentTypes")
      .then(response => {
        if (response.ok)
          return response.json();
        throw new Error("Error loading content type list.");
      })
      .then(response => {
        action.payload = response;
        next(action);
      })
      .catch(error => store.dispatch({ type: CONTENT_TYPE_LIST_ERROR, payload: error.message }));
  } else {
    next(action);
  }
}

export default createStore(
  combineReducers({
    contentTypes: createContentTypesStore,
    forms: createFormsStore
  }),
  applyMiddleware(customMiddleWare)
);