import { formValueSelector } from "redux-form";
import DishReduxForm, { IDishData } from "./DishForm";
import { connect } from "react-redux";

const selector = formValueSelector("dishForm");
export const DishForm = connect((state: IDishData) => {
  const type = selector(state, "type");
  return {
    type,
  };
})(DishReduxForm);
