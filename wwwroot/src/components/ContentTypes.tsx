import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { action, LOAD } from "../actions/contentTypes";
import { IContentType, IContentTypesState } from "../interfaces";

class ContentTypes extends React.Component<any, IContentTypesState> {
  componentDidMount() {
    this.props.load();
  }
  render() {
    return (
      <ul>
        {this.props.contentTypes && this.props.contentTypes.length
          ? this.props.contentTypes.map(
              (contentType: IContentType, i: Number) => {
                return <li key={`contentType${i}`}>{contentType.name}</li>;
              }
            )
          : "No content types yet."}
      </ul>
    );
  }
}

const mapStateToProps = (state: IContentTypesState) => state.contentTypes;

const mapDispatchToProps = (dispatch: Dispatch) => ({
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
