/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {useLocation} from "react-router";
import {NavLink} from "react-router-dom";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl, checkIsActive} from "../../../../_helpers";
import {FormattedMessage} from "react-intl";
import {I18EN} from "../../../../i18n/Keys";
import {useSelector} from "react-redux";

export function AsideMenuList({layoutProps}) {
    const location = useLocation();
    const {user} = useSelector((state) => state.auth);
    const getMenuItemActive = (url, hasSubmenu = false) => {
        return checkIsActive(location, url)
            ? ` ${!hasSubmenu &&
            "menu-item-active"} menu-item-open menu-item-not-hightlighted`
            : "";
    };
    const canSeePeople = user?.user?.canUpload || user?.user.userType === "admin";
    const canSeeUsers = user?.user.userType === "admin";
    return (
        <>
            {/* begin::Menu Nav */}
            <ul className={`menu-nav ${layoutProps.ulClasses}`}>
                {/*begin::1 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/gallery", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/gallery">
                <span className="svg-icon menu-icon">
                  <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
                </span>
                        <span className="menu-text">{<FormattedMessage id={I18EN["Aside.Gallery"]}/>}</span>
                    </NavLink>
                </li>
                {/*end::1 Level*/}
                {/*begin::1 Level*/}
                {
                    canSeePeople && (<li
                        className={`menu-item ${getMenuItemActive("/people", false)}`}
                        aria-haspopup="true"
                    >
                        <NavLink className="menu-link" to="/people">
                            <span className="svg-icon menu-icon">
                              <SVG
                                  src={toAbsoluteUrl(
                                      "/media/svg/icons/Navigation/Exchange.svg"
                                  )}
                              />
                            </span>
                            <span className="menu-text text-capitalize"><FormattedMessage
                                id={I18EN["SOLES.Pepole"]}/></span>
                        </NavLink>
                    </li>)
                }
                
                {/*end::1 Level*/}
                {/*begin::1 Level*/}
                {
                    canSeeUsers &&  <li
                        className={`menu-item ${getMenuItemActive("/users", false)}`}
                        aria-haspopup="true"
                    >
                        <NavLink className="menu-link" to="/users">
                        <span className="svg-icon menu-icon">
                          <SVG
                              src={toAbsoluteUrl(
                                  "/media/svg/icons/General/User.svg"
                              )}
                          />
                        </span>
                            <span className="menu-text text-capitalize"><FormattedMessage id={I18EN['SOLES.Users']}/></span>
                        </NavLink>
                    </li>
                }
                {/*end::1 Level*/}

            </ul>

            {/* end::Menu Nav */}
        </>
    );
}
