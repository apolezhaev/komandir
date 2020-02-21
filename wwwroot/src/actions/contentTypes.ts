export const ADD_CONTENT_TYPE = 'ADD_CONTENT_TYPE';
export const CHANGE_CURRENT_CONTENT_TYPE = 'CHANGE_CURRENT_CONTENT_TYPE';

export const action = (type: string, payload: any = undefined) => {
	return {
		type: type,
		payload: payload
	}
} 

export const save = () => ({
	type: ADD_CONTENT_TYPE
});

export const changeCurrent = (name: string) => ({
	type: CHANGE_CURRENT_CONTENT_TYPE,
	payload: {
		name
	}
});

export interface ContentTypeDataItem {
	ID?: Number,
	name?: string
}

export interface IAction {
	type: string
}

export interface AddContentTypeAction extends IAction {	
	payload: ContentTypeDataItem
}