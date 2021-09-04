import React, {useEffect, useMemo} from "react";
import {
    Card as CCard,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
    CardHeaderTitle
} from "../../../../../_metronic/_partials/controls";
import {Table} from "./table/Table";
import {useIntl, FormattedMessage} from "react-intl";
import {I18EN} from "../../../../../_metronic/i18n/Keys";
import {Button, Spinner} from "react-bootstrap";
import * as actions from "../../_redux/users/actions";
import {useRefresh} from "../../hooks/refresh";
import {useUIContext} from "./UIContext";

export function Card() {
    const intl = useIntl()
    const RefreshState = useRefresh("users",actions,useUIContext)
    return (
        <CCard>
            <CardHeader>
                <CardHeaderTitle className={"text-capitalize d-flex align-items-center "}>
                    {
                        intl.formatMessage({id: I18EN["SOLES.Users"],})
                    }
                    <Button
                        onClick={ RefreshState.refresh}
                        variant="outline-primary"
                        className={"mx-3"}
                        disabled={RefreshState.listLoading}>
                        <FormattedMessage id={I18EN["SOLES.REFRESH"]}/>
                        {RefreshState.listLoading && <Spinner/>}
                    </Button>
                </CardHeaderTitle>
            </CardHeader>
            <CardBody>
                {/*<Filter/>*/}
                {/*{UIProps.ids.length > 0 && <Grouping />}*/}
                <Table/>
            </CardBody>
        </CCard>
    );
}
