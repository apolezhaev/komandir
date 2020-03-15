import {
  IAction,
  IReducer,
  IContentTypeState,
  IFieldProps,
  DataType
} from "../interfaces";
import {
  CONTENT_TYPE_CHANGE,
  CONTENT_TYPE_READ,
  CONTENT_TYPE_ERROR,
  CONTENT_TYPE_FIELD_DELETE_PROMPT,
  CONTENT_TYPE_FIELD_DELETE,
  CONTENT_TYPE_FIELD_EDIT,
  CONTENT_TYPE_FIELD_CHANGE,
  CONTENT_TYPE_FIELD_NEW,
  CONTENT_TYPE_FIELD_UPDATE
} from "../actions";

const INITIAL_STATE: IContentTypeState = {
  fields: []
};

const reducers: { [action: string]: IReducer } = {
  [CONTENT_TYPE_READ]: (state: any, action: IAction) => {
    const { error } = state as IContentTypeState;
    return {
      error,
      fields: action.payload.fields
    };
  },

  [CONTENT_TYPE_ERROR]: (state: any, action: IAction) => {
    const { fields } = state as IContentTypeState;
    return {
      error: action.payload?.message,
      fields: [...fields]
    };
  },

  [CONTENT_TYPE_FIELD_CHANGE]: (state: any, action: IAction) => {
    const { name, value } = action.payload;
    let { fields, error, current } = state as IContentTypeState;
    let newState = {
      error,
      fields: [...fields],
      current: { ...current, ...{ [name]: value } }
    };
    return newState;
  },

  [CONTENT_TYPE_CHANGE]: (originalState: any, action: IAction) => {
    const { name, value } = action.payload;
    let { fields, error } = originalState as IContentTypeState;
    let state = {
      error: error,
      fields: [...fields]
    };
    state.fields.forEach(field => {
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
  },

  [CONTENT_TYPE_FIELD_EDIT]: (state: any, action: IAction) => {
    let { fields, error } = state as IContentTypeState;
    return {
      error,
      fields: [...fields],
      current: { ...action.payload }
    };
  },

  [CONTENT_TYPE_FIELD_DELETE_PROMPT]: (state: any, action: IAction) => {
    let { fields, error } = state as IContentTypeState;
    return {
      error,
      fields: [...fields],
      current: { ...action.payload, deleting: true }
    };
  },

  [CONTENT_TYPE_FIELD_DELETE]: (state: any, action: IAction) => {
    let { fields, error } = state as IContentTypeState;
    return {
      error,
      fields: [
        ...fields.filter((field: IFieldProps) => field.id !== action.payload)
      ]
    };
  },

  [CONTENT_TYPE_FIELD_UPDATE]: (state: any, action: IAction) => {
    let { fields, error } = state as IContentTypeState;
    if (action.payload) {
      let { field } = action.payload;
      let exists =
        fields.filter((x: any) => field && x.id === field.id).length > 0;
      let modifiedFields = fields.map((x: any) => {
        return field && x.id === field.id ? { ...field } : { ...x };
      });
      return {
        error,
        fields: exists ? [...modifiedFields] : [...modifiedFields, field]
      };
    }
    return {
      error,
      fields
    };
  },

  [CONTENT_TYPE_FIELD_NEW]: (state: any, action: IAction) => {
    let { fields, error } = state as IContentTypeState;
    return {
      error,
      fields: [...fields],
      current: {
        dataTypeID: DataType.String,
        contentTypeID: action.payload
      }
    };
  }
};

export function createContentTypeStore(
  state: any = INITIAL_STATE,
  action: IAction
) {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
}
