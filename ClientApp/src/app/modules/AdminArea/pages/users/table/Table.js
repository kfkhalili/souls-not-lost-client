// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, {useEffect, useMemo} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from "../../../_redux/users/actions";
import {
    getSelectRow,
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
            dataField: "firstName_lastName",
            text: <>
                {intl.formatMessage({
                    id: I18EN["SOLES.First.Name"]
                })}
                <br/>
                {intl.formatMessage({
                    id: I18EN["SOLES.Last.Name"]
                })}
            </>
            ,
            sort: true,
            formatter: (cell, row) => {
                return <>
                    {row?.firstName} <br/>
                    {row?.lastName}
                </>
            },
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "createdBy",
            text: intl.formatMessage({
                id: I18EN["SOLES.Created.By"]
            }),
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
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
            dataField: "updatedBy",
            text: intl.formatMessage({
                id: I18EN["SOLES.Created.By"]
            }),
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "updatedDate",
            text: intl.formatMessage({
                id: I18EN["SOLES.Created.Date"]
            }),
            sort: true,
            formatter: (createdAt) => {
                return moment(createdAt).format('yyyy-MM-DD HH:mm')
            },
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "notes",
            text: intl.formatMessage({
                id: I18EN["NOTES"]
            }),
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        // {
        //     dataField: "status",
        //     text: intl.formatMessage({id: I18EN["SOLES.Status"]}),
        //     sort: true,
        //     formatter: AColumnFormatter,
        //     sortCaret: sortCaret,
        //     headerSortingClasses,
        // },
        // {
        //     dataField: "roleId",
        //     text: intl.formatMessage({id: I18EN["SOLES.RoleId"]}),
        //     sort: true,
        //     formatter: RoleColumnFormatter,
        //     sortCaret: sortCaret,
        //     headerSortingClasses,
        // },
        {
            dataField: "action",
            text: intl.formatMessage({id: I18EN.Actions}),
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditUserDialog: UIProps.openEditUserDialog,
                openDeleteUserDialog: UIProps.openDeleteUserDialog,
                openChangeRole: UIProps.openChangeRole,
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
            {/*<PaginationProvider pagination={paginationFactory(paginationOptions)}>*/}
            {/*    {({paginationProps, paginationTableProps}) => {*/}
            {/*        return (*/}
            {/*            // <Pagination*/}
            {/*            //     isLoading={listLoading}*/}
            {/*            //     paginationProps={paginationProps}*/}
            {/*            // >*/}
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
            {/*//             </Pagination>*/}
            {/*//         );*/}
            {/*//     }}*/}
            {/*// </PaginationProvider>*/}
        </>
    );
}
