import React, {useMemo, useEffect} from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import {Button, Dropdown, Spinner} from "react-bootstrap";
import {useHtmlClassService} from "../../../layout";
import {DropdownMenu4, DropdownCustomToggler} from "../../dropdowns";
import {KTUtil} from "../../../_assets/js/components/util";
import {toAbsoluteUrl} from "../../../_helpers";
import SVG from "react-inlinesvg";
import {FormattedMessage} from "react-intl";
import {I18EN} from "../../../i18n/Keys";

export const formatPrice = (n) => n.toLocaleString(
    "en-US",
    {minimumFractionDigits: 2}
);

export function MixedWidget14({className, summary,fetchSummery, listLoading, ...props}) {
    const uiService = useHtmlClassService();


    const layoutProps = useMemo(() => {
        return {
            colorsGrayGray100: objectPath.get(uiService.config, "js.colors.gray.gray100"),
            colorsGrayGray700: objectPath.get(uiService.config, "js.colors.gray.gray700"),
            colorsThemeBaseSuccess: objectPath.get(
                uiService.config,
                "js.colors.theme.base.success"
            ),
            colorsThemeBasePrimary: objectPath.get(
                uiService.config,
                "js.colors.theme.base.primary"
            ),
            colorsThemeBaseInfo: objectPath.get(
                uiService.config,
                "js.colors.theme.base.info"
            ),
            colorsThemeBaseDanger: objectPath.get(
                uiService.config,
                "js.colors.theme.base.danger"
            ),
            fontFamily: objectPath.get(uiService.config, "js.fontFamily")
        };
    }, [uiService]);

    useEffect(() => {
        const element = document.getElementById("kt_mixed_widget_14_chart");
        if (!element) {
            return;
        }

        const height = parseInt(KTUtil.css(element, 'height'));
        debugger
        const options = getChartOptions(layoutProps, height, [
            Number(summary.totalTransactionsPercentage) || 0,
            Number(summary.totalCancelledTransactionsPercentage) || 0,
            Number(summary.totalSalesPercentage) || 0,
            Number(summary.totalCancelledSalesPercentage) || 0
        ]);

        const chart = new ApexCharts(element, options);
        chart.render();
        return function cleanUp() {
            chart.destroy();
        };
    }, [summary, layoutProps]);


    console.log({summary})

    return (
        <div className={`card card-custom ${className}`}>
            {/* Header */}
            {/* Body */}
            <div className="card-body d-flex flex-column">
                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                        <span className="border-primary bg-light text-primary p-3 rounded">
                            {summary.dob.substr(0, 4)}-
                            {summary.dob.substr(4, 2)}-
                            {summary.dob.substr(6, 2)}
                        </span>
                        <Button
                            onClick={()=>{
                                console.log("clicked",fetchSummery)
                               return  fetchSummery()
                            }}
                            variant="outline-primary"
                            disabled={props?.listLoading}>
                            <FormattedMessage id={I18EN["SOLES.REFRESH"]}/>
                            {props?.listLoading && <Spinner/>}
                        </Button>
                    </div>
                    <div id="kt_mixed_widget_14_chart" style={{height: "200px"}}/>
                </div>
                <div className="pt-5">

                    <div className="row">
                        <div className="col-lg-6 text-blue mb-5">
                            <a href="#" className="btn btn-lg btn-icon btn-light-blue">
                                <span className="svg-icon svg-icon-blue " style={{color: "blue"}}>
                                    <SVG src={toAbsoluteUrl("media/svg/icons/Design/Circle.svg")}/>
                                  </span>
                            </a>
                            <span className="mx-3">
                            {summary.totalTransactionsPercentage}%
                            </span>
                        </div>
                        <div className="col-lg-6 text-success mb-5">
                            <a href="#" className="btn btn-lg btn-icon btn-light-success">
                                 <span className="svg-icon svg-icon-success ">
                                    <SVG src={toAbsoluteUrl("media/svg/icons/Design/Circle.svg")}/>
                                  </span>

                            </a>
                            <span className="mx-3">
                            {summary.totalCancelledTransactions}%
                            </span>

                        </div>
                        <div className="col-lg-6 text-info mb-5">
                            <a href="#" className="btn btn-lg btn-icon btn-light-info">
                                <span className="svg-icon svg-icon-info ">
                                    <SVG src={toAbsoluteUrl("media/svg/icons/Design/Circle.svg")}/>
                                  </span>

                            </a>
                            <span className="mx-3">
                                {summary.totalSalesPercentage}%
                            </span>

                        </div>
                        <div className="col-lg-6 text-danger mb-5">
                            <a href="#" className="btn btn-lg btn-icon btn-light-danger ">
                                  <span className="svg-icon svg-icon-danger ">
                                    <SVG src={toAbsoluteUrl("media/svg/icons/Design/Circle.svg")}/>
                                  </span>
                            </a>
                            <span className="mx-3">

                                {summary.totalCancelledSalesPercentage}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function getChartOptions(layoutProps, height, series = []) {
    const options = {
        series: series,
        chart: {
            height: height,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: "30%"
                },
                dataLabels: {
                    showOn: "always",
                    name: {
                        show: false,
                        fontWeight: "700",
                    },
                    value: {
                        color: layoutProps.colorsGrayGray700,
                        fontSize: "30px",
                        fontWeight: "700",
                        offsetY: 12,
                        show: true
                    },
                },
                track: {
                    background: layoutProps.colorsGrayGray100,
                    strokeWidth: '100%'
                }
            }
        },
        colors: [layoutProps.colorsThemeBasePrimary, layoutProps.colorsThemeBaseSuccess, layoutProps.colorsThemeBaseInfo, layoutProps.colorsThemeBaseDanger],
        stroke: {
            lineCap: "round",
        },
        labels: ["Progress1", "Progress2", "Progress3", "Progress4"]
    };
    return options;
}
