import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MenuItem from '@material-ui/core/MenuItem';
import { IFieldProps, DataType } from "../interfaces";
import DateFnsUtils from "@date-io/date-fns";
import { FormControlLabel, Switch, Select, SelectProps, InputLabel, Input, FormControl } from "@material-ui/core";

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

export function LookupFor(field: IFieldProps) {
  const { name, error, description, onChange, value } = field;
  return <FormControl>
    <InputLabel htmlFor="grouped-select">{description || name}</InputLabel>
    <Select margin="dense" variant="filled" input={<Input id="grouped-select" />}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={1}>Option 1</MenuItem>
      <MenuItem value={2}>Option 2</MenuItem>
      <MenuItem value={3}>Option 3</MenuItem>
      <MenuItem value={4}>Option 4</MenuItem>
    </Select>
  </FormControl>
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
    [DataType.Boolean]: CheckboxFor,
    [DataType.Lookup]: LookupFor
  };
  const dataType = props.dataTypeID || DataType.String;
  return (handlers[dataType] || TextboxFor)(props);
}
