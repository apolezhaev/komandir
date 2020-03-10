import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IContentTypeProps, IAppState } from "../interfaces";

class ContentTypeFields extends React.Component<IContentTypeProps> {
}

const mapStateToProps = (state: IAppState) => state.forms;
const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentTypeFields);