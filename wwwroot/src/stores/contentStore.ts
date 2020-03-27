import {
  IAction,
  IReducer,
  IContentState
} from "../interfaces";
import {
  CONTENT_READ, CONTENT_CREATE
} from "../actions";

const INITIAL_STATE: IContentState = {
  menuItems: []
};

const reducers: { [action: string]: IReducer } = {
  [CONTENT_READ]: (state: any, action: IAction) => {
    const list = state as IContentState;
    return {
      menuItems: [...list.menuItems, ...action.payload],
      error: list.error
    };
  },
  [CONTENT_CREATE]: (state: any, action: IAction) => {
    const list = state as IContentState;
    return {
      menuItems: [...list.menuItems, ...action.payload],
      error: list.error
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
