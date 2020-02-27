import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  CONTENT_TYPE_SAVE, 
  CONTENT_TYPE_LOAD, 
  CONTENT_TYPE_ERROR,
  CONTENT_TYPE_EDIT } from "../actions/contentTypes";
import { IContentTypesState, IContentType, IAppState } from "../interfaces";

class ContentType extends React.Component<any, IContentTypesState> {
  componentDidMount() {  
    this.props.load(this.props.match.params.ID);    
  }
  render() {
    const { name, description } = this.props.current || {};
    return (
      <>
        {this.props.error != null
          ? <div className="error">Ошибка: {this.props.error}</div> 
          : ""}        
        <TextField id="outlined-basic" margin="dense" label="Content type name" variant="outlined" 
          value={name || ""} onChange={e => this.props.edit(e.target.value)} />       
        <br />
        <TextField id="outlined-basic" margin="dense" label="Description" variant="outlined" 
          value={description || ""} />       
        <br />
        <Button variant="contained" color="primary" onClick={() => this.props.save(this.props.current)}>Save</Button>
        <Button href="/komandir/contentTypes">Cancel</Button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: (ID: Number) => {    
    if (ID && ID > 0) {
      fetch(`http://localhost:5000/api/ContentTypes/${ID}`, {
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(response => dispatch({ type: CONTENT_TYPE_LOAD, payload: response }))
        .catch(error => dispatch({ type: CONTENT_TYPE_ERROR, payload: error }));
    }
  },
  save: (contentType: IContentType) => {
    const contentTypeID = contentType.contentTypeID as Number;   
    fetch(contentTypeID > 0 
      ? `http://localhost:5000/api/ContentTypes/${contentTypeID}` 
      : "http://localhost:5000/api/ContentTypes", {
      method: contentTypeID > 0 ? "PUT" : "POST",
      body: JSON.stringify(contentType),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(
        response => {
          dispatch({ type: CONTENT_TYPE_SAVE, payload: response });
          if (response.contentTypeID) {
            window.location.assign("/komandir/contentTypes");
          }
        })
      .catch(error => dispatch({ type: CONTENT_TYPE_ERROR, payload: error}));
  },
  edit: (payload: string) => dispatch({ type: CONTENT_TYPE_EDIT, payload })
});

const mapStateToProps = (state: IAppState) => state.contentTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ContentType);
