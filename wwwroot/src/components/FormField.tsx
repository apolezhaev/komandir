import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { IFieldProps, DataType } from "../interfaces";
import DateFnsUtils from '@date-io/date-fns';
import { FORM_CHANGED } from "../actions";

export function DatepickerFor(field: IFieldProps) {
	const { name, error, description, onChange, value } = field;
	return <MuiPickersUtilsProvider utils={DateFnsUtils}>
		<KeyboardDatePicker
			name={name}
			disableToolbar
			error={error !== undefined}
			variant="inline"
			format="MM/dd/yyyy"
			margin="normal"
			label={description || name}
			value={value || null}
			onChange={(value: any) => onChange && onChange(name, value)}
			KeyboardButtonProps={{
				'aria-label': 'pick date',
			}}
		/>
	</MuiPickersUtilsProvider>
}

export function HiddenFor(field: IFieldProps) {
	const { name, value } = field;
	return <input type="hidden" name={name} value={value} />
}

export function TextareaFor(field: IFieldProps) {
	const { name, error, description, onChange, value } = field;
	return <TextField
		name={name}
		margin="dense"
		error={error !== undefined}
		helperText={error}
		variant="filled"
		onChange={(e: React.ChangeEvent) => onChange && onChange(name, (e.target as HTMLInputElement).value)}
		multiline={true}
		rows="4"
		value={value || ""}
		label={description || name} />
}

export function TextboxFor(field: IFieldProps) {
	const { name, error, description, onChange, value } = field;
	return <TextField
		name={name}
		margin="dense"
		error={error !== undefined}
		helperText={error}
		variant="filled"
		onChange={(e: React.ChangeEvent) => onChange && onChange(name, (e.target as HTMLInputElement).value)}
		value={value || ""}
		label={description || name} />
}

class FormField extends React.Component<IFieldProps> {
	handlers: { [type: string]: any }
	constructor(props: IFieldProps) {
		super(props);
		this.handlers = {
			[DataType.String]: TextboxFor,
			[DataType.None]: HiddenFor,
			[DataType.Text]: TextareaFor,
			[DataType.DateTime]: DatepickerFor
		};
	}
	render() {
		const dataType = this.props.dataTypeID || DataType.String;
		return (this.handlers[dataType] || TextboxFor)(this.props);
	}
}

const mapStateToProps = (state: any) => { return { field: state.forms }; }
const mapDispatchToProps = (dispatch: Dispatch) => ({
	onChange: (name: string, value: any) => {
		dispatch({ type: FORM_CHANGED, payload: { name, value } })
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(FormField); 