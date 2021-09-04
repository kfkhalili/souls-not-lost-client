import React from "react";
import {FormattedMessage} from "react-intl";
import {I18EN} from "../i18n/Keys";
import {Modal} from "react-bootstrap";

export const SaveHeader = (props) => <span className="text-capitalize">
    {props?.id > " " ? <FormattedMessage id={I18EN.EDIT}/> : <FormattedMessage id={I18EN.CREATE}/>}
    {props?.id && ` (${props?.id})`}
</span>