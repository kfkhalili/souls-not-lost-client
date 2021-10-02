// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, {useEffect, useMemo} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from "../../../_redux/users/actions";
import {
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../UIHelpers";
import * as columnFormatters from "./column-formatters";
import {useUIContext} from "../UIContext";
import {useIntl} from "react-intl";
import {I18EN} from "../../../../../../_metronic/i18n/Keys";
import moment from "moment"

export function Table() {
    // Users UI Context
    const UIContext = useUIContext();
    const UIProps = useMemo(() => {
        return {
            ids: UIContext.ids,
            setIds: UIContext.setIds,
            queryParams: UIContext.queryParams,
            setQueryParams: UIContext.setQueryParams,
            openEditUserDialog: UIContext.openEditUserDialog,
            openDeleteUserDialog: UIContext.openDeleteUserDialog,
            openChangeRole: UIContext.openChangeRole,
            openCanUpload: UIContext.openCanUpload,
        };
    }, [UIContext]);

    // Getting curret state of users list from store (Redux)
    const {currentState} = useSelector(
        (state) => ({currentState: state.users}),
        shallowEqual
    );
    const {totalCount, entities, listLoading} = currentState;

    // Users Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // clear selections list
        //UIProps.setIds([]);
        // server call by queryParams
        dispatch(actions.fetchItems(UIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [UIProps.queryParams, dispatch]);
    // Table columns
    const intl = useIntl()
    const columns = [
        {
            dataField: "username",
            text: intl.formatMessage({
                id: I18EN["SOLES.User"]
            }),
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "email",
            text: intl.formatMessage({
                id: I18EN["AUTH.INPUT.EMAIL"]
            }),
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "userType",
            text: intl.formatMessage({
                id: I18EN.UserType
            }),
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "canUpload",
            text: intl.formatMessage({
                id: I18EN.CanUpload
            }),
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: (col) => col ? <span className="label label-lg label-light-success label-inline">Can upload</span> : <span className="label label-lg label-light-danger label-inline">Can't upload</span>
        },
        {
            dataField: "createdDate",
            text: intl.formatMessage({
                id: I18EN["SOLES.Created.Date"]
            }),
            sort: true,
            sortCaret: sortCaret,
            formatter: (createdAt) => {
             return moment(createdAt).format('yyyy-MM-DD HH:mm')
            },
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: intl.formatMessage({id: I18EN.Actions}),
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditUserDialog: UIProps.openEditUserDialog,
                openDeleteUserDialog: UIProps.openDeleteUserDialog,
                openChangeRole: UIProps.openChangeRole,
                openCanUpload: UIProps.openCanUpload,
            },
            classes: "text-right pr-0",
            headerClasses: "text-right pr-3",
            style: {
                minWidth: "100px",
            },
        },
    ];
    // Table pagination properties
    const paginationOptions = {
        custom: true,
        totalSize: totalCount,
        sizePerPageList: uiHelpers.sizePerPageList,
        sizePerPage: UIProps.queryParams.pageSize,
        page: UIProps.queryParams.pageNumber,
    };
    return (
        <>
            <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote={false}
                textFilter={UIProps?.queryParams?.textSearch}
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                    UIProps.setQueryParams
                )}

            >
                <PleaseWaitMessage entities={entities}/>
                <NoRecordsFoundMessage entities={entities}/>
            </BootstrapTable>
        </>
    );
}
