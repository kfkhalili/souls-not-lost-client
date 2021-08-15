import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import * as auth from "../_redux/authRedux";
import {login} from "../_redux/authCrud";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import {useSnackbar} from "notistack";
import {I18EN} from "../../../../_metronic/i18n/Keys";

const initialValues = {
    username: "",
    password: ""
};
// const AuthError = () => {
//     const message = localStorage.getItem("auth-error");
//     if (!(message > " "))
//         return <></>
//     return (<div className="d-flex align-items-center bg-light-danger  rounded-xl  mb-5 p-2">
//               <span className="svg-icon svg-icon-3x svg-icon-danger d-block mr-3 ">
//                 <SVG
//                     src={toAbsoluteUrl("/media/svg/icons/General/Lock.svg")}
//                 />
//               </span>
//         <span
//             className="text-danger font-weight-bold mr-3 "
//         >
//             Authentication error
//           </span>
//         <span
//             className="text-dark-75 font-weight-bolder d-block "
//         >
//                {
//                    message
//                }
//               </span>
//     </div>)
//
// }

function Login(props) {
    const {intl} = props;
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const LoginSchema = Yup.object().shape({
        username: Yup.string()
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
        password: Yup.string()
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
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
    const {enqueueSnackbar} = useSnackbar()
    const onSubmit = async (values, {setStatus, setSubmitting}) => {
        setSuccess(false);
        localStorage.setItem("auth-error", "")

        enableLoading();
        try {

            const res = await login({
                rememberMe: false,
                ...values
            });
            setStatus(
                res.data.message > "" ? res.data.message : "request success"
            );
            props.login(res.data.token);
            props.setUser({user:res.data})
            setTimeout(() => history.push("/dashboard"), 1000);
            console.log("data", res.data);
            disableLoading();
        } catch (error) {
            disableLoading();
            if (error.response) {
                if (error.response?.data?.ErrorName > " ") {
                    setStatus(intl.formatMessage({id: I18EN.InvalidCredential}));
                    enqueueSnackbar(intl.formatMessage({id: I18EN.InvalidCredential}));
                    return;
                }
            }
            setStatus(error.message);
        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: onSubmit
    });
    return (
        <div className="login-form login-signin" id="kt_login_signin_form">
            {/* begin::Head */}
            <div className="text-center mb-10 mb-lg-20">
                <h3 className="font-size-h1">
                    <FormattedMessage id="AUTH.LOGIN.TITLE"/>
                </h3>
                <p className="text-muted font-weight-bold">
                    Enter your username and password
                </p>
            </div>
            {/* end::Head */}

            {/*begin::Form*/}
            <form
                onSubmit={formik.handleSubmit}
                className="form fv-plugins-bootstrap fv-plugins-framework"
            >
                {formik.status && (
                    <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                        <div className="alert-text font-weight-bold">{formik.status}</div>
                    </div>
                )}

                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="username"
                        type="username"
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
                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="Password"
                        type="password"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses("password")}`}
                        name="password"
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block">{formik.errors.password}</div>
                        </div>
                    ) : null}
                </div>
                <div className="form-group d-flex flex-wrap justify-content-end align-items-center">
                    {/*<Link*/}
                    {/*    to="/auth/forgot-password"*/}
                    {/*    className="text-dark-50 text-hover-primary my-3 mr-2"*/}
                    {/*    id="kt_login_forgot"*/}
                    {/*>*/}
                    {/*    <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON"/>*/}
                    {/*</Link>*/}
                    <button
                        id="kt_login_signin_submit"
                        type="submit"
                        disabled={formik.isSubmitting}
                        className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
                    >
                        <span>Sign In</span>
                        {loading && <span className="ml-3 spinner spinner-white"/>}
                    </button>
                </div>
            </form>
            {/*end::Form*/}
        </div>
    );
}

export default injectIntl(connect(null, auth.actions)(Login));
