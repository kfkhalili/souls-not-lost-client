import React, {useState} from "react";
import {useFormik} from "formik";
import {connect} from "react-redux";
import {Link, Redirect, useParams} from "react-router-dom";
import * as Yup from "yup";
import {injectIntl} from "react-intl";
import * as auth from "../_redux/authRedux";
import {requestPassword, resetPassword} from "../_redux/authCrud";

const initialValues = {
    email: "",
    confirmationCode: "",
    password: "",
    confirm_password: ""
};

function ResetPassword(props) {
    const {intl} = props;
    const [isRequested, setIsRequested] = useState(false);
    const params = useParams();
    const ResetPasswordSchema = Yup.object().shape({
        password: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
        email: Yup.string()
            .email("Wrong email format")
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
        confirm_password: Yup.string()
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            )
            .when("password", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Password and Confirm Password didn't match"
                ),
            })
    });

    const getInputClasses = (fieldname) => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return "is-invalid";
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return "is-valid";
        }

        return "";
    };

    const formik = useFormik({
        initialValues: {
            ...initialValues,
            ...params
        },
        validationSchema: ResetPasswordSchema,
        onSubmit: (values, {setStatus, setSubmitting}) => {
            resetPassword(values)
                .then(() => setIsRequested(true))
                .catch(() => {
                    setIsRequested(false);
                    setSubmitting(false);
                    setStatus(
                        intl.formatMessage(
                            {id: "AUTH.VALIDATION.NOT_FOUND"},
                            {name: values.email}
                        )
                    );
                });
        },
    });

    return (
        <>
            {isRequested && <Redirect to="/auth"/>}
            {!isRequested && (
                <div className="login-form login-Reset" style={{display: "block"}}>
                    <div className="text-center mb-10 mb-lg-20">
                        <h3 className="font-size-h1">Reset Password</h3>
                        <div className="text-muted font-weight-bold">
                            Hi {formik.values.email }, please enter your new password. not you? <Link to={"/auth/login"}>click here</Link>
                        </div>
                    </div>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
                    >
                        {formik.status && (
                            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                                <div className="alert-text font-weight-bold">
                                    {formik.status}
                                </div>
                            </div>
                        )}
                        {/* begin: Password */}
                        <div className="form-group fv-plugins-icon-container">
                            <input
                                placeholder="Password"
                                type="password"
                                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                    "password"
                                )}`}
                                name="password"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">{formik.errors.password}</div>
                                </div>
                            ) : null}
                        </div>
                        {/* end: Password */}

                        {/* begin: Confirm Password */}
                        <div className="form-group fv-plugins-icon-container">
                            <input
                                placeholder="Confirm Password"
                                type="password"
                                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                    "confirm_password"
                                )}`}
                                name="confirm_password"
                                {...formik.getFieldProps("confirm_password")}
                            />
                            {formik.touched.confirm_password && formik.errors.confirm_password ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                        {formik.errors.confirm_password}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        {/* end: Confirm Password */}
                        <div className="form-group d-flex flex-wrap flex-center">
                            <button
                                id="kt_login_Reset_submit"
                                type="submit"
                                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                                disabled={formik.isSubmitting}
                            >
                                Submit
                            </button>
                            <Link to="/auth">
                                <button
                                    type="button"
                                    id="kt_login_Reset_cancel"
                                    className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                                >
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default injectIntl(connect(null, auth.actions)(ResetPassword));
