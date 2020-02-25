import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { 
  action, 
  CONTENT_TYPE_LIST_LOAD, 
  CONTENT_TYPE_DELETE, 
  CONTENT_TYPE_ERROR } from "../actions/contentTypes";
import { IContentType, IContentTypesState } from "../interfaces";

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
        <a href="/komandir/contentTypes/0">Create new</a>
        <ul>
          {this.props.contentTypes &&
            this.props.contentTypes.map(
              (contentType: IContentType, i: Number) => {
                return (
                  <li key={`contentType${i}`}>
                    <a
                      href={`/komandir/contentTypes/${contentType.contentTypeID}`}
                    >
                      {contentType.name}
                    </a>
                    <button
                      onClick={() => this.props.delete(contentType.contentTypeID)}
                    >
                      delete
                    </button>
                  </li>
                );
              }
            )}
        </ul>
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
