import {FormattedMessage} from "react-intl";
import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import SVG from "react-inlinesvg"

const iconSize = "svg-icon-xl"
export const AcceptIcon = (props) => {
    return (<OverlayTrigger
            placement="bottom"
            overlay={
                <Tooltip id="language-panel-tooltip"> <FormattedMessage id="ACCEPT"/></Tooltip>
            }
        >
            <button {...props} className="btn btn-icon btn-light-success btn-hover-success btn-sm mx-3 ">
                <span className={`svg-icon svg-icon-success ${iconSize}`}>
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Check.svg")}/>
                </span>
            </button>
        </OverlayTrigger>
    )
}
export const CompleteIcon = (props) => {
    return (<OverlayTrigger
            placement="bottom"
            overlay={
                <Tooltip id="language-panel-tooltip"> <FormattedMessage id="COMPLETE"/></Tooltip>
            }
        >
            <button {...props} className="btn btn-icon btn-light-success btn-hover-success btn-sm mx-3 ">
                <span className={`svg-icon svg-icon-success ${iconSize}`}>
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Check.svg")}/>
                </span>
            </button>
        </OverlayTrigger>
    )
}

export const RejectIcon = (props) => {
    return (<OverlayTrigger
            placement="bottom"
            overlay={
                <Tooltip id="language-panel-tooltip"> <FormattedMessage id="REJECT"/></Tooltip>
            }
        >
            <button {...props} className="btn btn-icon btn-light-danger btn-hover-danger btn-sm mx-3">
                                <span className={`svg-icon svg-icon-danger ${iconSize}`}>
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Close.svg")}/>
                </span>
            </button>
        </OverlayTrigger>
    )
}
export const SettingIcon = (props) => {
    return (<OverlayTrigger
        placement="top"
        overlay={
            <Tooltip id="language-panel-tooltip"> <FormattedMessage id="MENU.SETTINGS"/></Tooltip>
        }
    >
        <button {...props} className="btn btn-icon btn-light-dark btn-hover-dark btn-sm mx-3">
                                                <span className={`svg-icon svg-icon-dark ${iconSize}`}>

                    <i className="flaticon-settings-1 icon-lg"/>
                </span>
        </button>
    </OverlayTrigger>)
}
export const ViewIcon = (props) => {
    return (<OverlayTrigger
            placement="bottom"
            overlay={
                <Tooltip id="language-panel-tooltip"> <FormattedMessage id="VIEW.DETAILS"/></Tooltip>
            }
        >
            <button {...props} className="btn btn-icon btn-light btn-hover-info btn-sm mx-3">
                <span className={`svg-icon svg-icon-info ${iconSize}`}>
                    <i className="flaticon2-paper icon-lg"/>
                </span>
            </button>
        </OverlayTrigger>
    )
}
export const TimeLineIcon = (props) => {
    return (<OverlayTrigger
            placement="bottom"
            overlay={
                <Tooltip id="language-panel-tooltip"> <FormattedMessage id="ORDER_TABLE.TIMELINE"/></Tooltip>
            }
        >
            <button {...props} className="btn btn-icon btn-light-warning btn-hover-warning btn-sm mx-lg-3  mx-2">
                <span className={`svg-icon svg-icon-warning ${iconSize}`}>
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Git1.svg")}/>
                </span>
            </button>
        </OverlayTrigger>
    )
}
export const  EditDetailsIcon = (props)=>{
    return<OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id="language-panel-tooltip"> <FormattedMessage id="EDIT.DETAILS"/></Tooltip>
        }
    >
        <button {...props} className="btn btn-icon btn-light btn-hover-info btn-sm mx-3">
                <span className={`svg-icon svg-icon-info ${iconSize}`}>
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Edit.svg")}/>
                </span>
        </button>
    </OverlayTrigger>
}
export const  DeleteIcon = (props)=>{
    return<OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id="language-panel-tooltip"> <FormattedMessage id="DELETE"/></Tooltip>
        }
    >
        <button {...props} className="btn btn-icon btn-light-danger btn-hover-danger btn-sm mx-3">
                <span className={`svg-icon svg-icon-danger ${iconSize}`}>
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Files/Deleted-file.svg")}/>
                </span>
        </button>
    </OverlayTrigger>
}
export const  AssignRole = (props)=>{
    return<OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id="language-panel-tooltip">    <FormattedMessage id="ASSIGN.ROLE"/></Tooltip>
        }
    >
        <button {...props} className="btn btn-icon btn-light-danger btn-hover-danger btn-sm mx-3">
                <span className={`svg-icon svg-icon-danger ${iconSize}`}>
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Key.svg")}/>
                </span>
        </button>
    </OverlayTrigger>
}
export const  PrinterIcon = (props)=>{
    return<OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id="language-panel-tooltip"><FormattedMessage id="PRINT"/></Tooltip>
        }
    >
        <button {...props} className="btn btn-icon btn-light-dark btn-hover-dark btn-sm mx-lg-3  mx-2">
                <span className={`svg-icon svg-icon-dark ${iconSize}`}>
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Devices/Printer.svg")}/>
                </span>
        </button>
    </OverlayTrigger>
}

export const  DownloadIcon = ({url = "https://www.w3schools.com",iconUrl = '/media/svg/invoice.svg', toolTip = ' ' , ...props})=>{
    return<OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id="language-panel-tooltip"><FormattedMessage id={toolTip}/></Tooltip>
        }
    >
        <button {...props} className="btn btn-icon btn-light-dark btn-hover-success btn-sm mx-lg-3  mx-2" style={{minWidth:'32px'}}>
                <span className={`svg-icon svg-icon-dark ${iconSize}`}>
                    <a href={url} target="_blank" >
                        <SVG src={toAbsoluteUrl(iconUrl)}/>
                    </a>
                </span>
        </button>
    </OverlayTrigger>
}
export const  TruckIcon = (props)=>{
    return<OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id="language-panel-tooltip"><FormattedMessage id="DELIVERY.NOTE"/></Tooltip>
        }
    >
        <button {...props} className="btn btn-icon btn-light-primary btn-sm mx-lg-3 mx-2">
                <span className={`svg-icon svg-ico  n-primary svg-icon-xxl ${iconSize} svg-icon-xxl`}>
                   <i className="flaticon2-delivery-truck"/>
                </span>
        </button>
    </OverlayTrigger>
}


// export const DownloadIcon = (props)=>(
//     <button {...props} className="btn btn-icon btn-light-primary btn-sm mx-lg-3 mx-2">
//         <span className={`svg-icon svg-ico  n-primary svg-icon-xxl ${iconSize} svg-icon-xxl`}>
//             <i className="flaticon2-download"/>
//         </span>
//     </button>
// )

export const  ViewMapIcon = (props)=>{
    return<OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id="language-panel-tooltip"><FormattedMessage id="VIEW.MAP"/></Tooltip>
        }
    >
        <button {...props} className="btn btn-icon btn-light-success btn-hover-success btn-sm mx-3">
                <span className={`svg-icon svg-icon-success ${iconSize}`}>
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Map/Position.svg")}/>
                </span>
        </button>
    </OverlayTrigger>
}
export const  AddClientIcon = (props)=>{
    return<OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id="language-panel-tooltip"><FormattedMessage id="ADD.CLIENT"/></Tooltip>
        }
    >
        <button {...props} className="btn btn-icon btn-light-success btn-hover-success btn-sm mx-3">
                <span className={`svg-icon svg-icon-success ${iconSize}`}>
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Add-user.svg")}/>
                </span>
        </button>
    </OverlayTrigger>
}
export const  UserBlockIcon = (props)=>{
    return<OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id="language-panel-tooltip"><FormattedMessage id={"DEACTIVATE"}/></Tooltip>
        }
    >
        <button {...props} className="btn btn-icon btn-light-danger btn-hover-danger btn-sm mx-3">
                <span className={`svg-icon svg-icon-danger ${iconSize}`}>
                    <SVG src={toAbsoluteUrl("/media/svg/icons/General/Shield-disabled.svg")}/>
                </span>
        </button>
    </OverlayTrigger>
}

export const  UserUnBlockIcon = (props)=>{
    return<OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id="language-panel-tooltip"><FormattedMessage id="ACTIVATE"/></Tooltip>
        }
    >
        <button {...props} className="btn btn-icon btn-light-success btn-hover-success btn-sm mx-3">
                <span className={`svg-icon svg-icon-success ${iconSize}`}>
                    <SVG src={toAbsoluteUrl("/media/svg/icons/General/Shield-check.svg")}/>
                </span>
        </button>
    </OverlayTrigger>
}

