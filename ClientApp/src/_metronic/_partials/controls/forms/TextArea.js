import React, {useMemo} from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import {useIntl} from "react-intl";
import * as _ from "loadsh";

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

export function TextArea({
                          field, // { name, value, onChange, onBlur }
                          form: {touched, errors, values, setFieldValue}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          label,
                          withFeedbackLabel = true,
                          customFeedbackLabel,
                          type = "text",
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
    return (
        <>
            {I18Label && <label>{I18Label}</label>}
            <textarea
                rows="3"
                type={type}
                className={getFieldCSSClasses(touched[field.name], errors[field.name])}
                {...field}
                {...props}
                label={I18Label}
                onChange={(e)=>{
                    setFieldValue(field.name, e.target.value)
                }}
            />
            {withFeedbackLabel && errors[field.name] > " " && touched[field.name] && (
                <FieldFeedbackLabel
                    error={errors[field.name]}
                    touched={touched[field.name]}
                    label={I18Label}
                    type={type}
                    customFeedbackLabel={customFeedbackLabel}
                />
            )}
        </>
    );
}
