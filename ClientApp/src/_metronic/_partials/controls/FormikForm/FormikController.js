import React from 'react';
import PropTypes from 'prop-types';
import {
    isTextInput, isSelectInput,
    isUploadInput, isUploadFile,
    isCheckBoxSelect, isTypeheadSelect,
    isTypeheadSelectAllowNew,
    isSingleTypeheadSelectAllowNew,
    isCheckBox, isTextArea, isTimePicker
} from '../Form/InputTypes';
import {Field} from "formik";
import {Checkbox, Input, CheckboxList, Select, FileUpload, TypeheadSelect, TextArea, DatePickerField, TypeheadSelectAllowNew, SingleTypeheadSelectAllowNew} from "../index";
import {SingleTypeheadSelect} from "../forms/SingleTypeheadSelect";


const FormController = (props) => {
    const {
        tag,
        type,
        rules,
        placeholder,
        name,
        ...rest
    } = props;

    if (isCheckBox(tag, type))
        return (
            <Field
                name={name}
                component={Checkbox}
                placeholder={placeholder}
                {...rest}
            />
        )

    if (isTextInput(tag, type)) {
        return (
            <Field
                name={name}
                component={Input}
                placeholder={placeholder}
                {...rest}

            />
        );
    }
    if (isTextArea(tag, type)) {
        return (
            <Field
                name={name}
                component={TextArea}
                placeholder={placeholder}
                {...rest}
            />
        );
    }

    if (isSelectInput(tag)) {

        return (
            <Field
                name={name}
                withFeedbackLabel
                component={SingleTypeheadSelect}
                placeholder={placeholder}
                {...rest}

            />
        );
    }
    if (isTypeheadSelectAllowNew(tag)) {

        return (
            <Field
                name={name}
                withFeedbackLabel
                component={TypeheadSelectAllowNew}
                placeholder={placeholder}
                {...rest}

            />
        );
    }    
    
    if (isSingleTypeheadSelectAllowNew(tag)) {

        return (
            <Field
                name={name}
                withFeedbackLabel
                component={SingleTypeheadSelectAllowNew}
                placeholder={placeholder}
                {...rest}

            />
        );
    }
    
    if (isTypeheadSelect(tag)) {

        return (
            <Field
                name={name}
                withFeedbackLabel
                component={TypeheadSelect}
                placeholder={placeholder}
                {...rest}

            />
        );
    }
    if (isCheckBoxSelect(tag)) {

        return (
            <Field
                name={name}
                withFeedbackLabel
                component={CheckboxList}
                placeholder={placeholder}
                {...rest}

            />
        );
    }

    if (isUploadInput(tag)) {
        return (
            <Field
                name={name}
                rules={rules}
                component={FileUpload}
                placeholder={placeholder}
                type="file"
                {...rest}
            />
        );
    }

    if (isTimePicker(tag)) {
        ;
        return (
            <Field
                name={name}
                rules={rules}
                component={DatePickerField}
                placeholder={placeholder}
                {...rest}

            />
        );
    }

    return null;
};

FormController.propTypes = {
    tag: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,

};

export default FormController;
