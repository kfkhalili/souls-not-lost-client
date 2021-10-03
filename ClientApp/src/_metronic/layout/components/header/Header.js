import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import {Topbar} from "./Topbar";
import {HeaderMenuWrapper} from "./header-menu/HeaderMenuWrapper";
import {AnimateLoading} from "../../../_partials/controls";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {checkIsActive} from "../../../_helpers";
import {FormattedMessage} from "react-intl";
import {I18EN} from "../../../i18n/Keys";

export function Header() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      headerClasses: uiService.getClasses("header", true),
      headerAttributes: uiService.getAttributes("header"),
      headerContainerClasses: uiService.getClasses("header_container", true),
      menuHeaderDisplay: objectPath.get(
        uiService.config,
        "header.menu.self.display"
      ),
        headerLogo: uiService.getLogo()
    };
  }, [uiService]);
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
      {/*begin::Header*/}
      <div
        className={`header ${layoutProps.headerClasses}`}
        id="kt_header"
        {...layoutProps.headerAttributes}
      >
        <div className={` ${layoutProps.headerContainerClasses} d-flex align-items-stretch justify-content-between `}>
          <AnimateLoading />
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">  <div className="header-logo">
                        <Link to="">
                            <img style={{width:"50px"}} alt="logo" src={layoutProps.headerLogo}/>
                        </Link>
                    </div></Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/gallery"> <span className="menu-text nav-link">{<FormattedMessage
                            id={I18EN["Aside.Gallery"]}/>}</span></Link>
                        <Link to="/people"> <span className="menu-text text-capitalize nav-link"><FormattedMessage
                            id={I18EN["SOLES.Pepole"]}/></span></Link>
                        <Link to="/users"><span className="menu-text text-capitalize nav-link"><FormattedMessage
                            id={I18EN['SOLES.Users']}/></span></Link>
                    </Nav>
                </Container>
            </Navbar>
          {layoutProps.menuHeaderDisplay && <HeaderMenuWrapper />}
          {!layoutProps.menuHeaderDisplay && <div />}
          <Topbar />
        </div>
      </div>
      {/*end::Header*/}
    </>
  );
}