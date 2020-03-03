import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {  
  CONTENT_TYPE_LIST_LOAD,
  CONTENT_TYPE_DELETE_CONFIRM,
  CONTENT_TYPE_DELETE_CANCEL,
  CONTENT_TYPE_DELETE_ASK_CONFIRMATION,
  CONTENT_TYPE_ERROR
} from "../actions/contentTypes";
import { IContentType, IContentTypesState, IAppState } from "../interfaces";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Confirm from "./Confirm";

class ContentTypes extends React.Component<any, IContentTypesState> {
  componentDidMount() {
    this.props.load();
  }  
  render() {
    return (
      <>
        {this.props.error != null ? (
          <div className="error">Ошибка: {this.props.error}</div>
        ) : (
          ""
        )}
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
                            this.props.confirmOpen(contentType)
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
          visible={this.props.deleting}                
          onClose={(confirmed: boolean) => this.props.delete(confirmed, this.props.current)}
        >
          <div>You are about to delete this content type.<br/>Continue?</div>
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
          .then(response => response.json())
          .then(response => dispatch({ type: CONTENT_TYPE_DELETE_CONFIRM, payload: response.contentTypeID }))
          .catch(error => dispatch({ type: CONTENT_TYPE_ERROR, payload: error }));
    } else {
      dispatch({ type: CONTENT_TYPE_DELETE_CANCEL })
    }
  },
  load: () => {
    fetch("http://localhost:5000/api/ContentTypes")
      .then(response => response.json())
      .then(response => dispatch({ type: CONTENT_TYPE_LIST_LOAD, payload: response }))
      .catch(error => dispatch({ type: CONTENT_TYPE_ERROR, payload: error }));
  },
  confirmOpen: (contentType: IContentType) => {
    dispatch({ type: CONTENT_TYPE_DELETE_ASK_CONFIRMATION, payload: contentType })
  }  
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentTypes);
