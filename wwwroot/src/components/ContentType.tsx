import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Form from "./Form";
import FormField from "./FormField";
import {  
  FORM_ERROR,
  FORM_LOAD,
} from "../actions";
import { IAppState, FormFieldType, IFormState, IFormFieldProps, IFormProps } from "../interfaces";
import { isUndefined } from "util";

class ContentType extends React.Component<IFormProps> {
  componentDidMount() {  
    this.props.load(Number(this.props.match.params.ID));    
  } 
  render() {
    const invalidFields = this.props.fields.filter((field: IFormFieldProps) => !isUndefined(field.error))
    return (
      <>
        {this.props.error != null
          ? <div className="error">Ошибка: {this.props.error}</div> 
          : ""}      
        <Form>
          {this.props.fields.map((field: any, i: Number) => 
          <div key={`field${i}`}>
            <FormField {...field} />
            <br/>
          </div>)}
          <br/>
          <Button variant="contained" disabled={false || invalidFields.length > 0} color="primary" onClick={() => this.props.save(this.props)}>Save</Button> 
          <Button href="/komandir/contentTypes">Cancel</Button>          
        </Form>     
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: (ID: Number) => {  
    let fields: IFormFieldProps[] = [
      { 
        name: "contentTypeID", 
        type: FormFieldType.Hidden, 
        regex: { 
          value: "^[0-9]+$", 
          description: "Numbers only." 
        } 
      },
      { 
        name: "name", 
        type: FormFieldType.Text, 
        regex: { 
          value: "^[a-zA-Z0-9_]+$", 
          description: "Alphanumeric symbols and underscore only." 
        }, 
        description: "Content type name" 
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
  },  
  save: (form: IFormState) => {
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
});

const mapStateToProps = (state: IAppState) => state.forms;

export default connect(mapStateToProps, mapDispatchToProps)(ContentType);
