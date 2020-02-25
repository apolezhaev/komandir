import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { 
  action, 
  CONTENT_TYPE_SAVE, 
  CONTENT_TYPE_LOAD, 
  CONTENT_TYPE_ERROR,
  CONTENT_TYPE_EDIT } from "../actions/contentTypes";
import { IContentTypesState, IContentType } from "../interfaces";

class ContentType extends React.Component<any, IContentTypesState> {
  componentDidMount() {  
    this.props.load(this.props.match.params.ID);    
  }
  render() {
    const { contentTypeID, name } = this.props.current || { contentTypeID: 0, name: "" };
    return (
      <>
        {this.props.error != null
          ? <div className="error">Ошибка: {this.props.error}</div> 
          : ""}
        Editing content type #{contentTypeID}:
        <br />
        <input type="text" value={name || ""} onChange={e => this.props.edit(e.target.value)} />
        <br />
        <button onClick={() => this.props.save(this.props.current)}>Save</button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: (ID: Number) => {    
    if (ID && ID > 0) {
      fetch(`http://localhost:5000/api/ContentTypes/${ID}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(response => dispatch(action(CONTENT_TYPE_LOAD, response)))
        .catch(exc => dispatch(action(CONTENT_TYPE_ERROR, exc)));
    }
  },
  save: (contentType: IContentType) => {
    const contentTypeID = contentType.contentTypeID as Number;   
    fetch(contentTypeID > 0 
      ? `http://localhost:5000/api/ContentTypes/${contentTypeID}` 
      : "http://localhost:5000/api/ContentTypes", {
      method: contentTypeID > 0 ? "PUT" : "POST",
      body: JSON.stringify(contentType),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(
        response => {
          dispatch(action(CONTENT_TYPE_SAVE, response));
          if (response.contentTypeID) {
            window.location.assign("/komandir/contentTypes");
          }
        })
      .catch(exc => dispatch(action(CONTENT_TYPE_ERROR, exc)));
  },
  edit: (payload: string) => dispatch(action(CONTENT_TYPE_EDIT, payload))
});

const mapStateToProps = (state: IContentTypesState) => state.contentTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ContentType);
