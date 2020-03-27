import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  CONTENT_TYPE_READ_LIST,
  CONTENT_TYPE_DELETE_OK,
  CONTENT_TYPE_DELETE_CANCEL,
  CONTENT_TYPE_DELETE_PROMPT
} from "../actions";
import { IContentType, IContentTypeListProps, Section } from "../interfaces";
import Table from "@material-ui/core/Table";
import TopMenu from "./TopMenu";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Confirm from "./Confirm";
import middleware from "../middleware/contentTypeMiddleware";

class ContentTypes extends React.Component<IContentTypeListProps> {
  componentDidMount() {
    this.props.readList();
  }
  render() {
    const { current, error, prompt, contentTypes } = this.props;
    return (
      <>
        <TopMenu section={Section.ContentTypes} />
        {error && <div className="error">Ошибка: {error}</div>}
        <Button
          variant="contained"
          color="primary"
          href="/komandir/contentTypes/0"
        >
          Create
        </Button>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contentTypes &&
              contentTypes.map((contentType: IContentType, i: Number) => {
                return (
                  <TableRow key={`contentType${i}`}>
                    <TableCell>
                      <Link href={`/komandir/contentTypes/${contentType.id}`}>
                        {contentType.name}
                      </Link>
                    </TableCell>
                    <TableCell>{contentType.description}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => prompt(contentType)}>del</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Confirm
          title="Confirmation required"
          visible={current != null}
          onClose={(confirmed: boolean) =>
            current && this.props.delete(confirmed, current)
          }
        >
          You are about to delete <strong>{current && current.name}</strong>.
          Continue?
        </Confirm>
      </>
    );
  }
}

const mapStateToProps = (store: any) => store.contentTypeList;
const mapDispatchToProps = (dispatch: Dispatch) => ({
  delete: (confirmed: boolean, contentType: IContentType) => {
    if (confirmed) {
      dispatch({
        type: CONTENT_TYPE_DELETE_OK,
        payload: contentType,
        middleware: middleware.delete
      });
    } else dispatch({ type: CONTENT_TYPE_DELETE_CANCEL });
  },
  readList: () =>
    dispatch({
      type: CONTENT_TYPE_READ_LIST,
      middleware: middleware.readList
    }),
  prompt: (contentType: IContentType) => {
    dispatch({ type: CONTENT_TYPE_DELETE_PROMPT, payload: contentType });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentTypes);
