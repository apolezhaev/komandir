import { RouteComponentProps } from "react-router-dom";

export interface IContentType {
  id?: number;
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
  None = 1,
  String = 2,
  Date = 3,
  DateTime = 4,
  Lookup = 5,
  Number = 6,
  Text = 7,
  Boolean = 8
}

export interface IFieldProps {
  id?: number;
  name: string;
  displayName?: string;
  required?: boolean;
  regex?: IRegexProps;
  dataTypeID?: DataType;
  contentTypeID?: number;
  description?: string;
  value?: any;
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
  editField(field: IFieldProps): void;
  current?: IFieldProps;
  deleteField(result: PopupResult, field: IFieldProps): void;
  onChange?(name: string, value: any): void;
  onFieldChange?(name: string, value: any): void;
  newField(ID: number): void;
  updateField(result: PopupResult, field: IFieldProps): void;
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
  minWidth?: number;
  minHeight?: number;
  children: any;
}
