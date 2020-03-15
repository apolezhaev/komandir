import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Form from "./Form";
import {
  EditorFor,
  TextboxFor,
  TextareaFor,
  CheckboxFor,
  LookupFor
} from "./HtmlHelpers";
import middleware from "../middleware/contentTypeMiddleware";
import {
  IContentTypeProps,
  IFieldProps,
  DataType,
  PopupResult
} from "../interfaces";
import {
  CONTENT_TYPE_READ,
  CONTENT_TYPE_UPDATE,
  CONTENT_TYPE_FIELD_DELETE_PROMPT,
  CONTENT_TYPE_FIELD_DELETE,
  CONTENT_TYPE_CHANGE,
  CONTENT_TYPE_FIELD_EDIT,
  CONTENT_TYPE_FIELD_CHANGE,
  CONTENT_TYPE_FIELD_NEW,
  CONTENT_TYPE_FIELD_UPDATE
} from "../actions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import { Popup } from "./Popup";

class ContentType extends React.Component<IContentTypeProps> {
  contentTypeID: number;
  constructor(props: IContentTypeProps) {
    super(props);
    this.contentTypeID = Number(props.match.params.ID);
  }
  componentDidMount() {
    this.props.read(this.contentTypeID);
  }
  render() {
    const {
      current,
      fields,
      error,
      onChange,
      prompt,
      update,
      editField,
      deleteField,
      newField,
      updateField,
      onFieldChange
    } = this.props;
    const invalid =
      fields.filter(
        (field: IFieldProps) =>
          field.id === undefined && field.regex && (field.error || !field.value)
      ).length > 0;
    return (
      <>
        {error && <div className="error">Ошибка: {error}</div>}
        <Form>
          {fields
            .filter(field => field.id === undefined)
            .map((field: IFieldProps, i: Number) => (
              <div key={`field${i}`}>
                <EditorFor {...field} onChange={onChange} />
              </div>
            ))}
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

        {this.contentTypeID > 0 && (
          <div>
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={() => newField(this.contentTypeID)}
            >
              New Field
            </Button>
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
                  .filter(field => field.id != null)
                  .map((field: IFieldProps, i: Number) => (
                    <TableRow key={`contentType${i}`}>
                      <TableCell>
                        <Link onClick={() => editField(field)}>
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
          </div>
        )}

        <Popup
          title="Confirmation required"
          visible={current != null && current.deleting === true}
          onClose={(result: PopupResult) =>
            current && deleteField(result, current)
          }
        >
          You are about to delete <strong>{current && current.name}</strong> and
          content related to this field.
          <br />
          Continue?
        </Popup>

        <Popup
          title="Edit Field"
          visible={current != null && current.deleting !== true}
          onClose={(result: PopupResult) =>
            current && updateField(result, current)
          }
        >
          <Form>
            <div>
              <TextboxFor
                name="name"
                description="Name"
                onChange={onFieldChange}
                value={current && current.name}
              />
            </div>
            <div>
              <TextboxFor
                name="displayName"
                description="Display Name"
                onChange={onFieldChange}
                value={current && current.displayName}
              />
            </div>
            <div>
              <TextboxFor
                name="regex"
                description="Validation Expression"
                onChange={onFieldChange}
                value={current && current.regex != null ? current.regex : ""}
              />
            </div>
            <div>
              <LookupFor
                name="dataTypeID"
                description="Data Type"
                onChange={onFieldChange}
                value={(current && current.dataTypeID) || DataType.String}
              />
            </div>
            <div>
              <TextareaFor
                name="description"
                description="Description"
                onChange={onFieldChange}
                value={current && current.description}
              />
            </div>
            <div>
              <CheckboxFor
                name="required"
                description="Required"
                onChange={onFieldChange}
                value={current && current.required === true}
              />
            </div>
          </Form>
        </Popup>
      </>
    );
  }
}

const mapStateToProps = (store: any) => store.contentType;
const mapDispatchToProps = (dispatch: Dispatch) => ({
  read: (ID: Number) =>
    dispatch({
      type: CONTENT_TYPE_READ,
      payload: ID,
      middleware: middleware.read
    }),
  update: (fields: IFieldProps[]) =>
    dispatch({
      type: CONTENT_TYPE_UPDATE,
      payload: fields,
      middleware: middleware.update
    }),
  prompt: (field: IFieldProps) => {
    dispatch({
      type: CONTENT_TYPE_FIELD_DELETE_PROMPT,
      payload: field
    });
  },
  editField: (field: IFieldProps) => {
    dispatch({
      type: CONTENT_TYPE_FIELD_EDIT,
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
  onFieldChange: (name: string, value: any) => {
    dispatch({ type: CONTENT_TYPE_FIELD_CHANGE, payload: { name, value } });
  },
  onChange: (name: string, value: any) => {
    dispatch({ type: CONTENT_TYPE_CHANGE, payload: { name, value } });
  },
  newField: (contentTypeID: number) => {
    dispatch({ type: CONTENT_TYPE_FIELD_NEW, payload: contentTypeID });
  },
  updateField: (result: PopupResult, field: IFieldProps) => {
    dispatch({
      type: CONTENT_TYPE_FIELD_UPDATE,
      payload: { result, field },
      middleware: middleware.updateField
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentType);
