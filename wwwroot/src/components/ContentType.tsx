import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Form from "./Form";
import { EditorFor, TextboxFor } from "./HtmlHelpers";
import middleware from "../middleware/contentType";
import {
  IContentTypeProps,
  IFieldProps,
  DataType,
  PopupResult
} from "../interfaces";
import {
  FORM_LOAD,
  FORM_SAVE,
  CONTENT_TYPE_FIELD_DELETE_PROMPT,
  CONTENT_TYPE_FIELD_DELETE,
  FORM_CHANGED
} from "../actions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import Popup from "./Popup";

class ContentType extends React.Component<IContentTypeProps> {
  componentDidMount() {
    const contentTypeID = Number(this.props.match.params.ID);
    this.props.read(contentTypeID);
  }
  render() {
    const {
      current,
      fields,
      error,
      onChange,
      prompt,
      update,
      deleteField
    } = this.props;
    const invalid =
      fields.filter(
        (field: IFieldProps) => field.regex && (field.error || !field.value)
      ).length > 0;
    return (
      <>
        {error && <div className="error">Ошибка: {error}</div>}
        <Form>
          {fields
            .filter(field => field.system)
            .map((field: IFieldProps, i: Number) => (
              <div key={`field${i}`}>
                <EditorFor {...field} onChange={onChange} />
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
              {fields
                .filter(field => !field.system)
                .map((field: IFieldProps, i: Number) => (
                  <TableRow key={`contentType${i}`}>
                    <TableCell>
                      <Link href={`#${field.contentTypeAttributeID}`}>
                        {field.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {field.dataTypeID && DataType[field.dataTypeID]}
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => prompt(field)}>del</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <Button
            variant="contained"
            disabled={invalid}
            color="primary"
            onClick={() => update(fields)}
          >
            Save
          </Button>
          <Button href="/komandir/contentTypes">Cancel</Button>
        </Form>

        <Popup
          title="Confirmation required"
          visible={current != null}
          onClose={(result: PopupResult) =>
            current && deleteField(result, current)
          }
        >
          You are about to delete <strong>{current && current.name}</strong>{" "}
          field and appropriate content in existing objects. Continue?
        </Popup>

        <Popup
          title="Edit attribute..."
          visible={current != null && current.deleting === true}
          onClose={(result: PopupResult) =>
            current && deleteField(result, current)
          }
        >
          <Form>
            <TextboxFor name="name" system={false} />
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
  update: (fields: IFieldProps[]) =>
    dispatch({
      type: FORM_SAVE,
      payload: fields,
      middleware: middleware.update
    }),
  prompt: (attribute: IFieldProps) => {
    dispatch({
      type: CONTENT_TYPE_FIELD_DELETE_PROMPT,
      payload: attribute
    });
  },
  deleteField: (result: PopupResult, attribute: IFieldProps) => {
    dispatch({
      type: CONTENT_TYPE_FIELD_DELETE,
      payload: { result, attribute },
      middleware: middleware.deleteField
    });
  },
  onChange: (name: string, value: any) => {
    dispatch({ type: FORM_CHANGED, payload: { name, value } });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentType);
