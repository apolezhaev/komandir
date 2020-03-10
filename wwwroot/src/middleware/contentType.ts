import {
  AttributeDataType,
  IContentTypeAttributeProps,
  IAction,
  IMiddleware
} from "../interfaces";
import { FORM_ERROR, CONTENT_TYPE_LIST_ERROR } from "../actions";

class ContentTypeMiddleware implements IMiddleware {
  readList(action: IAction, next: any) {
    fetch("http://localhost:5000/api/ContentTypes")
      .then(response => {
        if (!response.ok) throw new Error("Error loading content type list.");
        return response.json();
      })
      .then(response => {
        action.payload = response;
        next(action);
      })
      .catch(error =>
        next({
          type: CONTENT_TYPE_LIST_ERROR,
          payload: error.message
        })
      );
  }

  update(action: IAction, next: any) {
    const body: any = {};
    const fields = action.payload;
    fields.forEach((field: IContentTypeAttributeProps) => {
      body[field.name] = field.value;
    });
    const contentTypeID = +body.contentTypeID;
    fetch(
      contentTypeID > 0
        ? `http://localhost:5000/api/ContentTypes/${contentTypeID}`
        : "http://localhost:5000/api/ContentTypes",
      {
        method: contentTypeID > 0 ? "PUT" : "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Error saving content type.");
        }
        return response.json();
      })
      .then(response => {
        if (response.contentTypeID)
          window.location.assign("/komandir/contentTypes");
      })
      .catch(error => {
        next({ type: FORM_ERROR, payload: error });
      });
  }

  delete(action: IAction, next: any) {
    const contentType = action.payload;
    fetch(
      `http://localhost:5000/api/ContentTypes/${contentType.contentTypeID}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Error deleting content type.");
        }
        return response.json();
      })
      .then(response => {
        action.payload = response.contentTypeID;
        next(action);
      })
      .catch(error =>
        next({
          type: CONTENT_TYPE_LIST_ERROR,
          payload: error.message
        })
      );
  }

  read(action: IAction, next: any) {
    const contentTypeID = action.payload;
    let fields: IContentTypeAttributeProps[] = [
      {
        contentTypeAttributeID: 0,
        name: "contentTypeID",
        dataTypeID: AttributeDataType.None
      },
      {
        contentTypeAttributeID: 1,
        name: "name",
        regex: {
          value: "^[a-zA-Z0-9]+$",
          description: "Alphanumeric chars only."
        },
        description: "Name"
      },
      {
        contentTypeAttributeID: 2,
        name: "description",
        dataTypeID: AttributeDataType.Text,
        description: "Description"
      }
    ];
    action.payload = { fields, contentTypeAttributes: [] };
    if (contentTypeID && contentTypeID > 0) {
      fetch(`http://localhost:5000/api/ContentTypes/${contentTypeID}`, {
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          if (response.ok) return response.json();
          throw new Error("Error loading content type.");
        })
        .then(response => {
          fields.forEach(field => {
            field.value = response[field.name];
          });
          action.payload.contentTypeAttributes = response.contentTypeAttributes;
          next(action);
        })
        .catch(error => next({ type: FORM_ERROR, payload: error }));
    } else {
      next(action);
    }
  }
}

export default new ContentTypeMiddleware();