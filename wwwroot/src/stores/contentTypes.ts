import {
  IAction,
  IContentType,
  IContentTypeListState,
  IReducer
} from "../interfaces";
import {
  CONTENT_TYPE_LIST_LOAD,
  CONTENT_TYPE_DELETE_OK,
  CONTENT_TYPE_DELETE_CANCEL,
  CONTENT_TYPE_DELETE_PROMPT,
  CONTENT_TYPE_ERROR
} from "../actions";

const INITIAL_STATE: IContentTypeListState = {
  contentTypes: new Array<IContentType>()
};

const reducers: { [action: string]: IReducer } = {
  [CONTENT_TYPE_LIST_LOAD]: (state: any, action: IAction) => {
    const list = state as IContentTypeListState;
    return {
      contentTypes: [...list.contentTypes, ...action.payload],
      error: list.error
    };
  },

  [CONTENT_TYPE_DELETE_OK]: (state: any, action: IAction) => {
    const list = state as IContentTypeListState;
    return {
      contentTypes: [
        ...list.contentTypes.filter(
          (contentType: IContentType) =>
            contentType.id !== action.payload
        )
      ],
      error: list.error
    };
  },

  [CONTENT_TYPE_DELETE_CANCEL]: (state: any, action: IAction) => {
    const list = state as IContentTypeListState;
    return {
      contentTypes: [...list.contentTypes],
      error: list.error
    };
  },

  [CONTENT_TYPE_ERROR]: (state: any, action: IAction) => {
    const list = state as IContentTypeListState;
    return {
      contentTypes: [...list.contentTypes],
      error: action.payload
    };
  },

  [CONTENT_TYPE_DELETE_PROMPT]: (state: any, action: IAction) => {
    const list = state as IContentTypeListState;
    return {
      contentTypes: [...list.contentTypes],
      current: { ...action.payload },
      error: list.error
    };
  }
};

export function createContentTypesStore(
  state: any = INITIAL_STATE,
  action: IAction
): any {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
}
