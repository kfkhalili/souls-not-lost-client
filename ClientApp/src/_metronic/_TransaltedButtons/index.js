import React from "react";
import {FormattedMessage} from "react-intl";
import {I18EN} from "../i18n/Keys";

export const CancelButton = ({onClick}) => <button
    type="button"
    onClick={onClick}
    className="btn btn-light btn-elevate text-capitalize"
>
    <FormattedMessage id={I18EN.CANCEL}/>
</button>
export const SaveButton = (props) => <button
    type="submit"
    className="btn btn-primary btn-elevate text-capitalize"
    {...props}
>
    {props?.id > " " ? <FormattedMessage id={I18EN.SAVE}/> : <FormattedMessage id={I18EN.CREATE}/>}
</button>