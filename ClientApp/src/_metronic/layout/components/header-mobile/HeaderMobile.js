import React, {useMemo} from "react";
import {Link} from "react-router-dom";
import objectPath from "object-path";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_helpers";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import {Navnav} from "../header/Header";
import {FormattedMessage} from "react-intl";
import {I18EN} from "../../../i18n/Keys";

export function HeaderMobile() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      headerLogo: uiService.getStickyLogo(),
      asideDisplay: objectPath.get(uiService.config, "aside.self.display"),
      headerMenuSelfDisplay:
          objectPath.get(uiService.config, "header.menu.self.display") === true,
      headerMobileCssClasses: uiService.getClasses("header_mobile", true),
      headerMobileAttributes: uiService.getAttributes("header_mobile")
    };
  }, [uiService]);

  return (
      <>
        {/*begin::Header Mobile*/}
        <div
            id="kt_header_mobile"
            className={`header-mobile align-items-center ${layoutProps.headerMobileCssClasses}`}
            {...layoutProps.headerMobileAttributes}
        >
          {/*begin::Logo*/}
          <Link to="/">
            <img alt="logo" src={layoutProps.headerLogo}/>
          </Link>
          {/*end::Logo*/}

          {/*begin::Toolbar*/}
          <div className="d-flex align-items-center">
            {layoutProps.headerMenuSelfDisplay && (
                <>
                  {/*begin::Header Menu Mobile Toggle*/}
                  <div className="d-flex align-items-center h-100">
                    <Link to="/gallery"> <span className="menu-text text-capitalize nav-link text-dark-25 text-hover-light">{<FormattedMessage
                        id={I18EN["Aside.Gallery"]}/>}</span></Link>
                    <Link to="/people"> <span className="menu-text text-capitalize nav-link text-dark-25 text-hover-light"><FormattedMessage
                        id={I18EN["SOLES.Pepole"]}/></span></Link>
                    <Link to="/users"><span className="menu-text text-capitalize nav-link text-dark-25 text-hover-light"><FormattedMessage
                        id={I18EN['SOLES.Users']}/></span></Link>
                  </div>
                  {/*end::Header Menu Mobile Toggle*/}
                </>
            )}

            {/*begin::Topbar Mobile Toggle*/}
            <button
                className="btn btn-hover-text-primary p-0 ml-2"
                id="kt_header_mobile_topbar_toggle"
            >
              <span className="svg-icon svg-icon-xl">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
              </span>
            </button>
            {/*end::Topbar Mobile Toggle*/}
          </div>
          {/*end::Toolbar*/}
        </div>
        {/*end::Header Mobile*/}
      </>
  );
}
