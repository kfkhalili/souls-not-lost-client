import React, { useMemo } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../../_core/MetronicLayout";
 import { LanguageSelectorDropdown } from "../extras/dropdowns/LanguageSelectorDropdown";
import { QuickUserToggler } from "../extras/QuiclUserToggler";
import {shallowEqual, useSelector} from "react-redux";

export function Topbar() {
  const uiService = useHtmlClassService();
  const user = useSelector((state) => state.auth.user?.user, shallowEqual);
  const layoutProps = useMemo(() => {
    return {
      viewSearchDisplay: objectPath.get(
        uiService.config,
        "extras.search.display"
      ),
      viewNotificationsDisplay: objectPath.get(
        uiService.config,
        "extras.notifications.display"
      ),
      viewQuickActionsDisplay: objectPath.get(
        uiService.config,
        "extras.quick-actions.display"
      ),
      viewCartDisplay: objectPath.get(uiService.config, "extras.cart.display"),
      viewQuickPanelDisplay: objectPath.get(
        uiService.config,
        "extras.quick-panel.display"
      ),
      viewLanguagesDisplay: objectPath.get(
        uiService.config,
        "extras.languages.display"
      ),
      viewUserDisplay: objectPath.get(uiService.config, "extras.user.display"),
    };
  }, [uiService]);
  return (
    <div className="topbar">
      {user && <div className="d-flex w-30 align-items-center"> <div>Hi, {user.username}</div></div>}
      {layoutProps.viewLanguagesDisplay && <LanguageSelectorDropdown />}
      {layoutProps.viewUserDisplay && <QuickUserToggler />}
    </div>
  );
}
