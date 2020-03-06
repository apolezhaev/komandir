import {
  IAction,
  IState,
  IContentType,
  IContentTypeListState,
  IReducer  
} from "../interfaces";
import {  
  CONTENT_TYPE_LIST_LOAD,
  CONTENT_TYPE_LIST_DELETE_OK,
  CONTENT_TYPE_LIST_DELETE_CANCEL,
  CONTENT_TYPE_LIST_DELETE_PROMPT,
  CONTENT_TYPE_LIST_ERROR
} from "../actions";

const INITIAL_STATE: IContentTypeListState = {
  contentTypes: new Array<IContentType>(),
};

const reducers: { [action: string]: IReducer } = {};

reducers[CONTENT_TYPE_LIST_LOAD] = (state: IState, action: IAction) => {
  const list = state as IContentTypeListState;
  return {
    contentTypes: [...list.contentTypes, ...action.payload],    
    error: list.error,
  };
};

reducers[CONTENT_TYPE_LIST_DELETE_OK] = (state: IState, action: IAction) => {
  const list = state as IContentTypeListState;
  return {
    contentTypes: [
      ...list.contentTypes.filter(
        (contentType: IContentType) =>
          contentType.contentTypeID !== action.payload
      )
    ],    
    error: list.error,
  };
};

reducers[CONTENT_TYPE_LIST_DELETE_CANCEL] = (state: IState, action: IAction) => {
  const list = state as IContentTypeListState;
  return {
    contentTypes: [...list.contentTypes],
    error: list.error,
  };
};

reducers[CONTENT_TYPE_LIST_ERROR] = (state: IState, action: IAction) => {
  const list = state as IContentTypeListState;
  return {
    contentTypes: [...list.contentTypes],
    error: action.payload,
  };
};

reducers[CONTENT_TYPE_LIST_DELETE_PROMPT] = (state: IState, action: IAction) => {
  const list = state as IContentTypeListState;
  return {
    contentTypes: [...list.contentTypes],
    selection: {...action.payload },
    error: list.error,
  };
};

export function createContentTypesStore(
  state: IState = INITIAL_STATE,
  action: IAction
): IState {
  const reducer = reducers[action.type]; 
  return reducer 
    ? reducer(state, action) 
    : state;  
}