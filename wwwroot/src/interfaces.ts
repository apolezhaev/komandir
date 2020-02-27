export interface IContentType {
  contentTypeID?: Number;
  name?: string;
  description?: string;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IState {
}

export interface IContentTypesState extends IState {
  error?: string;
  contentTypes: Array<IContentType>;
  current?: IContentType;
  deleting: false;
}

export interface IReducer {
  (state: IState, action: IAction): IState;
}

export interface IConfirmProps {  
  visible: boolean;
  title: string; 
  onClose?(confirmed: boolean): void;  
}

export interface IAppState
{
    contentTypes?: IContentTypesState;
}