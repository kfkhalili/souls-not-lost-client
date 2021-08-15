// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import {Modal} from "react-bootstrap";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {
    Input,
    Select,
    DatePickerField,
} from "../../../../../../_metronic/_partials/controls";
import FormikForm from "../../../../../../_metronic/_partials/controls/FormikForm";
import useFields from "./fields";
import {CancelButton, SaveButton} from "../../../../../../_metronic/_TransaltedButtons";

// Validation schema
const UserEditSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("required"),
    password: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("required"),
    firstName: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("required"),
    lastName: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("required"),
    status: Yup.number().required("required"),
    roleId: Yup.number().required("required"),
    notes: Yup.string()
});

export function EditForm({
                             saveItem,
                             item,
                             actionsLoading,
                             onHide,
                         }) {
    const {fields, initialValues} = useFields(!(item?.username > " "));
    // Validation schema
    const UserEditSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("required"),
        password: item?.username > " " ? Yup.string() : Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("required"),
        firstName: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("required"),
        lastName: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("required"),
        status: Yup.number().required("required"),
        roleId: Yup.number().required("required"),
        notes: Yup.string()
    });
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={item || initialValues}
                validationSchema={UserEditSchema}
                onSubmit={saveItem}
            >
                {(fProps) => {
                    console.log(fProps)
                    return (<>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            {actionsLoading && (
                                <div className="overlay-layer bg-transparent">
                                    <div className="spinner spinner-lg spinner-success"/>
                                </div>
                            )}
                            <FormikForm fields={fields}/>
                        </Modal.Body>
                        <Modal.Footer>

                            <CancelButton onClick={onHide}/>
                            <SaveButton
                                id={item?.id}
                                disabled={!fProps.isValid || fProps.isSubmitting}
                                onClick={() => fProps.handleSubmit()}
                            />
                        </Modal.Footer>
                    </>)
                }}
            </Formik>
        </>
    );
}
