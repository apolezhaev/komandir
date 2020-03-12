import { createStore, combineReducers, applyMiddleware } from "redux";
import { createContentTypeListStore } from "./contentTypeListStore";
import { createContentTypeStore } from "./contentTypeStore";
import { IAction } from "../interfaces";

const middleware = () => (next: any) => (action: IAction) => {
  if (action.middleware) action.middleware(action, next);
  else next(action);
};

export default createStore(
  combineReducers({
    contentTypeList: createContentTypeListStore,
    contentType: createContentTypeStore
  }),
  applyMiddleware(middleware)
);
