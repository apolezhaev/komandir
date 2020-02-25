import { IAction } from "../interfaces";

export const CONTENT_TYPE_SAVE = "CONTENT_TYPE_SAVE";
export const CONTENT_TYPE_LOAD = "CONTENT_TYPE_LOAD";
export const CONTENT_TYPE_ERROR = "CONTENT_TYPE_ERROR";
export const CONTENT_TYPE_DELETE = "CONTENT_TYPE_DELETE";
export const CONTENT_TYPE_EDIT = "CONTENT_TYPE_EDIT";
export const CONTENT_TYPE_LIST_LOAD = "CONTENT_TYPE_LIST_LOAD";

export const action = (type: string, payload: any = undefined): IAction => ({
  type,
  payload
});
