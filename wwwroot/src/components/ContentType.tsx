import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Form from "./Form";
import FormField from "./FormField";
import middleware from "../middleware/contentType";
import { IContentTypeProps, IAppState, IContentTypeAttributeProps } from "../interfaces";
import { FORM_LOAD, FORM_SAVE/*, CONTENT_TYPE_READ_ATTRIBUTES*/ } from "../actions";

class ContentType extends React.Component<IContentTypeProps> {
  componentDidMount() {
    const contentTypeID = Number(this.props.match.params.ID);
    this.props.read(contentTypeID);
    //this.props.readAttrubutes(contentTypeID);
  }
  render() {
    const invalid =
      this.props.fields.filter(
        (field: IContentTypeAttributeProps) => field.regex && (field.error || !field.value)
      ).length > 0;
    return (
      <>
        {this.props.error && (
          <div className="error">Ошибка: {this.props.error}</div>
        )}
        <Form>
          {this.props.fields.map((field: any, i: Number) => (
            <div key={`field${i}`}>
              <FormField {...field} />
            </div>
          ))}

          {this.props.contentTypeAttributes.map((attribute: IContentTypeAttributeProps, i: Number) => (
            <div key={`field${i}`}>
              <FormField {...attribute} />
            </div>
          ))}

          <Button
            variant="contained"
            disabled={invalid}
            color="primary"
            onClick={() => this.props.update(this.props)}
          >
            Save
          </Button>
          <Button href="/komandir/contentTypes">Cancel</Button>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state: IAppState) => state.forms;
const mapDispatchToProps = (dispatch: Dispatch) => ({
  read: (ID: Number) =>
    dispatch({
      type: FORM_LOAD,
      payload: ID,
      middleware: middleware.read
    }),
  update: (props: IContentTypeProps) =>
    dispatch({
      type: FORM_SAVE,
      payload: props.fields,
      middleware: middleware.update
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentType);
