import React from "react";

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

export interface IAppState {
  contentTypes?: IContentTypesState;
  forms?: IFormState;
}

export enum FormFieldType {
  Text = 'text',
  Checkbox = 'checkbox',
  Textarea = 'textarea',
  Hidden = 'hidden'
}

export interface IFormFieldProps {
  name: string,
  type: FormFieldType,
  required?: boolean,
  description?: string 
  onChange?(e: React.ChangeEvent): void;  
  value?: string;
}

export interface IFormProps {
  error?: string;
  fields: IFormFieldProps[],  
  load?(ID: Number): void;
  save?(form: IFormState): void;
}

export interface IFormState {
  error?: string;
  fields: IFormFieldProps[];
}