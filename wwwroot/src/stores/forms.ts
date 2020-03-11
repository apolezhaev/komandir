import {
  IAction,
  IReducer,
  IContentTypeState,
  IFieldProps
} from "../interfaces";
import { FORM_CHANGED, FORM_LOAD, FORM_ERROR, CONTENT_TYPE_ATTRIBUTE_DELETE_PROMPT, CONTENT_TYPE_ATTRIBUTE_DELETE } from "../actions";

const INITIAL_STATE: IContentTypeState = {
  fields: [],
  contentTypeAttributes: []
};

const reducers: { [action: string]: IReducer } = {
  [FORM_LOAD]: (state: any, action: IAction) => {
    const { error } = state as IContentTypeState;
    return {
      error: error,
      fields: action.payload.fields,
      contentTypeAttributes: action.payload.contentTypeAttributes,
    };
  },

  [FORM_ERROR]: (state: any, action: IAction) => {
    const { contentTypeAttributes, fields } = state as IContentTypeState;
    return {
      error: action.payload?.message,
      fields: [...fields],
      contentTypeAttributes: [...contentTypeAttributes],
    };
  },

  [FORM_CHANGED]: (originalState: any, action: IAction) => {
    const { name, value } = action.payload;
    let { fields, error, contentTypeAttributes } = originalState as IContentTypeState;
    let state = {
      error: error,
      fields: [...fields],
      contentTypeAttributes: [...contentTypeAttributes],
    };
    fields.forEach(field => {
      if (field.name === name) {
        field.value = value;
        if (field.regex) {
          const valid = new RegExp(field.regex.value).test(value);
          field.error = !valid
            ? field.regex.description ||
            `'${value}' is not a correct value for ${field.description || name}`
            : undefined;
        }
      }
    });
    return state;
  },

  [CONTENT_TYPE_ATTRIBUTE_DELETE_PROMPT]: (state: any, action: IAction) => {
    let { fields, error, contentTypeAttributes } = state as IContentTypeState;
    return {
      error: error,
      fields: [...fields],
      contentTypeAttributes: [...contentTypeAttributes],
      selection: action.payload
    };
  },

  [CONTENT_TYPE_ATTRIBUTE_DELETE]: (state: any, action: IAction) => {
    let { fields, error, contentTypeAttributes } = state as IContentTypeState;
    return {
      error: error,
      fields: [...fields],
      contentTypeAttributes: [...contentTypeAttributes.filter(
        (attribute: IFieldProps) =>
          attribute.contentTypeAttributeID !== action.payload
      )],
    };
  }
}


export function createFormsStore(state: any = INITIAL_STATE, action: IAction) {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
}
