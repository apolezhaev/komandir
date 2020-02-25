import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { 
  action, 
  CONTENT_TYPE_LIST_LOAD, 
  CONTENT_TYPE_DELETE, 
  CONTENT_TYPE_ERROR } from "../actions/contentTypes";
import { IContentType, IContentTypesState } from "../interfaces";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

class ContentTypes extends React.Component<any, IContentTypesState> {
  componentDidMount() {
    this.props.load();
  }  
  render() {
    return (
      <>
        {this.props.error != null
          ? <div className="error">Ошибка: {this.props.error}</div> 
          : ""}        
        <Button variant="contained" color="primary" href="/komandir/contentTypes/0">Create</Button>        
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
                      <Link href={`/komandir/contentTypes/${contentType.contentTypeID}`}>
                        {contentType.name}
                      </Link>                     
                    </TableCell>
                    <TableCell>{contentType.description}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => this.props.delete(contentType.contentTypeID)}>del</Button>
                    </TableCell>                      
                  </TableRow>                    
                );
              }
            )}
          </TableBody>
        </Table>
       

      </>
    );
  }
}

const mapStateToProps = (state: IContentTypesState) => state.contentTypes;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  delete: (ID: Number) => {
    if (window.confirm("Delete this?")) {
      fetch(`http://localhost:5000/api/ContentTypes/${ID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(response => dispatch(action(CONTENT_TYPE_DELETE, response.contentTypeID)))
        .catch(exc => dispatch(action(CONTENT_TYPE_ERROR, exc)));
    }    
  },
  load: () => {
    fetch("http://localhost:5000/api/ContentTypes")
      .then(response => response.json())
      .then(response => dispatch(action(CONTENT_TYPE_LIST_LOAD, response)))
      .catch(exc => dispatch(action(CONTENT_TYPE_ERROR, exc)));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentTypes);
