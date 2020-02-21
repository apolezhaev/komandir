export interface IContentType {
  ID?: Number;
  name?: string;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IContentTypesState {
  contentTypes: Array<IContentType>;
  input?: string;
}

export interface IReducer {
  (state: IContentTypesState, action: IAction): IContentTypesState;
}
