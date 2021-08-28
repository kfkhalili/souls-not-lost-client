// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, {useEffect, useMemo} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from "../../../_redux/people/actions";
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

/*
* name: { type : String, required: true, trim: true},
  birth: { type : Date, required: true, trim: true},
  birthplace: { type: String },
  death: { type : Date, min: this.birth, required: true, trim: true},
  deathPlace: { type: String, required: true },
  nationality:  { type: mongoose.Schema.Types.ObjectId, ref: 'Nationality' },
  occupation: { type: mongoose.Schema.Types.ObjectId, ref: 'Nationality' },
  causeOfDeath: { type: mongoose.Schema.Types.ObjectId, ref: 'CauseOfDeath' },
  url: { type : String, required: true, trim: true},
  image: [{ type : Buffer, required: true }],
  createdBy:{
    type: schema.Types.ObjectId,
    ref: 'user'
  },
* */
export function Table() {
    // People UI Context
    const UIContext = useUIContext();
    const UIProps = useMemo(() => {
        return {
            ids: UIContext.ids,
            setIds: UIContext.setIds,
            queryParams: UIContext.queryParams,
            setQueryParams: UIContext.setQueryParams,
            openEditPersonDialog: UIContext.openEditPersonDialog,
            openDeletePersonDialog: UIContext.openDeletePersonDialog,
            openChangeRole: UIContext.openChangeRole,
        };
    }, [UIContext]);

    // Getting curret state of people list from store (Redux)
    const {currentState} = useSelector(
        (state) => ({currentState: state.people}),
        shallowEqual
    );
    const {totalCount, entities, listLoading} = currentState;

    // People Redux state
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
            dataField: "name",
            text: intl.formatMessage({
                id: I18EN["SOLES.Person"]
            }),
            sort: true,
            sortCaret: sortCaret,
            formatter: (model, row) => {
                return <a href={row.url}>
                    <div>
                        {row.image && <img className="img-thumbnail" src={row.image} href={row.name}/>}
                        <b className="text-dark">{model}</b>
                    </div>
                </a>
            },
            headerSortingClasses,
        },
        {
            dataField: "birth",
            text: intl.formatMessage({
                id: I18EN["Date.Of.Birth"]
            }),
            sort: true,
            sortCaret: sortCaret,
            formatter: (date) => {
                return moment(date).format('yyyy-MM-DD HH:mm')
            },
            headerSortingClasses,
        },
        {
            dataField: "birthplace",
            text: intl.formatMessage({
                id: I18EN["PlaceOfBirth"]
            }),
            sort: true,
            sortCaret: sortCaret,
            formatter: (model) => {
                return model?.name
            },
            headerSortingClasses,
        },
        {
            dataField: "death",
            text: intl.formatMessage({
                id: I18EN["Date.Of.Death"]
            }),
            sort: true,
            sortCaret: sortCaret,
            formatter: (date) => {
                return moment(date).format('yyyy-MM-DD HH:mm')
            },
            headerSortingClasses,
        },
        {
            dataField: "deathPlace",
            text: intl.formatMessage({
                id: I18EN["PlaceOfBirth"]
            }),
            sort: true,
            sortCaret: sortCaret,
            formatter: (model) => {
                return model?.name
            },
            headerSortingClasses,
        },
        {
            dataField: "nationality",
            text: intl.formatMessage({
                id: I18EN["Nationality"]
            }),
            sort: true,
            sortCaret: sortCaret,
            formatter: (model) => {
                return model?.name
            },
            headerSortingClasses,
        },
        {
            dataField: "occupation",
            text: intl.formatMessage({
                id: I18EN["Occupation"]
            }),
            sort: true,
            sortCaret: sortCaret,
            formatter: (model) => {
                return model?.name
            },
            headerSortingClasses,
        },
        {
            dataField: "causeOfDeath",
            text: intl.formatMessage({
                id: I18EN["CauseOfDeath"]
            }),
            sort: true,
            sortCaret: sortCaret,
            formatter: (model) => {
                return model?.name
            },
            headerSortingClasses,
        },
        {
            dataField: "createdBy",
            text: intl.formatMessage({
                id: I18EN["SOLES.Created.By"]
            }),
            sort: true,
            sortCaret: sortCaret,
            formatter: (model) => {
                return model?.name
            },
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: intl.formatMessage({id: I18EN.Actions}),
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditPersonDialog: UIProps.openEditPersonDialog,
                openDeletePersonDialog: UIProps.openDeletePersonDialog,
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
