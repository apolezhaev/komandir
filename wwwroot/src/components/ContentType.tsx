import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Form from "./Form";
import { EditorFor, TextboxFor, TextareaFor } from "./HtmlHelpers";
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
  FORM_CHANGED,
  CONTENT_TYPE_FIELD_EDIT_PROMPT
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
      editFieldPrompt,
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
            .filter(field => field.system === true)
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
                .filter(field => field.system !== true)
                .map((field: IFieldProps, i: Number) => (
                  <TableRow key={`contentType${i}`}>
                    <TableCell>
                      <Link onClick={() => editFieldPrompt(field)}>
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
          visible={current != null && current.deleting === true}
          onClose={(result: PopupResult) =>
            current && deleteField(result, current)
          }
        >
          You are about to delete <strong>{current && current.name}</strong> and content related to this field. Continue?
        </Popup>

        <Popup
          title="Edit Field"
          visible={current != null}
          onClose={(result: PopupResult) =>
            current && deleteField(result, current)
          }
        >
          <Form>
            <div><TextboxFor name="name" description="Name" value={current && current.name} /></div>
            <div><TextboxFor name="displayName" description="Display Name" value={current && current.displayName} /></div>
            <div><TextboxFor name="regex" description="Validation Expression" value={(current && current.regex != null) ? current.regex.value : ""} /></div>
            <div><TextboxFor name="dataTypeID" description="Data Type" value={((current && current.dataTypeID) || DataType.String).toString()} /></div>
            <div><TextareaFor name="description" description="Description" value={current && current.description} /></div>
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
  prompt: (field: IFieldProps) => {
    dispatch({
      type: CONTENT_TYPE_FIELD_DELETE_PROMPT,
      payload: field
    });
  },
  editFieldPrompt: (field: IFieldProps) => {
    dispatch({
      type: CONTENT_TYPE_FIELD_EDIT_PROMPT,
      payload: field
    });
  },
  deleteField: (result: PopupResult, field: IFieldProps) => {
    dispatch({
      type: CONTENT_TYPE_FIELD_DELETE,
      payload: { result, field },
      middleware: middleware.deleteField
    });
  },
  onChange: (name: string, value: any) => {
    dispatch({ type: FORM_CHANGED, payload: { name, value } });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentType);
