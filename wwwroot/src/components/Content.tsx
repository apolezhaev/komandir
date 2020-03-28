import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import middleware from "../middleware/contentMiddleware";
import { IContentProps, Section, IContentType } from "../interfaces";
import TopMenu from "./TopMenu";
import {
  CONTENT_READ,
  CONTENT_CREATE,
  CONTENT_ADD,
  CONTENT_CHANGE
} from "../actions";
import { Button } from "@material-ui/core";
import { TextboxFor } from "./HtmlHelpers";

class Content extends React.Component<IContentProps> {
  componentDidMount() {
    this.props.readList();
  }
  render() {
    const {
      menuItems,
      add,
      create,
      update,
      onChange,
      content,
      error
    } = this.props;
    const { contentTypeID, contentID } = this.props.match.params;
    return (
      <>
        <TopMenu section={Section.Content} />
        {error && <div className="error">Ошибка: {error}</div>}
        <div className="layout">
          <div className="left-menu">
            {menuItems &&
              menuItems.map((contentType: IContentType, i: Number) => {
                const selected = contentType.id === Number(contentTypeID);
                return (
                  <div
                    key={`contentType${i}`}
                    className={
                      selected ? "menu-item menu-item-selected" : "menu-item"
                    }
                  >
                    <a href={`/komandir/content/${contentType.id}`}>
                      {contentType.name}
                    </a>
                  </div>
                );
              })}
          </div>
          {!contentTypeID && <div>Not selected</div>}
          {contentTypeID && !content && (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => add(Number(contentTypeID))}
              >
                Create
              </Button>
            </div>
          )}
          {contentTypeID && content && (
            <div>
              <div>
                <TextboxFor
                  name="name"
                  description="Name"
                  onChange={onChange}
                  value={content && content.name}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  Number(contentID) > 0
                    ? update()
                    : create(Number(contentTypeID), content)
                }
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (store: any) => store.content;
const mapDispatchToProps = (dispatch: Dispatch) => ({
  add: (contentTypeID: number) =>
    dispatch({
      type: CONTENT_ADD
    }),
  create: (contentTypeID: number, content: any) =>
    dispatch({
      type: CONTENT_CREATE,
      payload: { contentTypeID, content },
      middleware: middleware.create
    }),
  onChange: (name: string, value: any) => {
    dispatch({ type: CONTENT_CHANGE, payload: { name, value } });
  },
  readList: () =>
    dispatch({
      type: CONTENT_READ,
      middleware: middleware.readList
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
