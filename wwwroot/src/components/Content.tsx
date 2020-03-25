import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import middleware from "../middleware/contentMiddleware";
import { IContentProps, Mode } from "../interfaces";
import TopMenu from "./TopMenu";
import {
	CONTENT_READ
} from "../actions";

class Content extends React.Component<IContentProps> {
	render() {
		const styles = {
			layout: {
				display: "flex"
			}
		};
		return <>
			<TopMenu mode={Mode.Content} />
			<div style={styles.layout}>
				<div>Left menu</div>
				<div>Content</div>
			</div>
		</>
	}
}

const mapStateToProps = (store: any) => store.content;
const mapDispatchToProps = (dispatch: Dispatch) => ({
	read: (ID: number) =>
		dispatch({
			type: CONTENT_READ,
			payload: ID,
			middleware: middleware.read
		})
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);