import React, {useMemo, useState} from "react";
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

const Thumb = ({file}) => {

    if (!file) {
        return null;
    }
    return (<img
        src={file}
        alt={file}
        className="img-thumbnail mt-2"
        height={200}
        width={200}
    />);
}

export function FileUpload({
                               field, // { name, value, onChange, onBlur }
                               form: {touched, errors, setFieldValue, values}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                               label,
                               withFeedbackLabel = true,
                               customFeedbackLabel,
                               type = "text",
                               ...props
                           }) {
    const [filePreview, setFilePreview] = useState(null);
    const intl = useIntl();
    const I18Label = intl.formatMessage({id: label, defaultMessage: label})
    return (
        <>
            {I18Label && <label>{I18Label}</label>}
            <input
                type={"file"}
                className={getFieldCSSClasses(touched[field.name], errors[field.name])}
                name={field.name}
                onChange={(event) => {
                    setFilePreview(event.target.value)
                    setFieldValue(field.name, event.currentTarget.files[0]);
                }
                }
            />
            {/*<Thumb file={filePreview}/>*/}
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
