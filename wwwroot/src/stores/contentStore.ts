import { IAction, IReducer, IContentState } from "../interfaces";
import {
  CONTENT_LOAD,
  CONTENT_CREATE,
  CONTENT_ERROR,
  CONTENT_ADD,
  CONTENT_CHANGE,
  CONTENT_EDIT,
} from "../actions";

const INITIAL_STATE: IContentState = {
  menuItems: [],
  items: [],
};

const reducers: { [action: string]: IReducer } = {
  [CONTENT_EDIT]: (state: any, action: IAction) => {
    const { menuItems, items, error } = state;
    const { item } = action.payload;
    return {
      menuItems: [...menuItems],
      items: [...items],
      item,
      error,
    };
  },
  [CONTENT_LOAD]: (state: any, action: IAction) => {
    const { error, item } = state;
    const { menuItems, items } = action.payload;
    return {
      menuItems,
      items,
      item,
      error,
    };
  },
  [CONTENT_ERROR]: (state: any, action: IAction) => {
    const { menuItems, item, items } = state;
    return {
      menuItems: [...menuItems],
      items: [...items],
      item,
      error: action.payload?.message,
    };
  },
  [CONTENT_CHANGE]: (state: any, action: IAction) => {
    const { menuItems, error, item, items } = state;
    const { name, value } = action.payload;
    return {
      menuItems: [...menuItems],
      items: [...items],
      item: { ...item, [name]: value },
      error,
    };
  },
  [CONTENT_ADD]: (state: any, action: IAction) => {
    const { menuItems, error, items } = state;
    return {
      menuItems: [...menuItems],
      items: [...items],
      item: {},
      error,
    };
  },
  [CONTENT_CREATE]: (state: any, action: IAction) => {
    const { menuItems, error, item, items } = state;
    return {
      menuItems: [...menuItems, ...action.payload],
      items: [...items],
      item,
      error,
    };
  },
};

export function createContentStore(
  state: any = INITIAL_STATE,
  action: IAction
): any {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
}
