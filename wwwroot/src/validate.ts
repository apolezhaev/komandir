export default function(values: any) {
	const errors: any = {};
	const requiredFields = [
	  'firstName',
	  'lastName',
	  'email',
	  'favoriteColor',
	  'notes',
	];
	requiredFields.forEach((field: string) => {
	  if (!values[field]) {
		errors[field] = 'Required';
	  }
	});
	if (
	  values.email &&
	  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
	) {
	  errors.email = 'Invalid email address';
	}
	return errors;
  }
  