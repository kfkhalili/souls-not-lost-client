import React from "react";
import PropTypes from "prop-types";
import {Form} from "formik";
import FormController from "./FormikController";
const formFiledClass = "col-lg-6";

const FormikForm = ({fields,layoutClass}) => {
    return (
        <Form className="form form-label-right">
            <div className="form-group row">

                {/* First Name */}
                {
                    fields.map((field) => {
                        return (
                            <>
                                {!field.hidden && <div key={field.name} className={field.layout || layoutClass || formFiledClass}>
                                    <FormController
                                        {...field}
                                    />
                                </div>}
                            </>)
                    })
                }
            </div>
        </Form>
    );
};

FormikForm.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FormikForm.defaultProps = {
    fields: []
};

export default FormikForm;
