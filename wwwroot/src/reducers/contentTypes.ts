import {
  IAction,
  IContentType,
  IContentTypesState,
  IReducer
} from "../interfaces";
import {
  CONTENT_TYPE_SAVE,
  CONTENT_TYPE_EDIT,
  CONTENT_TYPE_LOAD,
  CONTENT_TYPE_LIST_LOAD,
  CONTENT_TYPE_DELETE,
  CONTENT_TYPE_ERROR
} from "../actions/contentTypes";

const INITIAL_STATE: IContentTypesState = {
  contentTypes: new Array<IContentType>(),
  current: undefined 
};

const reducers: { [action: string]: IReducer } = {};

reducers[CONTENT_TYPE_SAVE] = (state: IContentTypesState, action: IAction) => {
  return {
    contentTypes: [...state.contentTypes],
    current: {...state.current }
  };
};

reducers[CONTENT_TYPE_LIST_LOAD] = (state: IContentTypesState, action: IAction) => {
  return {
    contentTypes: [...state.contentTypes, ...action.payload],
    current: {...state.current }
  };
};

reducers[CONTENT_TYPE_EDIT] = (state: IContentTypesState, action: IAction) => { 
  return {
    contentTypes: [...state.contentTypes],
    current: {...state.current, name: action.payload}  
  };
};

reducers[CONTENT_TYPE_DELETE] = (state: IContentTypesState, action: IAction) => {
  return {
    contentTypes: [
      ...state.contentTypes.filter(
        (contentType: IContentType) =>
          contentType.contentTypeID !== action.payload
      )
    ],
    current: {...state.current }
  };
};

reducers[CONTENT_TYPE_LOAD] = (state: IContentTypesState, action: IAction) => {
  return {
    contentTypes: [...state.contentTypes],
    current: action.payload
  };
};

reducers[CONTENT_TYPE_ERROR] = (state: IContentTypesState, action: IAction) => {
  return {
    contentTypes: [...state.contentTypes],
    current: {...state.current },
    error: action.payload?.message
  };
};

export default function(
  state: IContentTypesState = INITIAL_STATE,
  action: IAction
) {
  const reducer = reducers[action.type];
  const reducedState = (reducer && reducer(state, action)) ?? state;
  return reducedState;
}
