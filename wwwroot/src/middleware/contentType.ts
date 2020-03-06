import { Dispatch } from "redux";
import {
	FormFieldType,
	IFormState,
	IFormFieldProps,
} from "../interfaces";
import {
	FORM_ERROR,
	FORM_LOAD,
} from "../actions";

export function save(form: IFormState, dispatch: Dispatch) {
	const body: any = {};
	form.fields.forEach(field => {
		body[field.name] = field.value;
	});
	const contentTypeID = +body.contentTypeID;
	fetch(contentTypeID > 0
		? `http://localhost:5000/api/ContentTypes/${contentTypeID}`
		: "http://localhost:5000/api/ContentTypes", {
		method: contentTypeID > 0 ? "PUT" : "POST",
		body: JSON.stringify(body),
		headers: { "Content-Type": "application/json" }
	})
		.then(response => {
			if (response.ok)
				return response.json();
			throw new Error("Error saving content type.");
		})
		.then(
			response => {
				if (response.contentTypeID)
					window.location.assign("/komandir/contentTypes");
			})
		.catch(error => {
			dispatch({ type: FORM_ERROR, payload: error });
		});
}

export function load(ID: Number, dispatch: Dispatch) {
	let fields: IFormFieldProps[] = [
		{
			name: "contentTypeID",
			type: FormFieldType.Hidden
		},
		{
			name: "name",
			regex: {
				value: "^[a-zA-Z0-9]+$",
				description: "Alphanumeric chars only."
			},
			description: "Name"
		},
		{
			name: "description",
			type: FormFieldType.Textarea,
			description: "Description"
		}
	];
	if (ID && ID > 0) {
		fetch(`http://localhost:5000/api/ContentTypes/${ID}`, {
			headers: { "Content-Type": "application/json" }
		})
			.then(response => {
				if (response.ok)
					return response.json();
				throw new Error("Error loading content type.");
			})
			.then(response => {
				fields.forEach(field => {
					field.value = response[field.name];
				})
				dispatch({ type: FORM_LOAD, payload: fields })
			})
			.catch(error => {
				dispatch({ type: FORM_ERROR, payload: error });
			});
	} else {
		dispatch({ type: FORM_LOAD, payload: fields });
	}
}