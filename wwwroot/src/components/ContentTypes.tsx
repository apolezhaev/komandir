import React from "react";
import { connect } from "react-redux";
import { IContentType, IContentTypesState } from "../interfaces";

class ContentTypes extends React.Component<any, IContentTypesState> {
  render() {
    return (
      <ul className="todo-list">
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

export default connect(mapStateToProps)(ContentTypes);
