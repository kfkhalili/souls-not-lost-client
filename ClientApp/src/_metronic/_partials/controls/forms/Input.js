import React, {useMemo} from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import {useIntl} from "react-intl";
import * as _ from "loadsh";
import {Modal} from "react-bootstrap";

const getFieldCSSClasses = (touched, errors) => {
    const classes = ["form-control"];
    if (touched && errors) {
        classes.push("border-danger");
    }

    if (touched && !errors) {
        classes.push("border-success");
    }

    return classes.join(" ");
};

export function Input({
                          field, // { name, value, onChange, onBlur }
                          form: {touched, errors, values}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          label,
                          withFeedbackLabel = true,
                          customFeedbackLabel,
                          ...props
                      }) {
    const intl = useIntl();
    const I18Label = intl.formatMessage({id: label, defaultMessage: label})
    let show = true;
    if (_.isFunction(props.displayOn)) {
        show = props.displayOn(values)
    }
    if (!show)
        return <></>
    debugger
    return (
        <>
            {I18Label && <label  className="text-capitalize" >{I18Label}</label>}
            <input
                className={getFieldCSSClasses(touched[field.name], errors[field.name])}
                {...field}
                {...props}
                label={I18Label}
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
