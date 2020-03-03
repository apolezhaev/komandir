import React from "react";
import { connect } from "react-redux";

class Form extends React.Component {
	alert() {
		window.alert();
	}
	render() {
		return (
			<div>
				{React.Children.map(this.props.children, (element: any) => {
					return React.cloneElement(element, { onChange: this.alert });
				})}
			</div>
		);
	}
}

export default connect()(Form); 