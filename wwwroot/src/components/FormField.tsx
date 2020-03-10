import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { IContentTypeAttributeProps, AttributeDataType, IAppState, IContentTypeState } from "../interfaces";
import { FORM_CHANGED } from "../actions";

class FormField extends React.Component<IContentTypeAttributeProps, IContentTypeState> {
	handlers: { [type: string]: any }
	constructor(props: IContentTypeAttributeProps) {
		super(props);
		this.handlers = {};
		this.handlers[AttributeDataType.String] = this.textboxFor;
		this.handlers[AttributeDataType.None] = this.hiddenFor;
		this.handlers[AttributeDataType.Text] = this.textareaFor;
	}
	hiddenFor(props: IContentTypeAttributeProps): any {
		const { name, value } = props;
		return <input type="hidden" data-name={name} value={value} />
	}
	textareaFor(props: IContentTypeAttributeProps): any {
		const { name, error, description, onChange, value } = props;
		return <TextField
			margin="dense"
			error={error !== undefined}
			helperText={error}
			variant="filled"
			inputProps={{ "data-name": name }}
			onChange={e => onChange && onChange(e)}
			multiline={true}
			rows="4"
			value={value || ""}
			label={description} />
	}
	textboxFor(props: IContentTypeAttributeProps): any {
		const { name, error, description, onChange, value } = props;
		return <TextField
			margin="dense"
			error={error !== undefined}
			helperText={error}
			variant="filled"
			inputProps={{ "data-name": name }}
			onChange={e => onChange && onChange(e)}
			value={value || ""}
			label={description} />
	}
	render() {
		const dataType = this.props.dataTypeID || AttributeDataType.String;
		return (this.handlers[dataType] || this.textboxFor)(this.props);
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	onChange: (e: React.ChangeEvent) => {
		dispatch({ type: FORM_CHANGED, payload: e })
	},
});

const mapStateToProps = (state: IAppState) => {
	return { field: state.forms }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField);