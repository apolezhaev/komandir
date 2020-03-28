import { IAction, IMiddleware } from "../interfaces";
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
  load(action: IAction, next: any) {
    fetch("http://localhost:5000/api/ContentTypes")
      .then(response => response.json())
      .then(response => {
        const { contentTypeID } = action.payload;
        action.payload = { menuItems: response };
        if (!isNaN(contentTypeID)) {
          fetch(
            `http://localhost:5000/api/Content/ContentType/${contentTypeID}`
          )
            .then(response => {
              return response.json();
            })
            .then(response => {
              action.payload = { ...action.payload, items: response };
              next(action);
            })
            .catch(error => {
              next({ type: CONTENT_ERROR, payload: error });
            });
        } else {
          next(action);
        }
      })
      .catch(error => {
        next({ type: CONTENT_ERROR, payload: error });
      });
  }
}

export default new ContentMiddleware();
