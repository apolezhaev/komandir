import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { IContentTypeAttributeProps, AttributeDataType, IAppState, IContentTypeState } from "../interfaces";
import DateFnsUtils from '@date-io/date-fns';
import { FORM_CHANGED } from "../actions";

class FormField extends React.Component<IContentTypeAttributeProps, IContentTypeState> {
	handlers: { [type: string]: any }
	constructor(props: IContentTypeAttributeProps) {
		super(props);
		this.handlers = {
			[AttributeDataType.String]: this.textboxFor,
			[AttributeDataType.None]: this.hiddenFor,
			[AttributeDataType.Text]: this.textareaFor,
			[AttributeDataType.DateTime]: this.datepickerFor
		};
	}

	datepickerFor(props: IContentTypeAttributeProps): any {
		const { name, error, description, onChange, value } = props;
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

	hiddenFor(props: IContentTypeAttributeProps): any {
		const { name, value } = props;
		return <input type="hidden" data-name={name} value={value} />
	}

	textareaFor(props: IContentTypeAttributeProps): any {
		const { name, error, description, onChange, value } = props;
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
	textboxFor(props: IContentTypeAttributeProps): any {
		const { name, error, description, onChange, value } = props;
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
	render() {
		const dataType = this.props.dataTypeID || AttributeDataType.String;
		return (this.handlers[dataType] || this.textboxFor)(this.props);
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	onChange: (name: string, value: any) => {
		dispatch({ type: FORM_CHANGED, payload: { name, value } })
	},
});

const mapStateToProps = (state: IAppState) => {
	return { field: state.forms }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField);