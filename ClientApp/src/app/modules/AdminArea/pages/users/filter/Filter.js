import React, {useEffect, useMemo, useState} from "react";
import {Formik} from "formik";
import {isEqual} from "lodash";
import {useUIContext} from "../UIContext";
import {FormattedMessage, useIntl} from "react-intl";
import {I18EN} from "../../../../../../_metronic/i18n/Keys";
import Axios from "axios";
export const isDisabled = false;

const prepareFilter = (queryParams, values) => {
    const {isActive, conceptId, textSearch, menuTemplateId} = values;
    const newQueryParams = {...queryParams};
    const filter = {};
    if (isActive !== "")
        filter.isActive = isActive;
    if (conceptId !== "")
        filter.conceptId = conceptId;
    if (menuTemplateId !== "")
        filter.menuTemplateId = menuTemplateId;
    if (textSearch !== "")
        filter.textSearch = textSearch;

    newQueryParams.filter = filter;
    return newQueryParams;
};

export function Filter() {
    const [concepts, setConcepts] = useState()
    useEffect(() => {
        try {
            const getConcepts = async () => {

                const res = await Axios.get("/api/Dashboard/Concept")
                setConcepts(res.data)
            }
            getConcepts()
        } catch (e) {

        }
    }, [])
    // Aggregators UI Context
    const UIContext = useUIContext();
    const UIProps = useMemo(() => {
        return {
            queryParams: UIContext.queryParams,
            setQueryParams: UIContext.setQueryParams,
        };
    }, [UIContext]);

    // queryParams, setQueryParams,
    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(UIProps.queryParams, values);
        if (!isEqual(newQueryParams, UIProps.queryParams)) {
            newQueryParams.pageNumber = 1;
            UIProps.setQueryParams(newQueryParams);
        }
    };
    const intl = useIntl()
    return (
        <>
            <Formik
                initialValues={UIProps.queryParams}
                onSubmit={(values) => {
                    applyFilter(values);
                }}
            >
                {({
                      values,
                      handleSubmit,
                      handleBlur,
                      handleChange,
                      setFieldValue,
                  }) => {
                    return <form onSubmit={handleSubmit} className="form form-label-right">
                        <div className="form-group row">
                            <div className="col-lg-2 ">
                                <input
                                    disabled={isDisabled}
                                    type="text"
                                    className="form-control d-block"
                                    name="textSearch"
                                    placeholder={intl.formatMessage({id: I18EN["ECOMMERCE.COMMON.SEARCH"]})}
                                    onBlur={handleBlur}
                                    value={values.searchText}
                                    onChange={(e) => {
                                        setFieldValue("textSearch", e.target.value);
                                        handleSubmit();
                                    }}
                                />
                                <small className="form-text text-muted">
                                    <FormattedMessage id="FILTER.BYREPORT"/>
                                </small>
                            </div>
                            <div className="col-lg-2">

                                <select
                                    className="form-control d-block"
                                    disabled={isDisabled}

                                    name="isActive"
                                    onChange={(e) => {
                                        setFieldValue("isActive", e.target.value);
                                        handleSubmit();
                                    }}
                                    onBlur={handleBlur}
                                    value={values.isActive}
                                >
                                    <option value="">
                                        {
                                            intl.formatMessage({
                                                    id: 'All',
                                                }
                                            )
                                        }
                                    </option>
                                    <option className="text-capitalize" value="0">
                                        {
                                            intl.formatMessage({
                                                    id: I18EN.NO,
                                                }
                                            )
                                        }
                                    </option>
                                    <option className="text-capitalize" value="1">
                                        {
                                            intl.formatMessage({
                                                    id: I18EN.YES,

                                                }
                                            )
                                        }
                                    </option>
                                </select>
                                <small className="form-text text-muted">
                                    <FormattedMessage id={I18EN["ECOMMERCE.COMMON.FILTER"]}/> <FormattedMessage
                                    id={I18EN["FILTER.IS.ACTIVE"]}/>
                                </small>
                            </div>
                            <div className="col-lg-2">

                                <select
                                    disabled={isDisabled}

                                    className="form-control d-block"
                                    name="conceptId"
                                    onChange={(e) => {
                                        setFieldValue("conceptId", e.target.value);
                                        handleSubmit();
                                    }}
                                    onBlur={handleBlur}
                                    value={values.isActive}
                                >
                                    {
                                        concepts && concepts.map((concept) => {
                                            return <option value={concept.id}>
                                                {concept.name}
                                            </option>
                                        })}
                                </select>
                                <small className="form-text text-muted">
                                    <FormattedMessage id={I18EN["ECOMMERCE.COMMON.FILTER"]}/> <FormattedMessage
                                    id={I18EN["SOLES.Concept"]}/>
                                </small>
                            </div>
                            <div className="col-lg-2">

                                <select
                                    disabled={isDisabled}

                                    className="form-control d-block"
                                    name="active"
                                    onChange={(e) => {
                                        setFieldValue("isActive", e.target.value);
                                        handleSubmit();
                                    }}
                                    onBlur={handleBlur}
                                    value={values.isActive}
                                >
                                    {

                                        !isNaN(values.conceptId) && concepts && concepts.find((item) => item.id == values.conceptId)?.menuTemplates.map((concept) => {
                                            return <option value={concept.id}>
                                                {concept.name}
                                            </option>
                                        })}
                                </select>
                                <small className="form-text text-muted">
                                    <FormattedMessage id={I18EN["ECOMMERCE.COMMON.FILTER"]}/> <FormattedMessage
                                    id={I18EN["FILTER.Template"]}/>
                                </small>
                            </div>
                        </div>
                    </form>
                }}
            </Formik>
        </>
    );
}
