import { ADD_CONTENT_TYPE, CHANGE_CURRENT_CONTENT_TYPE, AddContentTypeAction, ContentTypeDataItem, IAction } from "../actions/contentTypes";

export interface ContentTypesState {
	contentTypes: Array<ContentTypeDataItem>,
	input?: string
}

const INITIAL_STATE: ContentTypesState = {
	contentTypes: new Array<ContentTypeDataItem>(),
	input: undefined
};

type Reducer = {
    (state: ContentTypesState, action: IAction): ContentTypesState;
} 

const reducers: { [action: string] : Reducer; } = {};

reducers[ADD_CONTENT_TYPE] = (state: ContentTypesState, action: IAction) => {		
	return {
		contentTypes: [ ...state.contentTypes, { ID: new Date().getMilliseconds(), name: state.input } ],
		input: state.input
	};
}

reducers[CHANGE_CURRENT_CONTENT_TYPE] = (state: ContentTypesState, action: IAction) => {		
	return {
		contentTypes: [ ...state.contentTypes ],
		input: state.input
	};
}

export default function(state: ContentTypesState = INITIAL_STATE, action: IAction) {
	const reducer = reducers[action.type];
	const reducedState = (reducer && reducer(state, action)) ?? state;
	return reducedState; 
}