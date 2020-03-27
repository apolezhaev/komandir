import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import middleware from "../middleware/contentMiddleware";
import { IContentProps, Section, IContentType } from "../interfaces";
import TopMenu from "./TopMenu";
import { CONTENT_READ, CONTENT_CREATE } from "../actions";
import { Button } from "@material-ui/core";

class Content extends React.Component<IContentProps> {
  componentDidMount() {
    this.props.readList();
  }
  render() {
    const { menuItems, create } = this.props;
    const { contentTypeID, contentID } = this.props.match.params;
    return (
      <>
        <TopMenu section={Section.Content} />
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
          {contentTypeID && !contentID && (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => create(Number(contentTypeID))}
              >
                Create
              </Button>
            </div>
          )}
          {contentTypeID && contentID && <div>Properties</div>}
        </div>
      </>
    );
  }
}

const mapStateToProps = (store: any) => store.content;
const mapDispatchToProps = (dispatch: Dispatch) => ({
  create: (contentTypeID: number) =>
    dispatch({
      type: CONTENT_CREATE,
      middleware: middleware.create
    }),
  readList: () =>
    dispatch({
      type: CONTENT_READ,
      middleware: middleware.readList
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
