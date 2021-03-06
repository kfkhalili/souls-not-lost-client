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
import * as actions from "../../_redux/people/actions";
import {useRefresh} from "../../hooks/refresh";
import {useUIContext} from "./UIContext";
import {Link} from "react-router-dom";

export function Card() {
    const intl = useIntl()
    const RefreshState = useRefresh("people",actions,useUIContext)
    return (
        <CCard>
            <CardHeader>
                <CardHeaderTitle className={"text-capitalize d-flex align-items-center "}>
                    {
                        intl.formatMessage({id: I18EN["SOLES.Pepole"],})
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
                    <CardHeaderToolbar>
                        <Link to={"/people/new"} className="btn btn-primary">
                            <FormattedMessage id={I18EN["SOLES.ADD"]}/>
                        </Link>
                    </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                {/*<Filter/>*/}
                {/*{UIProps.ids.length > 0 && <Grouping />}*/}
                <Table/>
            </CardBody>
        </CCard>
    );
}
