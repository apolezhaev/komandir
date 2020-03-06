import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Form from "./Form";
import FormField from "./FormField";
import { load, save } from "../middleware/contentType";
import {
  IFormFieldProps,
  IFormProps,
  IFormState,
  IAppState
} from "../interfaces";

class ContentType extends React.Component<IFormProps> {
  componentDidMount() {
    this.props.load(Number(this.props.match.params.ID));
  }
  render() {
    const invalid = this.props.fields.filter((field: IFormFieldProps) => field.regex && (field.error || !field.value)).length > 0;
    return (
      <>
        {this.props.error && <div className="error">Ошибка: {this.props.error}</div>}
        <Form>
          {this.props.fields.map((field: any, i: Number) =>
            <div key={`field${i}`}>
              <FormField {...field} />
            </div>)}
          <Button variant="contained" disabled={invalid} color="primary" onClick={() => this.props.save(this.props)}>Save</Button>
          <Button href="/komandir/contentTypes">Cancel</Button>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state: IAppState) => state.forms;
const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: (ID: Number) => load(ID, dispatch),
  save: (form: IFormState) => save(form, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentType);
