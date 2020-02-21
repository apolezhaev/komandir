import { IAction } from "../interfaces";

export const ADD_CONTENT_TYPE = "ADD_CONTENT_TYPE";
export const CHANGE_NAME = "CHANGE_NAME";

export const action = (type: string, payload: any = undefined): IAction => ({
  type,
  payload
});
