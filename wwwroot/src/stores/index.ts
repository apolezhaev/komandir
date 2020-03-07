import { createStore, combineReducers, applyMiddleware } from "redux";
import { createContentTypesStore } from "./contentTypes";
import { createFormsStore } from "./forms";
import { IAction } from "../interfaces";

const middleware = () => (next: any) => (action: IAction) => {
  if (action.middleware) action.middleware(action, next);
  else next(action);
};

export default createStore(
  combineReducers({
    contentTypes: createContentTypesStore,
    forms: createFormsStore
  }),
  applyMiddleware(middleware)
);
