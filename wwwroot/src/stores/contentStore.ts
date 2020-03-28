import { IAction, IReducer, IContentState } from "../interfaces";
import {
  CONTENT_LOAD,
  CONTENT_CREATE,
  CONTENT_ERROR,
  CONTENT_ADD,
  CONTENT_CHANGE
} from "../actions";

const INITIAL_STATE: IContentState = {
  menuItems: [],
  items: []
};

const reducers: { [action: string]: IReducer } = {
  [CONTENT_LOAD]: (state: any, action: IAction) => {
    const { error, content } = state;
    const { menuItems, items } = action.payload;
    return {
      menuItems,
      items,
      content,
      error
    };
  },
  [CONTENT_ERROR]: (state: any, action: IAction) => {
    const { menuItems, content, items } = state;
    return {
      menuItems: [...menuItems],
      items: [...items],
      content,
      error: action.payload?.message
    };
  },
  [CONTENT_CHANGE]: (state: any, action: IAction) => {
    const { menuItems, error, content, items } = state;
    const { name, value } = action.payload;
    return {
      menuItems: [...menuItems],
      items: [...items],
      content: { ...content, [name]: value },
      error
    };
  },
  [CONTENT_ADD]: (state: any, action: IAction) => {
    const { menuItems, error, items } = state;
    return {
      menuItems: [...menuItems],
      items: [...items],
      content: {},
      error
    };
  },
  [CONTENT_CREATE]: (state: any, action: IAction) => {
    const { menuItems, error, content, items } = state;
    return {
      menuItems: [...menuItems, ...action.payload],
      items: [...items],
      content,
      error
    };
  }
};

export function createContentStore(
  state: any = INITIAL_STATE,
  action: IAction
): any {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
}
