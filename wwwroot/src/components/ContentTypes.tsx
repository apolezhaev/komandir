import React from 'react';
import { connect } from 'react-redux';
import { ContentTypesState } from '../reducers/contentTypes'
import { ContentTypeDataItem } from '../actions/contentTypes'

class ContentTypes extends React.Component<any, ContentTypesState> {	

	render() {
		return (
			<ul className="todo-list">
				{this.props.contentTypes && this.props.contentTypes.length
				? this.props.contentTypes.map((contentType: ContentTypeDataItem, i: Number) => {
					return <li key={`contentType${i}`}>{contentType.name}</li>;
				})
				: "No content types yet."}
			</ul>
		);
	}
}

const mapStateToProps = (state: ContentTypesState) => state.contentTypes;

export default connect(
	mapStateToProps
)(ContentTypes);