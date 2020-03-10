import React from "react";
import { RouteComponentProps } from "react-router-dom";

export interface IContentType {
  contentTypeID?: Number;
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
  selection?: IContentType;
}

export interface IReducer {
  (state: any, action: IAction): any;
}

export interface IConfirmProps {
  visible: boolean;
  title: string;
  onClose?(confirmed: boolean): void;
}

export interface IAppState {
  contentTypes?: IContentTypeListState;
  forms?: IContentTypeState;
}

export enum AttributeDataType {
  None = 10,
  String = 1,
  Date = 2,
  DateTime = 3,
  Lookup = 4,
  Number = 5,
  Text = 6
}

export interface IContentTypeAttributeProps {
  contentTypeAttributeID: Number;
  name: string;
  regex?: IRegexProps;
  dataTypeID?: AttributeDataType;
  contentTypeID?: Number;
  description?: string;
  onChange?(e: React.ChangeEvent): void;
  value?: string;
  validationErrorMessage?: string;
  error?: string;
}

export interface IRegexProps {
  value: string;
  description?: string;
}

export interface IFormParams {
  ID?: string;
}

export interface IMiddleware { }

export interface IContentTypeProps extends RouteComponentProps<IFormParams> {
  error?: string;
  fields: IContentTypeAttributeProps[];
  contentTypeAttributes: IContentTypeAttributeProps[];
  read(ID: Number): void;
  //readAttrubutes(ID: Number): void;
  update(form: IContentTypeState): void;
}

export interface IContentTypeState {
  error?: string;
  fields: IContentTypeAttributeProps[];
  contentTypeAttributes: IContentTypeAttributeProps[];
}