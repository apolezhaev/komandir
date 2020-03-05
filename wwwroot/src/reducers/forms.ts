import React from "react";
import {
  IAction,
  IState,  
  IReducer,
  IFormState,  
} from "../interfaces";
import {
  FORM_CHANGED,  
  FORM_LOAD,
} from "../actions/contentTypes";

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
    if (field.name === name)
      field.value = value;
  }); 
  return state;
};

export default function(
  state: IFormState = INITIAL_STATE,
  action: IAction
) {
  const reducer = reducers[action.type];
  if (reducer)
    return reducer(state, action);

  return state; 
}
