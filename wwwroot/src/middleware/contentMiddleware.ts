import { IAction, IMiddleware } from "../interfaces";
import contentTypes from "../middleware/contentTypeMiddleware";
import { CONTENT_ERROR } from "../actions";

class ContentMiddleware implements IMiddleware {
  create(action: IAction, next: any) {
    const { content, contentTypeID } = action.payload;
    const body = {
      properties: JSON.stringify({ ...content }),
      contentTypeID,
      url: "/some-url"
    };
    fetch("http://localhost:5000/api/Content", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
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
