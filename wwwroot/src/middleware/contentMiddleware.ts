import { IAction, IMiddleware } from "../interfaces";
import contentTypes from "../middleware/contentTypeMiddleware";
import { CONTENT_ERROR } from "../actions";

class ContentMiddleware implements IMiddleware {
  create(action: IAction, next: any) {
    const { content, contentTypeID } = action.payload;
    fetch(
      content.id > 0
        ? `http://localhost:5000/api/Content/${content.id}`
        : "http://localhost:5000/api/Content",
      {
        method: content.id > 0 ? "PUT" : "POST",
        body: JSON.stringify(content),
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Error saving content.");
        }
        return response.json();
      })
      .then(response => {
        if (response.id) {
          window.location.assign(`/komandir/content/${contentTypeID}`);
        }
      })
      .catch(error => {
        next({ type: CONTENT_ERROR, payload: error });
      });
  }
  readList(action: IAction, next: any) {
    contentTypes.readList(action, next);
  }
}

export default new ContentMiddleware();
