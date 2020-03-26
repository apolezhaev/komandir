import {
  IAction,
  IReducer,
  IContentState
} from "../interfaces";
import {
  CONTENT_READ
} from "../actions";

const INITIAL_STATE: IContentState = {
  contentTypes: []
};

const reducers: { [action: string]: IReducer } = {
  [CONTENT_READ]: (state: any, action: IAction) => {
    const list = state as IContentState;
    return {
      contentTypes: [...list.contentTypes, ...action.payload],
      error: list.error
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
