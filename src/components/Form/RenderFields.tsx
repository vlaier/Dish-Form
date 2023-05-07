import {
  FormHelperText,
  FormControl,
  TextField,
  InputLabel,
  Select,
  Slider,
  Typography,
  Box,
} from "@mui/material";
import { WrappedFieldProps } from "redux-form";
interface TextInputProps extends WrappedFieldProps {
  label: string;
  type: string;
}
interface SelectInputProps extends WrappedFieldProps {
  label: string;
  children: React.ReactNode;
}
const renderFromHelper = ({
  touched,
  error,
}: {
  touched: boolean;
  error: string;
}) => {
  return <FormHelperText>{(touched && error) || " "}</FormHelperText>;
};
const renderTextField: React.FC<TextInputProps> = ({
  input,
  label,
  type,
  meta: { touched, error, invalid },
  ...custom
}) => (
  <>
    <TextField
      sx={{ mt: 2 }}
      label={label}
      placeholder={label}
      type={type}
      error={touched && invalid}
      helperText={(touched && error) || " "}
      {...input}
      {...custom}
    />
  </>
);
const renderSelectField: React.FC<SelectInputProps> = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error} {...custom} sx={{ mt: 2 }}>
    <InputLabel id={input.name}>{label}</InputLabel>
    <Select
      native
      placeholder={label}
      {...input}
      {...custom}
      label={label}
      inputProps={{
        name: input.name,
        id: input.name,
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);
const renderSliderField: React.FC<TextInputProps> = ({
  input,
  label,
  type,
  meta: { touched, error, invalid },
  ...custom
}) => (
  <FormControl
    error={touched && (error || invalid)}
    {...custom}
    sx={{ mt: 2 }}
    fullWidth
  >
    <Typography gutterBottom>Spiciness scale (1-10): {input.value}</Typography>
    <Box sx={{ px: 2 }}>
      <Slider
        aria-label={label}
        step={1}
        marks
        valueLabelDisplay="auto"
        {...input}
        {...custom}
      />
    </Box>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

export { renderTextField, renderSelectField, renderSliderField };
