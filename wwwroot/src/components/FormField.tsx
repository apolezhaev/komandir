import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { IFormFieldProps, FormFieldType, IAppState, IFormState } from "../interfaces";
import { FORM_CHANGED } from "../actions/contentTypes";

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
		const { name, required, description, onChange, value } = props;
		const valid = (required !== true) || (value || "").length > 0;
		return <TextField 
			margin="dense" 
			error={!valid}
			helperText={!valid ? `${description || name} is a required field.` : null}
			variant="outlined"
			inputProps={{ "data-name": name }}
			onChange={e => onChange && onChange(e)}
			multiline={true}
          	rows="4"
			value={value || ""}
			label={description} />  
	  }
	textboxFor(props: IFormFieldProps): any {    
		const { name, required, description, onChange, value } = props;
		const valid = (required !== true) || (value || "").length > 0;
		return <TextField 
			margin="dense" 
			error={!valid}
			helperText={!valid ? `${description || name} is a required field.` : null}
			variant="outlined"
			inputProps={{ "data-name": name }}
			onChange={e => onChange && onChange(e)}
			value={value || ""}
			label={description} />
	}
	render() {
		let handler = this.handlers[this.props.type] || this.textboxFor;
		return <>
			{ handler(this.props) }			
		</>;
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