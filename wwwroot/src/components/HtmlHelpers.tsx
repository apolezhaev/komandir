import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { IFieldProps, DataType } from "../interfaces";
import DateFnsUtils from "@date-io/date-fns";
import { FormControlLabel, Switch } from "@material-ui/core";

export function DatepickerFor(field: IFieldProps) {
  const { name, error, description, onChange, value } = field;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        name={name}
        disableToolbar
        error={error !== undefined}
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        label={description || name}
        value={value || null}
        onChange={(value: any) => onChange && onChange(name, value)}
        KeyboardButtonProps={{
          "aria-label": "pick date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export function HiddenFor(field: IFieldProps) {
  const { name, value } = field;
  return <input type="hidden" name={name} value={value} />;
}

export function CheckboxFor(field: IFieldProps) {
  const { name, description, onChange, value } = field;
  return (
    <FormControlLabel
      control={
        <Switch
          checked={(value as boolean) === true}
          onChange={(e: React.ChangeEvent) =>
            onChange && onChange(name, (e.target as HTMLInputElement).checked)
          }
        />
      }
      label={description || name}
    />
  );
}

export function TextareaFor(field: IFieldProps) {
  const { name, error, description, onChange, value } = field;
  return (
    <TextField
      name={name}
      margin="dense"
      error={error !== undefined}
      helperText={error}
      variant="filled"
      onChange={(e: React.ChangeEvent) =>
        onChange && onChange(name, (e.target as HTMLInputElement).value)
      }
      multiline={true}
      rows="4"
      value={value || ""}
      label={description || name}
    />
  );
}

export function TextboxFor(field: IFieldProps) {
  const { name, error, description, onChange, value } = field;
  return (
    <TextField
      name={name}
      margin="dense"
      error={error !== undefined}
      helperText={error}
      variant="filled"
      onChange={(e: React.ChangeEvent) =>
        onChange && onChange(name, (e.target as HTMLInputElement).value)
      }
      value={value || ""}
      label={description || name}
    />
  );
}

export function EditorFor(props: IFieldProps) {
  const handlers: { [type: string]: any } = {
    [DataType.String]: TextboxFor,
    [DataType.None]: HiddenFor,
    [DataType.Text]: TextareaFor,
    [DataType.DateTime]: DatepickerFor,
    [DataType.Boolean]: CheckboxFor
  };
  const dataType = props.dataTypeID || DataType.String;
  return (handlers[dataType] || TextboxFor)(props);
}
