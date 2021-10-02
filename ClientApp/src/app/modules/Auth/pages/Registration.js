import React, {useState} from "react";
import {useFormik} from "formik";
import {connect} from "react-redux";
import * as Yup from "yup";
import {Link, useHistory} from "react-router-dom";
import {FormattedMessage, injectIntl} from "react-intl";
import * as auth from "../_redux/authRedux";
import {register} from "../_redux/authCrud";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: ""
};

function Registration(props) {
    const {intl} = props;
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const histroy = useHistory();
    const RegistrationSchema = Yup.object().shape({
        username: Yup.string()
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
        password: Yup.string()
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

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

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
        initialValues,
        validationSchema: RegistrationSchema,
        onSubmit: (values, {setStatus, setSubmitting, setErrors}) => {
            setSuccess(false);
            setSubmitting(true);
            enableLoading();
            register(values)
                .then((res) => {
                    if (res.status != 200) {
                        setStatus(
                            res.data.message > "" ? res.data.message : "request failed"
                        );
                        setErrors(res.data);
                    } else {
                        // disable button
                        setSuccess(true);
                        // display success message
                        setStatus(
                            res.data.message > "" ? res.data.message : "request success"
                        );
                    }
                    setSubmitting(false);
                    disableLoading();
                    props.register(res.data.token);
                })
                .catch((error) => {
                    console.log("error", error);
                    if (error.response)
                        if (error.response.data.message > " ")
                            setStatus(error.response.data.message);
                        else setStatus(error.message);
                    setSubmitting(false);
                    disableLoading();
                });
        },
    });

    return (
        <div className="login-form login-signin" style={{display: "block"}}>
            <div className="text-center mb-10 mb-lg-20">
                <h3 className="font-size-h1">
                    <FormattedMessage id="AUTH.REGISTER.TITLE"/>
                </h3>
                <p className="text-muted font-weight-bold">
                    Enter your details to create your account
                </p>
            </div>

            <form
                id="kt_login_signin_form"
                className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
                onSubmit={formik.handleSubmit}
            >
                {/* begin: Fullname */}
                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="Name"
                        type="text"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                            "username"
                        )}`}
                        name="username"
                        {...formik.getFieldProps("username")}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block">{formik.errors.username}</div>
                        </div>
                    ) : null}
                </div>
                {/* end: Fullname */}
                {/* begin: Email */}
                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="Email"
                        type="email"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                            "email"
                        )}`}
                        name="email"
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block">{formik.errors.email}</div>
                        </div>
                    ) : null}
                </div>
                {/* end: Email */}

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
                {/* begin: Alert */}
                {formik.status && (
                    <div
                        className={
                            "mb-10 alert alert-custom  alert-dismissible " +
                            (success ? "alert-light-success" : "alert-light-danger")
                        }
                    >
                        <div className="alert-text font-weight-bold">{formik.status}</div>
                    </div>
                )}
                {/* end: Alert */}
                {/* end: Terms and Conditions */}
                <div className="form-group d-flex flex-wrap flex-center">
                    {success ? (
                        <Link to="/auth/login">
                            <button
                                type="button"
                                className="btn btn-light-success font-weight-bold px-9 py-4 my-3 mx-4"
                            >
                                Login
                            </button>
                        </Link>
                    ) : (
                        <button
                            type="submit"
                            disabled={
                                formik.isSubmitting ||
                                !formik.isValid ||
                                success
                            }
                            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                        >
                            <span>Submit</span>
                            {loading && <span className="ml-3 spinner spinner-white"/>}
                        </button>
                    )}
                    <Link to="/auth/login">
                        <button
                            type="button"
                            className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                        >
                            Cancel
                        </button>
                    </Link>
          <div>
            <small className="text-dark">have account login from <Link to={"/auth/login"}>here</Link></small>
          </div>
                </div>
            </form>
        </div>
    );
}

export default injectIntl(connect(null, auth.actions)(Registration));
