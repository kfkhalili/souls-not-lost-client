// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";
import {
    UserStatusCssClasses,
    UserStatusTitles,
} from "../../UIHelpers";
import {FormattedMessage} from "react-intl";
import {I18EN} from "../../../../../../../_metronic/i18n/Keys";

export function StatusColumnFormatter(cellContent, row) {
    const getLabelCssClasses = () => {
        return `label label-lg label-light-${
            UserStatusCssClasses[row.status]
        } label-inline`;
    };
    return (
        <span className={getLabelCssClasses()}>
      {UserStatusTitles[row.status]}
    </span>
    );
}

export function ActiveColumnFormatter(cellContent, row) {
    const getLabelCssClasses = () => {
        return `label label-lg label-light-${
            UserStatusCssClasses[!!row.active]
        } label-inline`;
    };
    return (
    <span className={getLabelCssClasses()}>
        <FormattedMessage id={!!row.active ? I18EN.YES : I18EN.NO}/>
    </span>
    );
}
