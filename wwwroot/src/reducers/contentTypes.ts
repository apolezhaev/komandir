import {
  IAction,
  IState,
  IContentType,
  IContentTypesState,
  IReducer
} from "../interfaces";
import {
  CONTENT_TYPE_SAVE,
  CONTENT_TYPE_EDIT,
  CONTENT_TYPE_LOAD,
  CONTENT_TYPE_LIST_LOAD,
  CONTENT_TYPE_DELETE_CONFIRM,
  CONTENT_TYPE_DELETE_CANCEL,
  CONTENT_TYPE_ERROR,
  CONTENT_TYPE_DELETE_ASK_CONFIRMATION
} from "../actions/contentTypes";

const INITIAL_STATE: IContentTypesState = {
  contentTypes: new Array<IContentType>(),
  current: undefined,
  error: undefined,
  deleting: false 
};

const reducers: { [action: string]: IReducer } = {};

reducers[CONTENT_TYPE_SAVE] = (state: IState, action: IAction) => {
  const contentTypesState = state as IContentTypesState;
  return {
    contentTypes: [...contentTypesState.contentTypes],
    current: {...contentTypesState.current },
    error: contentTypesState.error,
    deleting: contentTypesState.deleting 
  };
};

reducers[CONTENT_TYPE_LIST_LOAD] = (state: IState, action: IAction) => {
  const contentTypesState = state as IContentTypesState;
  return {
    contentTypes: [...contentTypesState.contentTypes, ...action.payload],
    current: {...contentTypesState.current },
    error: contentTypesState.error,
    deleting: contentTypesState.deleting
  };
};

reducers[CONTENT_TYPE_EDIT] = (state: IState, action: IAction) => { 
  const contentTypesState = state as IContentTypesState;
  return {
    contentTypes: [...contentTypesState.contentTypes],
    current: {...contentTypesState.current, name: action.payload},
    error: contentTypesState.error,
    deleting: contentTypesState.deleting
  };
};

reducers[CONTENT_TYPE_LOAD] = (state: IState, action: IAction) => {
  const contentTypesState = state as IContentTypesState;
  return {
    contentTypes: [...contentTypesState.contentTypes],
    current: {...action.payload },
    error: contentTypesState.error,
    deleting: contentTypesState.deleting
  };
};

reducers[CONTENT_TYPE_ERROR] = (state: IState, action: IAction) => {
  const contentTypesState = state as IContentTypesState;
  return {
    contentTypes: [...contentTypesState.contentTypes],
    current: {...contentTypesState.current },
    error: action.payload?.message,
    deleting: contentTypesState.deleting
  };
};

reducers[CONTENT_TYPE_DELETE_CONFIRM] = (state: IState, action: IAction) => {
  const contentTypesState = state as IContentTypesState;
  return {
    contentTypes: [
      ...contentTypesState.contentTypes.filter(
        (contentType: IContentType) =>
          contentType.contentTypeID !== action.payload
      )
    ],
    current: {},
    error: contentTypesState.error,
    deleting: false
  };
};

reducers[CONTENT_TYPE_DELETE_CANCEL] = (state: IState, action: IAction) => {
  const contentTypesState = state as IContentTypesState;
  return {
    contentTypes: [...contentTypesState.contentTypes],
    current: {},
    error: contentTypesState.error,
    deleting: false
  };
};

reducers[CONTENT_TYPE_DELETE_ASK_CONFIRMATION] = (state: IState, action: IAction) => {
  const contentTypesState = state as IContentTypesState;
  return {
    contentTypes: [...contentTypesState.contentTypes],
    current: {...action.payload },
    error: contentTypesState.error,
    deleting: true
  };
};

export default function(
  state: IContentTypesState = INITIAL_STATE,
  action: IAction
) {
  const reducer = reducers[action.type];
  if (reducer)
    return reducer(state, action);

  return state; 
}
