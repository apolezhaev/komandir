import { IAction, IReducer, IContentState } from "../interfaces";
import {
  CONTENT_READ,
  CONTENT_CREATE,
  CONTENT_ERROR,
  CONTENT_ADD,
  CONTENT_CHANGE
} from "../actions";

const INITIAL_STATE: IContentState = {
  menuItems: []
};

const reducers: { [action: string]: IReducer } = {
  [CONTENT_READ]: (state: any, action: IAction) => {
    const { menuItems, error, content } = state;
    return {
      menuItems: [...menuItems, ...action.payload],
      content,
      error
    };
  },
  [CONTENT_ERROR]: (state: any, action: IAction) => {
    const { menuItems, content } = state;
    return {
      menuItems: [...menuItems],
      content,
      error: action.payload?.message
    };
  },
  [CONTENT_CHANGE]: (state: any, action: IAction) => {
    const { menuItems, error, content } = state;
    const { name, value } = action.payload;
    return {
      menuItems: [...menuItems],
      content: { ...content, [name]: value },
      error
    };
  },
  [CONTENT_ADD]: (state: any, action: IAction) => {
    const { menuItems, error } = state;
    return {
      menuItems: [...menuItems],
      content: {},
      error
    };
  },
  [CONTENT_CREATE]: (state: any, action: IAction) => {
    const { menuItems, error, content } = state;
    return {
      menuItems: [...menuItems, ...action.payload],
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
