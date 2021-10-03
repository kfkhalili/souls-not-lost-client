import React from "react";
import DatePicker from "react-datepicker";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import {useIntl} from "react-intl";

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
                                    label,
                                  form: {touched, errors, values, setFieldValue}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  withFeedbackLabel = true,
                                  customFeedbackLabel,
                                  ...props }) {
    const intl = useIntl();
    const I18Label = intl.formatMessage({id: label, defaultMessage: label})
    return (
    <>
      {label && <label className={"d-block"}>{label}</label>}
      <DatePicker
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        style={{ width: "100%" ,display:'block'}}
        {...field}
        {...props}
        selected={field.value}
        onChange={val => {

          setFieldValue(field.name, val);
        }}
        dateFormat="dd.MM.yyyy"
      />
        {(withFeedbackLabel && errors[field.name] > " " && touched[field.name]) && (
            <FieldFeedbackLabel
                error={errors[field.name]}
                touched={touched[field.name]}
                label={I18Label}
                type={"text"}
                customFeedbackLabel={customFeedbackLabel}
            />
        )}
    </>
  );
}
