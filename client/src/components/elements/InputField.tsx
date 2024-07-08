import { TextField } from "@mui/material";
import { Field } from "react-final-form";

type InputFieldProps = {
  name: string;
  label: string;
  type?: string;
};

const InputField = ({ name, label, type = "text" }: InputFieldProps) => {
  return (
    <Field<string> name={name}>
      {({ input, meta }) => (
        <TextField
          autoComplete="off"
          type={type}
          error={!!(meta.touched && meta.error)}
          helperText={meta.touched && meta.error}
          label={label}
          {...input}
        />
      )}
    </Field>
  );
};

export default InputField;
