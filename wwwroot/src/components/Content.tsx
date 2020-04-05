import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import middleware from "../middleware/contentMiddleware";
import { IContentProps, Section, IContentType } from "../interfaces";
import TopMenu from "./TopMenu";
import {
  CONTENT_LOAD,
  CONTENT_CREATE,
  CONTENT_ADD,
  CONTENT_CHANGE,
  CONTENT_EDIT,
} from "../actions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button, Link } from "@material-ui/core";
import { EditorFor } from "./HtmlHelpers";

class Content extends React.Component<IContentProps> {
  componentDidMount() {
    const { contentTypeID } = this.props.match.params;
    this.props.load(Number(contentTypeID));
  }
  render() {
    const {
      menuItems,
      items,
      add,
      create,
      update,
      onChange,
      item,
      edit,
      error,
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
          {contentTypeID && !item && (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => add(Number(contentTypeID))}
              >
                Create
              </Button>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items &&
                    items.map((item: any, i: Number) => {
                      return (
                        <TableRow key={`contentType${i}`}>
                          <TableCell>
                            <Link onClick={() => edit(item.id)}>
                              {item.properties}
                            </Link>
                          </TableCell>
                          <TableCell>{item.url}</TableCell>
                          <TableCell align="right">
                            <Button onClick={() => prompt("")}>del</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          )}
          {contentTypeID && item && (
            <div>
              {item.properties.map((property: any, i: Number) => (
                <div>
                  <EditorFor {...property} onChange={onChange} />
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  Number(contentID) > 0
                    ? update()
                    : create(Number(contentTypeID), item)
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
      type: CONTENT_ADD,
    }),
  create: (contentTypeID: number, content: any) =>
    dispatch({
      type: CONTENT_CREATE,
      payload: { contentTypeID, content },
      middleware: middleware.create,
    }),
  onChange: (name: string, value: any) => {
    dispatch({ type: CONTENT_CHANGE, payload: { name, value } });
  },
  edit: (contentID: number) =>
    dispatch({
      type: CONTENT_EDIT,
      payload: { contentID },
      middleware: middleware.edit,
    }),
  load: (contentTypeID: number) =>
    dispatch({
      type: CONTENT_LOAD,
      payload: { contentTypeID },
      middleware: middleware.load,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
