// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../../../../../_metronic/_helpers";

export function ActionsColumnFormatter(
    cellContent,
    row,
    rowIndex,
    {openEditUserDialog, openChangeRole}
) {
    return (
        <>
            <a
                title="Edit user"
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() => openEditUserDialog(row.username)}
            >
        <span className="svg-icon svg-icon-md svg-icon-warning">
          <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
            </a>

            <a
                title={"Change Role"}
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() => openChangeRole(row._id)}
            >
        <span className="svg-icon svg-icon-md svg-icon-warning">
          <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Shield-user.svg")}/>
        </span>
            </a>
        </>
    );
}
