import { FormErrors, FormStateMap, SubmissionError } from "redux-form";
interface IValues {
  [key: string]: string;
}
const onlyNums = (value: string) => value.replace(/[^\d]/g, "");
const onlyNumsOrDot = (value: string) => value.replace(/[^\d.]/g, "");
const isBiggerThan = (max: number) => (value: string) => {
  if (value.length === 2 && value[0] === "0") {
    return value;
  }
  const number = parseInt(value, 10);
  return number <= max ? `${number}` : `${max}`;
};
const isBiggerThan59 = isBiggerThan(59);
const isBiggerThan23 = isBiggerThan(23);

const normalizeTime = (value: string, previousValue: string) => {
  if (!value) {
    return value;
  }
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums(value).length === 2) {
      return isBiggerThan23(onlyNums(value)) + ":";
    }
    if (onlyNums(value).length === 4) {
      return (
        isBiggerThan23(onlyNums(value).slice(0, 2)) +
        ":" +
        isBiggerThan59(onlyNums(value).slice(2, 4)) +
        ":"
      );
    }
  }
  if (onlyNums(value).length <= 2) {
    return isBiggerThan23(onlyNums(value));
  }
  if (onlyNums(value).length <= 4) {
    return (
      isBiggerThan23(onlyNums(value).slice(0, 2)) +
      ":" +
      onlyNums(value).slice(2)
    );
  }
  return (
    isBiggerThan23(onlyNums(value).slice(0, 2)) +
    ":" +
    isBiggerThan59(onlyNums(value).slice(2, 4)) +
    ":" +
    isBiggerThan59(onlyNums(value).slice(4, 6))
  );
};
const normalizeInt = (value: string) => {
  if (!value) {
    return value;
  }
  const number = parseInt(onlyNums(value), 10);
  return number <= 0 ? "0" : `${number}`;
};
const normalizeFloat = (value: string) => {
  if (!value) {
    return value;
  }
  const number = parseFloat(onlyNumsOrDot(value));
  return number <= 0 ? "0" : `${number}`;
};
const getVisibleFields = (type: string) => {
  switch (type) {
    case "pizza":
      return ["name", "preparation_time", "type", "no_of_slices", "diameter"];
    case "soup":
      return ["name", "preparation_time", "type", "spiciness_scale"];
    case "sandwich":
      return ["name", "preparation_time", "type", "slices_of_bread"];
    default:
      return ["name", "preparation_time", "type"];
  }
};
const validate = (values: IValues) => {
  const errors: FormErrors<FormStateMap> = {};
  const requiredFields = getVisibleFields(values.type);
  const isValidTime = (time: string) =>
    /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(time);
  const isValidType = (type: string) =>
    ["pizza", "soup", "sandwich"].includes(type);
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  errors.type =
    values.type && (isValidType(values.type) ? undefined : "Not a valid type");
  errors.preparation_time =
    values.preparation_time &&
    (isValidTime(values.preparation_time) &&
    values.preparation_time.length === 8
      ? undefined
      : "Not a valid time format");

  return errors;
};

const submit = async (values: IValues) => {
  const submitFields = getVisibleFields(values.type);
  const submitValues = submitFields.reduce((acc: IValues, field) => {
    acc[field] = values[field];
    return acc;
  }, {});
  const url = "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/ ";
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submitValues),
  });

  if (!response.ok) {
    const data = await response.json();
    const errors: FormErrors<FormStateMap> = {};
    submitFields.map((field) => {
      if (data[field]) {
        errors[field] = data[field];
      }
    });
    throw new SubmissionError({
      ...errors,
      _error: "Submit Error",
    });
  } else {
    return response.json();
  }
};

export { normalizeInt, normalizeFloat, normalizeTime, submit, validate };
