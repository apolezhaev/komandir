import React from 'react';
import { Field, reduxForm } from "redux-form";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
//import SelectField from '@material-ui/core/Select';
import asyncValidate from '../asyncValidate';
import validate from '../validate';

const MaterialUiForm = (props: any) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>		
		<div>
		<label htmlFor="lastName">Last Name</label>
		<Field name="lastName" component="input" type="text" />
		</div>
		<div>
		<label htmlFor="email">Email</label>
		<Field name="email" component="input" type="email" />
		</div>
		<button type="submit">Submit</button>
	</form>
  );
};

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
  asyncValidate,
})(MaterialUiForm);
