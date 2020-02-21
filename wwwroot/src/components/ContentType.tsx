import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { action, ADD_CONTENT_TYPE, CHANGE_NAME } from "../actions/contentTypes";
import { IContentTypesState } from "../interfaces";

class ContentType extends React.Component<any, IContentTypesState> {
  name_change = (value: string) => {
    this.props.change(value);
  };

  save_click = () => {
    this.props.save();
  };

  render() {
    return (
      <>
        <input type="text" onChange={e => this.name_change(e.target.value)} />
        <br />
        <button onClick={this.save_click}>Save</button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  save: () => dispatch(action(ADD_CONTENT_TYPE)),
  change: (payload: string) => dispatch(action(CHANGE_NAME, payload))
});

const mapStateToProps = (state: IContentTypesState) => state.contentTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ContentType);
