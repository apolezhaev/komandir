import React from "react";
import { connect } from "react-redux";

class Form extends React.Component {	
	render() {
		return (
			<>{this.props.children}</>
		);
	}
}

export default connect()(Form); 