import { IAction, IReducer, IContentState } from "../interfaces";
import { CONTENT_READ, CONTENT_CREATE, CONTENT_ERROR } from "../actions";

const INITIAL_STATE: IContentState = {
  menuItems: []
};

const reducers: { [action: string]: IReducer } = {
  [CONTENT_READ]: (state: any, action: IAction) => {
    const { menuItems, error } = state;
    return {
      menuItems: [...menuItems, ...action.payload],
      error
    };
  },
  [CONTENT_ERROR]: (state: any, action: IAction) => {
    const { menuItems } = state;
    return {
      menuItems: [...menuItems],
      error: action.payload?.message
    };
  },
  [CONTENT_CREATE]: (state: any, action: IAction) => {
    const { menuItems, error } = state;
    return {
      menuItems: [...menuItems, ...action.payload],
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
