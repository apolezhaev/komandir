import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { action, ADD_CONTENT_TYPE, CHANGE_CURRENT_CONTENT_TYPE } from '../actions/contentTypes';
import { ContentTypesState } from '../reducers/contentTypes'

class ContentType extends React.Component<any, ContentTypesState> {	
	
	name_change = (sender: HTMLInputElement) => {
		this.props.changeCurrent(sender.value);
	};

	save_click = () => {
		this.props.save();
	};

	render() {
		return (
			<>
				<input type='text' 
					onChange={e => this.name_change(e.target)} />
				<br/>
				<button onClick={this.save_click}>Save</button>
			</>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => ({ 
	save: () => dispatch(action(ADD_CONTENT_TYPE)),
	changeCurrent: (payload: string) => dispatch(action(CHANGE_CURRENT_CONTENT_TYPE, payload)),
});

const mapStateToProps = (state: ContentTypesState) => state.contentTypes;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentType as any);