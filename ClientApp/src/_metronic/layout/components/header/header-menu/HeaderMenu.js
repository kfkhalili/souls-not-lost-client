/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {useLocation} from "react-router";
import {NavLink} from "react-router-dom";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl, checkIsActive} from "../../../../_helpers";
import {Form} from "react-bootstrap";
import {I18EN} from "../../../../i18n/Keys";
import {useIntl} from "react-intl";

export function HeaderMenu({layoutProps}) {
    const location = useLocation();
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }
    const intl = useIntl()
    return <div
        id="kt_header_menu"
        className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
    >
        <div className={`menu-nav  ${layoutProps.ulClasses}`}>
            <div className="form-group mb-0 d-flex align-items-center">
                {/*<div className="input-icon">*/}
                {/*    <input type="text" className="form-control w-lg-388px d-none d-lg-inline"*/}
                {/*           placeholder={intl.formatMessage({id: I18EN["ECOMMERCE.COMMON.SEARCH"]})}/>*/}
                {/*    <span className="svg-icon svg-icon-md svg-icon-primary"><SVG*/}
                {/*        src={toAbsoluteUrl('/media/svg/icons/General/Search.svg')}/></span>*/}
                {/*</div>*/}
            </div>
        </div>
    </div>;
}
