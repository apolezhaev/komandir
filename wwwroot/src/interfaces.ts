export interface IContentType {
  contentTypeID?: Number;
  name?: string;
  description?: string;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IContentTypesState {
  error?: string;
  contentTypes: Array<IContentType>;
  current?: IContentType; 
}

export interface IReducer {
  (state: IContentTypesState, action: IAction): IContentTypesState;
}
