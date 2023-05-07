import { formValueSelector } from "redux-form";
import DishReduxForm from "./DishForm";
import { connect } from "react-redux";

const selector = formValueSelector("dishForm");
export const DishForm = connect((state: any) => {
  const type = selector(state, "type");
  return {
    type,
  };
})(DishReduxForm);
