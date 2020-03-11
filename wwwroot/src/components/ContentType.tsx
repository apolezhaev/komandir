import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Form from "./Form";
import FormField, { datepickerFor } from "./FormField";
import middleware from "../middleware/contentType";
import {
  IContentTypeProps,
  IContentTypeAttributeProps,
  AttributeDataType,
  PopupResult
} from "../interfaces";
import { FORM_LOAD, FORM_SAVE, CONTENT_TYPE_ATTRIBUTE_DELETE_PROMPT, CONTENT_TYPE_ATTRIBUTE_DELETE } from "../actions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import Popup from "./Popup";
import { textboxFor } from "./FormField";

class ContentType extends React.Component<IContentTypeProps> {
  componentDidMount() {
    const contentTypeID = Number(this.props.match.params.ID);
    this.props.read(contentTypeID);
  }
  render() {
    const invalid =
      this.props.fields.filter(
        (field: IContentTypeAttributeProps) => field.regex && (field.error || !field.value)
      ).length > 0;
    const { name, description, regex } = this.props.selection || {};
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

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Data Type</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.contentTypeAttributes.map((attribute: IContentTypeAttributeProps, i: Number) => (
                (
                  <TableRow key={`contentType${i}`}>
                    <TableCell>
                      <Link
                        href={`#${attribute.contentTypeAttributeID}`}
                      >
                        {attribute.name}
                      </Link>
                    </TableCell>
                    <TableCell>{attribute.dataTypeID && AttributeDataType[attribute.dataTypeID]}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => this.props.prompt(attribute)}>
                        del
                  </Button>
                    </TableCell>
                  </TableRow>
                )
              ))}
            </TableBody>
          </Table>

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

        <Popup
          title="Confirmation required"
          visible={this.props.selection != null}
          onClose={(result: PopupResult) =>
            this.props.selection &&
            this.props.deleteContentTypeAttribute(result, this.props.selection)
          }
        >
          You are about to delete {this.props.selection && this.props.selection.name}.
          <br />
          Continue?
        </Popup>

        <Popup
          title="Edit attribute..."
          visible={this.props.selection != null}
          onClose={(result: PopupResult) =>
            this.props.selection &&
            this.props.deleteContentTypeAttribute(result, this.props.selection)
          }
        >

          <Form>
            {textboxFor({ contentTypeAttributeID: 1, name: "name", dataTypeID: AttributeDataType.String })}
          </Form>

        </Popup>

      </>
    );
  }
}

const mapStateToProps = (state: any) => state.forms;
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
    }),
  prompt: (attribute: IContentTypeAttributeProps) => {
    dispatch({ type: CONTENT_TYPE_ATTRIBUTE_DELETE_PROMPT, payload: attribute });
  },
  deleteContentTypeAttribute: (result: PopupResult, attribute: IContentTypeAttributeProps) => {
    dispatch({
      type: CONTENT_TYPE_ATTRIBUTE_DELETE,
      payload: { result, attribute },
      middleware: middleware.deleteContentTypeAttribute
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentType);
