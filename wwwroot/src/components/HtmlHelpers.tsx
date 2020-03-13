import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";
import { IFieldProps, DataType } from "../interfaces";
import DateFnsUtils from "@date-io/date-fns";
import {
  FormControlLabel,
  Switch,
  Select,
  SelectProps,
  InputLabel,
  Input,
  FormControl
} from "@material-ui/core";

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
          color="primary"
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
  const style = {
    minWidth: 120
  };
  return (
    <FormControl variant="filled" margin="dense" style={style}>
      <InputLabel id={name}>{description || name}</InputLabel>
      <Select
        name={name}
        labelId={name}
        value={value || 0}
        onChange={(e: any) => onChange && onChange(name, e.target.value)}
      >
        {Object.entries(DataType)
          .filter(([value, text]) => !isNaN(Number(value)))
          .map(([value, text]) => (
            <MenuItem value={value}>{text}</MenuItem>
          ))}
      </Select>
    </FormControl>
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
    [DataType.Boolean]: CheckboxFor,
    [DataType.Lookup]: LookupFor
  };
  const dataType = props.dataTypeID || DataType.String;
  return (handlers[dataType] || TextboxFor)(props);
}
