// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, {useEffect, useRef, useState} from "react";
import {Modal, Spinner} from "react-bootstrap";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import FormikForm from "../../../../../../_metronic/_partials/controls/FormikForm";
import useFields from "./fields";
import * as actions from "../../../_redux/users/actions";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {SaveButton} from "../../../../../../_metronic/_TransaltedButtons";

// Validation schema
const changeUserTypeValidation = Yup.object().shape({
    _id: Yup.string().required("required"),
    userType: Yup.string().required("required")
});

export function ChangeUserRole({
                                      item,
                                      onHide,
                                  }) {
    const dispatch = useDispatch();
    const {actionsLoading, userForEdit} = useSelector(
        (state) => ({
            actionsLoading: state.users.actionsLoading,
            userForEdit: state.users.userForEdit
        }),
        shallowEqual
    );
    const {fields, initialValues} = useFields(userForEdit?.userType, userForEdit?._id);

    // server request for saving user
    const updateRole = async (values, helpers) => {
        try {

            if (userForEdit?._id) {
                // server request for creating user
                const res = await dispatch(actions.changeUserRole(values));
            }
            helpers.setSubmitting(false)
        } catch (e) {
            console.log(e.message)
            helpers.setSubmitting(false)
        }
    };
    debugger
    if (!userForEdit)
        return (<div>
            <Spinner/>
        </div>);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={changeUserTypeValidation}
                onSubmit={updateRole}
            >
                {(formikProps) => (
                    <>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            {actionsLoading && (
                                <div className="overlay-layer bg-transparent">
                                    <div className="spinner spinner-lg spinner-success"/>
                                </div>
                            )}
                            <FormikForm fields={fields}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type="button"
                                onClick={onHide}
                                className="btn btn-light btn-elevate"
                            >
                                Cancel
                            </button>
                            <SaveButton
                                id={userForEdit?._id}
                                disabled={!formikProps.isValid || formikProps.isSubmitting}
                                onClick={formikProps.handleSubmit}
                            />
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}
