/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import {shallowEqual, useSelector} from "react-redux";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";
import SVG from "react-inlinesvg";

export function UserProfileDropdown() {
  const { user } = useSelector((state) => state.auth);
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      light:
        objectPath.get(uiService.config, "extras.user.dropdown.style") ===
        "light",
    };
  }, [uiService]);

  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle
        as={DropdownTopbarItemToggler}
        id="dropdown-toggle-user-profile"
      >
        <div
          className={
            "btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
          }
        >
          {/*<span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">*/}
          {/*  {user.firstname}*/}
          {/*</span>*/}
          <span className="symbol symbol-35 ">
            <span className="symbol-label  font-size-h5 font-weight-bold ">
                 <SVG
                     src={toAbsoluteUrl("media/svg/icons/General/User.svg")}
                 />
            </span>
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround w-200px">
        <>

          <div className="navi-footer d-flex justify-content-end  px-8 py-5">
                <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline my-3 ">
                  {user?.username}
                </span>
              <Link
                  to="/logout"
                  className="btn btn-light-primary font-weight-bold mx-3"
              >
                  Sign Out
              </Link>

          </div>
        </>
      </Dropdown.Menu>
    </Dropdown>
  );
}
