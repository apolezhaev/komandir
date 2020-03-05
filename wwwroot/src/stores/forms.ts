import React from "react";
import {
  IAction,
  IState,  
  IReducer,
  IFormState    
} from "../interfaces";
import {
  FORM_CHANGED,  
  FORM_LOAD, 
  FORM_ERROR
} from "../actions";

const INITIAL_STATE: IFormState = {
  fields: [] 
};

const reducers: { [action: string]: IReducer } = {};

reducers[FORM_LOAD] = (state: IState, action: IAction) => {  
  return { 
    error: (state as IFormState).error,
    fields: action.payload 
  };
};

reducers[FORM_ERROR] = (state: IState, action: IAction) => {  
  return {  
    error: action.payload?.message,
    fields: [...(state as IFormState).fields]
  };
};

reducers[FORM_CHANGED] = (originalState: IState, action: IAction) => {   
  const target = (action.payload as React.ChangeEvent).target;
  const name  = target.getAttribute("data-name");
  const value  = (target as HTMLInputElement).value;
  let form = originalState as IFormState;
  let state = { 
    error: form.error,
    fields: [...form.fields] 
  };
  form.fields.forEach(field => {   
    if (field.name === name) {
      field.value = value;
      if (field.regex) {        
        const valid = new RegExp(field.regex.value).test(value);
        field.error = !valid 
          ? (field.regex.description || `'${value}' is not a correct value for ${field.description || name}`) 
          : undefined;
      }
    }      
  }); 
  return state;
};

export function createFormsStore(
  state: IState = INITIAL_STATE,
  action: IAction
): IState {
  const reducer = reducers[action.type]; 
  return reducer 
    ? reducer(state, action) 
    : state;  
}
