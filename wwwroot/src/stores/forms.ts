import React from "react";
import { IAction, IReducer, IFormState } from "../interfaces";
import { FORM_CHANGED, FORM_LOAD, FORM_ERROR } from "../actions";

const INITIAL_STATE: IFormState = {
  fields: []
};

const reducers: { [action: string]: IReducer } = {
  [FORM_LOAD]: (state: any, action: IAction) => {
    return {
      error: (state as IFormState).error,
      fields: action.payload
    };
  },

  [FORM_ERROR]: (state: any, action: IAction) => {
    return {
      error: action.payload?.message,
      fields: [...(state as IFormState).fields]
    };
  },

  [FORM_CHANGED]: (originalState: any, action: IAction) => {
    const target = (action.payload as React.ChangeEvent).target;
    const name = target.getAttribute("data-name");
    const value = (target as HTMLInputElement).value;
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
            ? field.regex.description ||
              `'${value}' is not a correct value for ${field.description ||
                name}`
            : undefined;
        }
      }
    });
    return state;
  }
};

export function createFormsStore(state: any = INITIAL_STATE, action: IAction) {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
}
