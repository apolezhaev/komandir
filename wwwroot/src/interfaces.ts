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
  forms?: IFormState;
}

export enum FormFieldType {
  Text = "text",
  Checkbox = "checkbox",
  Textarea = "textarea",
  Hidden = "hidden"
}

export interface IFormFieldProps {
  name: string;
  type?: FormFieldType;
  description?: string;
  onChange?(e: React.ChangeEvent): void;
  value?: string;
  regex?: IRegexProps;
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

export interface IMiddleware {}

export interface IFormProps extends RouteComponentProps<IFormParams> {
  error?: string;
  fields: IFormFieldProps[];
  read(ID: Number): void;
  update(form: IFormState): void;
}

export interface IFormState {
  error?: string;
  fields: IFormFieldProps[];
}
