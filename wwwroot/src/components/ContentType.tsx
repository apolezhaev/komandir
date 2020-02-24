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
    this.props.save(this.props.input);
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
  save: (name: string) => {
    fetch("http://localhost:5000/api/ContentTypes", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json())
      .then(
        data => {
          dispatch(action(ADD_CONTENT_TYPE, data));
          if (data.contentTypeID) {
            window.location.assign("/komandir/contentTypes");
          }
        },
        e => console.error(e)
      );
  },
  change: (payload: string) => dispatch(action(CHANGE_NAME, payload))
});

const mapStateToProps = (state: IContentTypesState) => state.contentTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ContentType);
