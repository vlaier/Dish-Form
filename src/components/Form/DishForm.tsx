import { Box, Button, Typography } from "@mui/material";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import {
  normalizeFloat,
  normalizeInt,
  normalizeTime,
} from "../../utils/formHelpers";
import {
  renderTextField,
  renderSelectField,
  renderSliderField,
} from "./RenderFields";
import { validate, submit } from "../../utils/formHelpers";
import { useEffect, useState } from "react";
import SuccessSnackbar from "../ui/SuccessSnackbar";

interface IDishData {
  name: string;
  preparation_time: string;
  type: "pizza" | "soup" | "sandwich";
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}
interface IFormData {
  name: string;
  label: string;
  type: string;
  component: React.FC<any>;
  placeholder: string;
  normalize?: (value: string, previousValue: string) => string;
  fullWidth?: boolean;
  display: boolean;
  children?: React.ReactNode[];
  min?: number | undefined;
  max?: number | undefined;
}
const Form = ({ data }: { data: IFormData[] }) => {
  return (
    <>
      {data.map((field) => {
        return field.display ? <Field key={field.name} {...field} /> : null;
      })}
    </>
  );
};

const DishForm = (props: Partial<InjectedFormProps & IDishData>) => {
  const { handleSubmit, type, initialize, submitting, submitSucceeded, reset } =
    props;
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    initialize && initialize({ spiciness_scale: 1 });
  }, []);
  useEffect(() => {
    if (submitSucceeded) {
      setSuccess(true);
      reset && reset();
    }
  }, [submitSucceeded]);
  const formData: IFormData[] = [
    {
      name: "name",
      label: "Dish name",
      type: "text",
      placeholder: "Dish name",
      fullWidth: true,
      component: renderTextField,
      display: true,
    },
    {
      name: "preparation_time",
      label: "Preparation time",
      type: "text",
      placeholder: "00:00:00",
      normalize: normalizeTime,
      fullWidth: true,
      component: renderTextField,
      display: true,
    },
    {
      placeholder: "Dish type",
      name: "type",
      label: "Dish type",
      component: renderSelectField,
      fullWidth: true,
      type: "select",
      children: [
        <option key="none" value="" />,
        <option key="pizza" value="pizza">
          Pizza
        </option>,
        <option key="soup" value="soup">
          Soup
        </option>,
        <option key="sandwich" value="sandwich">
          Sandwich
        </option>,
      ],
      display: true,
    },
    {
      name: "no_of_slices",
      label: "Number of slices",
      type: "number",
      component: renderTextField,
      placeholder: "Number of slices",
      normalize: normalizeInt,
      fullWidth: true,
      display: type === "pizza",
    },
    {
      name: "diameter",
      label: "Diameter",
      type: "number",
      component: renderTextField,
      placeholder: "Diameter",
      normalize: normalizeFloat,
      fullWidth: true,
      display: type === "pizza",
    },
    {
      name: "spiciness_scale",
      placeholder: "Spiciness scale",

      label: "Spiciness scale",
      type: "number",
      component: renderSliderField,
      min: 1,
      max: 10,
      display: type === "soup",
    },
    {
      name: "slices_of_bread",
      label: "Slices of bread",
      type: "number",
      component: renderTextField,
      placeholder: "Slices of bread",
      fullWidth: true,
      display: type === "sandwich",
    },
  ];

  return (
    <>
      <SuccessSnackbar open={success} setOpen={setSuccess} />
      <Box
        component="form"
        onSubmit={handleSubmit && handleSubmit(submit)}
        sx={{
          p: 4,
          width: { xs: "320px", md: "580px" },
          borderRadius: 4,
          height: "fit-content",
          marginTop: { xs: "5vh", md: "20vh" },
          bgcolor: "white",
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mx: "auto",
            mt: 2,
            mb: 3,
            width: "fit-content",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          Dish Form
        </Typography>
        <Form data={formData} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mx: "auto", display: "block", fontSize: "18px" }}
          disabled={submitting}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default reduxForm({
  form: "dishForm",
  validate,
  onSubmitSuccess: (props) => {
    props.reset && props.reset();
  },
})(DishForm);
