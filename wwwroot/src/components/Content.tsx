import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import middleware from "../middleware/contentMiddleware";
import { IContentProps, Mode, IContentType } from "../interfaces";
import TopMenu from "./TopMenu";
import {
	CONTENT_READ
} from "../actions";
import { Button } from "@material-ui/core";

class Content extends React.Component<IContentProps> {
	contentTypeID: number;
	constructor(props: IContentProps) {
		super(props);
		this.contentTypeID = Number(props.match.params.ID);
	}
	componentDidMount() {
		this.props.readList();
	}
	render() {
		const styles = {
			layout: {
				display: "flex"
			}
		};
		const { contentTypes } = this.props;
		return <>
			<TopMenu mode={Mode.Content} />
			<div style={styles.layout}>
				<div className="left-menu">
					{contentTypes &&
						contentTypes.map((contentType: IContentType, i: Number) => {
							const selected = contentType.id === this.contentTypeID;
							return <div key={`contentType${i}`} className={selected ? "menu-item menu-item-selected" : "menu-item"}>
								<a href={`/komandir/content/${contentType.id}`}>{contentType.name}</a>
							</div>
						})}
				</div>
				<div>{(isNaN(this.contentTypeID) && "Not selected") || <Button
					variant="contained"
					color="primary"
					href="/komandir/contentTypes/0"
				>
					Create
        </Button>}</div>
			</div>
		</>
	}
}

const mapStateToProps = (store: any) => store.content;
const mapDispatchToProps = (dispatch: Dispatch) => ({
	readList: () =>
		dispatch({
			type: CONTENT_READ,
			middleware: middleware.readList
		})
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);