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
import {FormattedMessage} from "react-intl";
import {I18EN} from "../../../../../../_metronic/i18n/Keys";
import useFields from "./fields";

// Validation schema
const PersonEditSchema = Yup.object().shape({
    From: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("From is required"),
    Destin: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Destin is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    personName: Yup.string().required("Personname is required"),
    dateOfBbirth: Yup.mixed()
        .nullable(false)
        .required("Date of Birth is required"),
    ipAddress: Yup.string().required("IP Address is required"),
});

export function ValidateTokenFrom({
                                      savePerson,
                                      person,
                                      actionsLoading,
                                      onHide,
                                  }) {
    const {fields} = useFields()
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={person}
                validationSchema={PersonEditSchema}
                onSubmit={(values) => {
                    savePerson(values);
                }}
            >
                {({handleSubmit}) => (
                    <>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            {actionsLoading && (
                                <div className="overlay-layer bg-transparent">
                                    <div className="spinner spinner-lg spinner-success"/>
                                </div>
                            )}
                            <FormikForm fields={fields}/>
                            <div className="d-flex justify-content-end">
                                <button
                                    type="submit"
                                    onClick={() => handleSubmit()}
                                    className="btn btn-primary btn-elevate text-capitalize"
                                >
                                    <FormattedMessage id={I18EN.validate}/>
                                </button>
                            </div>
                            <div className="d-flex justify-content-between">
                            <label className="text-capitalize">
                                <FormattedMessage id={I18EN.result}/>
                            </label>
                                <a href="#" className="btn btn-icon">
                                    <span className="svg-icon"><i className="ki ki-copy icon-1x"></i></span>
                                </a>
                            </div>
                            <div className="d-block">
                                <textarea className="form-control" id="kt_autosize_1" rows="3"/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type="button"
                                onClick={onHide}
                                className="btn btn-light btn-elevate"
                            >
                                Cancel
                            </button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}
