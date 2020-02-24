import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { action, LOAD, DELETE } from "../actions/contentTypes";
import { IContentType, IContentTypesState } from "../interfaces";

class ContentTypes extends React.Component<any, IContentTypesState> {
  componentDidMount() {
    this.props.load();
  }
  delete_click(contentTypeID: Number): void {
    this.props.delete(contentTypeID);
  }
  render() {
    return (
      <>
        <a href="/komandir/contentTypes/new">Create new</a>
        <ul>
          {this.props.contentTypes && this.props.contentTypes.length
            ? this.props.contentTypes.map(
                (contentType: IContentType, i: Number) => {
                  return (
                    <li key={`contentType${i}`}>
                      <a
                        href={`/komandir/contentTypes/${contentType.contentTypeID}`}
                      >
                        {contentType.name}
                      </a>
                      <button
                        onClick={() =>
                          this.delete_click(contentType.contentTypeID as Number)
                        }
                      >
                        delete
                      </button>
                    </li>
                  );
                }
              )
            : "No content types yet."}
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state: IContentTypesState) => state.contentTypes;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  delete: (ID: Number) => {
    fetch(`http://localhost:5000/api/ContentTypes/${ID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json())
      .then(
        data => {
          dispatch(action(DELETE, data.contentTypeID));
        },
        e => {
          console.error(e);
        }
      );
  },
  load: () => {
    fetch("http://localhost:5000/api/ContentTypes")
      .then(r => r.json())
      .then(
        data => {
          dispatch(action(LOAD, data));
        },
        e => {
          console.error(e);
        }
      );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentTypes);
