import { RouteComponentProps } from "react-router-dom";

export interface IContentType {
  contentTypeID?: number;
  name?: string;
  description?: string;
}

export interface IAction {
  type: string;
  payload: any;
  middleware?: any;
}

export interface IContentTypeListProps extends IContentTypeListState {
  readList(): void;
  delete(confirmed: boolean, contentType: IContentType): void;
  prompt(contentType: IContentType): void;
}

export interface IContentTypeListState {
  error?: string;
  contentTypes: Array<IContentType>;
  current?: IContentType;
}

export interface IReducer {
  (state: any, action: IAction): any;
}

export interface IConfirmProps {
  visible: boolean;
  title: string;
  onClose?(confirmed: boolean): void;
}

export enum DataType {
  None = 10,
  String = 1,
  Date = 2,
  DateTime = 3,
  Lookup = 4,
  Number = 5,
  Text = 6
}

export interface IFieldProps {
  contentTypeAttributeID?: number;
  name: string;
  regex?: IRegexProps;
  dataTypeID?: DataType;
  contentTypeID?: number;
  description?: string;
  value?: string;
  system: boolean;
  validationErrorMessage?: string;
  error?: string;
  onChange?(name: string, value: any): void;
  deleting?: boolean;
}

export interface IRegexProps {
  value: string;
  description?: string;
}

export interface IFormParams {
  ID?: string;
}

export interface IMiddleware {}

export interface IContentTypeProps extends RouteComponentProps<IFormParams> {
  error?: string;
  fields: IFieldProps[];
  read(ID: number): void;
  update(fields: IFieldProps[]): void;
  prompt(field: IFieldProps): void;
  current?: IFieldProps;
  deleteField(result: PopupResult, field: IFieldProps): void;
  onChange?(name: string, value: any): void;
}

export interface IContentTypeState {
  error?: string;
  fields: IFieldProps[];
  current?: IFieldProps;
}

export enum PopupResult {
  OK = 1,
  Cancel = 2
}

export interface IPopupProps {
  visible: boolean;
  title: string;
  onClose?(result: PopupResult): void;
}
