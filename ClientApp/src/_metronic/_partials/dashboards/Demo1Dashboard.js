import React, {useEffect, useState} from "react";
import {
    MixedWidget14,
} from "../widgets";
import {FormattedMessage} from "react-intl";
import {I18EN} from "../../i18n/Keys";
import axios from "axios";
import {useSnackbar} from "notistack";
import {Spinner} from "react-bootstrap";
import {CircularProgress} from "@material-ui/core";
import {formatPrice} from "../widgets/mixed/MixedWidget14";


export function Demo1Dashboard() {
    const [listLoading, setListLoading] = useState(false);
    const [counter, setCounter] = useState(0);
    const [laoded , setLaoded]  =useState(false)

    const [data, setData] = useState({
        "dob": "",
        "delivery": {
            "totalTransactions": 0,
            "totalCancelledTransactions": 0,
            "totalSales": 0,
            "totalCancelledSales": 0
        },
        "takeaway": {
            "totalTransactions": 0,
            "totalCancelledTransactions": 0,
            "totalSales": 0,
            "totalCancelledSales": 0
        },
        "walkIn": {
            "totalTransactions": 0,
            "totalCancelledTransactions": 0,
            "totalSales": 0,
            "totalCancelledSales": 0
        },
        "totalTransactionsPercentage": "0",
        "totalCancelledTransactionsPercentage": "0",
        "totalSalesPercentage": "0",
        "totalCancelledSalesPercentage": "0",
    });
    const {enqueueSnackbar} = useSnackbar()

    const handleRefreshClick = ()=>{
        setCounter(c => c+1)
    }

    const fetchSummery = async () => {
        try {
            setListLoading(true);
            const res = await axios.get("/api/Dashboard/Summary")
            if (res.data) {
                setData(res.data);

            }
            setListLoading(false);

        } catch (e) {
            setListLoading(false);
            enqueueSnackbar(e.message, {variant: "error"})
        }

    }
    console.log({data})
    useEffect(() => {
        setLaoded(true)
        if(laoded)
        fetchSummery()
    }, [counter,laoded])

    const result = {
        totalTransactions: {
            total: data.delivery.totalTransactions + data.takeaway.totalTransactions + data.walkIn.totalTransactions,
            totalDelivery: data.delivery.totalTransactions,
            totalTakeaway: data.takeaway.totalTransactions,
            totalWalkIn: data.walkIn.totalTransactions
        },
        totalCancelledTransactions: {
            total: data.delivery.totalCancelledTransactions + data.takeaway.totalCancelledTransactions + data.walkIn.totalCancelledTransactions,
            totalDelivery: data.delivery.totalCancelledTransactions,
            totalTakeaway: data.takeaway.totalCancelledTransactions,
            totalWalkIn: data.walkIn.totalCancelledTransactions

        },
        totalSales: {
            total: data.delivery.totalSales + data.takeaway.totalSales + data.walkIn.totalSales,
            totalDelivery: data.delivery.totalSales,
            totalTakeaway: data.takeaway.totalSales,
            totalWalkIn: data.walkIn.totalSales
        },
        totalCancelledSales: {
            total: data.delivery.totalCancelledSales + data.takeaway.totalCancelledSales + data.walkIn.totalCancelledSales,
            totalDelivery: data.delivery.totalCancelledSales,
            totalTakeaway: data.takeaway.totalCancelledSales,
            totalWalkIn: data.walkIn.totalCancelledSales
        }
    }
    const keys = Object.keys(result);
    const colors = {
        "0": "s-card-primary",
        "1": "s-card-success",
        "2": "s-card-info",
        "3": "s-card-danger",
    }
    console.log({keys})
    const MapResult = () => keys.map((key, index) => {
        return <div key={key} className={`col-12 col-sm-6 mb-9`}>
            <div className={`row no-gutters s-card ${colors[index]}`}>
                <div className="col-12 mb-5">
                    <h3>
                        <FormattedMessage id={key}/>
                    </h3>
                    <h3>
                        {formatPrice(result[key].total)}
                    </h3>
                </div>
                <div className=" col-12 col-xl-6">
                    <h4>
                        <small className='text-muted'>
                            <FormattedMessage id={I18EN.total_delivery}/>
                        </small>
                    </h4>
                    <h4>
                        {
                            formatPrice(result[key].totalDelivery)
                        }
                    </h4>
                </div>
                <div className=" col-12  col-xl-6">
                    <h4>
                        <small className='text-muted'>
                            <FormattedMessage id={I18EN.total_takeaway}/>
                        </small>
                    </h4>
                    <h4>
                        { formatPrice(result[key].totalTakeaway)}
                    </h4>
                </div>
            </div>
        </div>
    })

    if (!data)
        return <div className='d-flex justify-content-center'>
            <span className="ml-3 spinner spinner-white"/>
        </div>

    return (
        <div className="container-fluid">
            <div className="row ">
                <div className="col-lg-8 ">
                    <div className={"s-card-group   text-capitalize"}>
                        <div className="row "><MapResult/></div>
                    </div>
                </div>
                <div className="col-lg-4  gutter-b">
                    <MixedWidget14 listLoading={listLoading} fetchSummery={handleRefreshClick} summary={data} className="card-stretch "/>
                </div>
            </div>
        </div>
    );
}
