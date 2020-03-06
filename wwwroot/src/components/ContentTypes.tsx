import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  CONTENT_TYPE_LIST_LOAD,
  CONTENT_TYPE_LIST_DELETE_OK,
  CONTENT_TYPE_LIST_DELETE_CANCEL,
  CONTENT_TYPE_LIST_DELETE_PROMPT,
  CONTENT_TYPE_LIST_ERROR
} from "../actions";
import { IContentType, IAppState, IContentTypeListProps } from "../interfaces";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Confirm from "./Confirm";

class ContentTypes extends React.Component<IContentTypeListProps> {
  componentDidMount() {
    this.props.load();
  }
  render() {
    return (
      <>
        {this.props.error && <div className="error">Ошибка: {this.props.error}</div>}
        <Button
          variant="contained"
          color="primary"
          href="/komandir/contentTypes/0"
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
            {this.props.contentTypes &&
              this.props.contentTypes.map(
                (contentType: IContentType, i: Number) => {
                  return (
                    <TableRow key={`contentType${i}`}>
                      <TableCell>
                        <Link
                          href={`/komandir/contentTypes/${contentType.contentTypeID}`}
                        >
                          {contentType.name}
                        </Link>
                      </TableCell>
                      <TableCell>{contentType.description}</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() =>
                            this.props.prompt(contentType)
                          }
                        >
                          del
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
          </TableBody>
        </Table>
        <Confirm
          title="Confirmation required"
          visible={this.props.selection != null}
          onClose={(confirmed: boolean) => this.props.selection && this.props.delete(confirmed, this.props.selection)}
        >
          <div>You are about to delete this content type.<br />Continue?</div>
        </Confirm>
      </>
    );
  }
}

const mapStateToProps = (state: IAppState) => state.contentTypes;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  delete: (confirmed: boolean, contentType: IContentType) => {
    if (confirmed) {
      fetch(`http://localhost:5000/api/ContentTypes/${contentType.contentTypeID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          if (response.ok)
            return response.json();
          throw new Error("Error deleting content type.");
        })
        .then(response => dispatch({ type: CONTENT_TYPE_LIST_DELETE_OK, payload: response.contentTypeID }))
        .catch(error => dispatch({ type: CONTENT_TYPE_LIST_ERROR, payload: error.message }));
    } else {
      dispatch({ type: CONTENT_TYPE_LIST_DELETE_CANCEL })
    }
  },
  load: () => {
    dispatch({ type: CONTENT_TYPE_LIST_LOAD });
    /*
    fetch("http://localhost:5000/api/ContentTypes")
      .then(response => {
        if (response.ok)
          return response.json();
        throw new Error("Error loading content type list.");
      })
      .then(response => dispatch({ type: CONTENT_TYPE_LIST_LOAD, payload: response }))
      .catch(error => dispatch({ type: CONTENT_TYPE_LIST_ERROR, payload: error.message }));
      */
  },
  prompt: (contentType: IContentType) => {
    dispatch({ type: CONTENT_TYPE_LIST_DELETE_PROMPT, payload: contentType })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentTypes);
