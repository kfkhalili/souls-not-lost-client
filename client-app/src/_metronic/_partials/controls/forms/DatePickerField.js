import React from "react";
import {useField, useFormikContext} from "formik";
import DatePicker from "react-datepicker";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function DatePickerField({  field, // { name, value, onChange, onBlur }
                                  form: {touched, errors, values, setFieldValue}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  withFeedbackLabel = true,
                                  customFeedbackLabel,
                                  ...props }) {
  return (
    <>
      {props.label && <label className={"d-block"}>{props.label}</label>}
      <DatePicker
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        style={{ width: "100%" ,display:'block'}}
        {...field}
        {...props}
        selected={field.value }
        onChange={val => {

          setFieldValue(field.name, val);
        }}
      />
      {/*{errors[field.name] && touched[field.name] ? (*/}
      {/*  <div className="invalid-datepicker-feedback">*/}
      {/*    {errors[field.name].toString()}*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div className="feedback">*/}
      {/*    Please enter <b>{props.label}</b> in 'mm/dd/yyyy' format*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
}
