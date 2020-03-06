import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { IFormFieldProps, FormFieldType, IAppState, IFormState } from "../interfaces";
import { FORM_CHANGED } from "../actions";

class FormField extends React.Component<IFormFieldProps, IFormState> {
	handlers: { [type: string]: any }
	constructor(props: IFormFieldProps) {
		super(props);
		this.handlers = {};
		this.handlers[FormFieldType.Text] = this.textboxFor;
		this.handlers[FormFieldType.Hidden] = this.hiddenFor;
		this.handlers[FormFieldType.Textarea] = this.textareaFor;
	}
	hiddenFor(props: IFormFieldProps): any {
		const { name, value } = props;
		return <input type="hidden" data-name={name} value={value} />
	}
	textareaFor(props: IFormFieldProps): any {
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
	textboxFor(props: IFormFieldProps): any {
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
		const type = this.props.type || FormFieldType.Text;
		return (this.handlers[type] || this.textboxFor)(this.props);
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