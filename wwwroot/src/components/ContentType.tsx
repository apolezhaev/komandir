import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Form from "./Form";
import FormField from "./FormField";
import {
  CONTENT_TYPE_SAVE,    
  CONTENT_TYPE_ERROR,
  FORM_LOAD,
} from "../actions/contentTypes";
import { IAppState, FormFieldType, IFormState, IFormFieldProps } from "../interfaces";

class ContentType extends React.Component<any> {
  componentDidMount() {  
    this.props.load(this.props.match.params.ID);    
  }   
  render() {      
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
          <Button variant="contained" color="primary" onClick={() => this.props.save(this.props)}>Save</Button> 
          <Button href="/komandir/contentTypes">Cancel</Button>          
        </Form>     
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: (ID: Number) => {  
    let fields: IFormFieldProps[] = [
      { name: 'contentTypeID', type: FormFieldType.Hidden, required: true },
      { name: 'name', type: FormFieldType.Text, required: true, description: 'Content type name' },
      { name: 'description', type: FormFieldType.Textarea, description: 'Description' }
    ];
    if (ID && ID > 0) {
      fetch(`http://localhost:5000/api/ContentTypes/${ID}`, {
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(response => {
          fields.forEach(field => {
            field.value = response[field.name];
          })         
          dispatch({ type: FORM_LOAD, payload: fields })
        })
        .catch(error => dispatch({ type: CONTENT_TYPE_ERROR, payload: error }));
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
      .then(response => response.json())
      .then(
        response => {
          dispatch({ type: CONTENT_TYPE_SAVE, payload: response });
          if (response.contentTypeID)
            window.location.assign("/komandir/contentTypes");
        })
      .catch(error => dispatch({ type: CONTENT_TYPE_ERROR, payload: error}));
  }
});

const mapStateToProps = (state: IAppState) => state.forms;

export default connect(mapStateToProps, mapDispatchToProps)(ContentType);
