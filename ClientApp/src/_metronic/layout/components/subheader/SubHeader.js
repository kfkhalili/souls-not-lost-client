/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useMemo, useLayoutEffect, useEffect} from "react";
import objectPath from "object-path";
import {Link, Route, useLocation} from "react-router-dom";
import {QuickActions} from "./components/QuickActions";
import {BreadCrumbs} from "./components/BreadCrumbs";
import {getBreadcrumbsAndTitle, useSubheader} from "../../_core/MetronicSubheader";
import {useHtmlClassService} from "../../_core/MetronicLayout"
import {FormattedMessage} from "react-intl";
import {Button} from "react-bootstrap";
import {I18EN} from "../../../i18n/Keys";

export function SubHeader() {
    const uiService = useHtmlClassService();
    const location = useLocation();
    const subheader = useSubheader();

    const layoutProps = useMemo(() => {
        return {
            config: uiService.config,
            subheaderMobileToggle: objectPath.get(
                uiService.config,
                "subheader.mobile-toggle"
            ),
            subheaderCssClasses: uiService.getClasses("subheader", true),
            subheaderContainerCssClasses: uiService.getClasses(
                "subheader_container",
                true
            )
        };
    }, [uiService]);

    useLayoutEffect(() => {
        const aside = getBreadcrumbsAndTitle("kt_aside_menu", location.pathname);
        const header = getBreadcrumbsAndTitle("kt_header_menu", location.pathname);
        const breadcrumbs = (aside && aside.breadcrumbs.length > 0) ? aside.breadcrumbs : header.breadcrumbs;
        subheader.setBreadcrumbs(breadcrumbs);
        subheader.setTitle((aside && aside.title && aside.title.length > 0) ? aside.title : header.title);
    }, [location.pathname]);

    useEffect(() => {
    }, [subheader]);
    return (
        <div
            id="kt_subheader"
            className={`subheader py-2 py-lg-4   ${layoutProps.subheaderCssClasses}`}
            style={{margiRight: "25px"}}
        >
            <div
                className={`${layoutProps.subheaderContainerCssClasses} d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap`}
            >
                {/* Info */}
                <div className="d-flex align-items-center flex-wrap mr-1">
                    {layoutProps.subheaderMobileToggle && (
                        <button
                            className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
                            id="kt_subheader_mobile_toggle"
                        >
                            <span/>
                        </button>
                    )}
                    <BreadCrumbs items={subheader.breadcrumbs}/>
                </div>

                {/* Toolbar */}
                <div className="d-flex align-items-center">
                    <Route path={"/aggregators"}>
                        <Link to={"/aggregators/validate/token"} className="btn btn-success mx-3">
                            <FormattedMessage id={I18EN["SOLES.Validate.token"]}/>
                        </Link>
                        <Link to={"/aggregators/new"} className="btn btn-primary">
                            <FormattedMessage id={I18EN["SOLES.ADD"]}/>
                        </Link>
                    </Route>
                    <Route path={"/users"}>
                        <Link to={"/users/new"} className="btn btn-primary">
                            <FormattedMessage id={I18EN["SOLES.ADD"]}/>
                        </Link>
                    </Route>
                    <Route path={"/people"}>
                        <Link to={"/people/new"} className="btn btn-primary">
                            <FormattedMessage id={I18EN["SOLES.ADD"]}/>
                        </Link>
                    </Route>
                </div>
            </div>
        </div>
    );
}
