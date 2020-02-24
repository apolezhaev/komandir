import {
  IAction,
  IContentType,
  IContentTypesState,
  IReducer
} from "../interfaces";
import {
  ADD_CONTENT_TYPE,
  CHANGE_NAME,
  LOAD,
  DELETE
} from "../actions/contentTypes";

const INITIAL_STATE: IContentTypesState = {
  contentTypes: new Array<IContentType>(),
  input: undefined
};

const reducers: { [action: string]: IReducer } = {};

reducers[ADD_CONTENT_TYPE] = (state: IContentTypesState, action: IAction) => {
  return {
    contentTypes: [
      ...state.contentTypes,
      { ID: new Date().getMilliseconds(), name: state.input }
    ],
    input: ""
  };
};

reducers[LOAD] = (state: IContentTypesState, action: IAction) => {
  return {
    contentTypes: [...state.contentTypes, ...action.payload],
    input: ""
  };
};

reducers[CHANGE_NAME] = (state: IContentTypesState, action: IAction) => {
  return {
    contentTypes: [...state.contentTypes],
    input: action.payload
  };
};

reducers[DELETE] = (state: IContentTypesState, action: IAction) => {
  return {
    contentTypes: [
      ...state.contentTypes.filter(
        (contentType: IContentType) =>
          contentType.contentTypeID !== action.payload
      )
    ],
    input: ""
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
