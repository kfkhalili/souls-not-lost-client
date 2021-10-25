import React, {Fragment, useEffect, useRef, useState} from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import Axios from "axios";
import {API} from "../../../../constants";
import {FormattedMessage, useIntl} from 'react-intl';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {Typeahead} from "react-bootstrap-typeahead";
import *  as _ from "loadsh"
import {translate} from "../../../_helpers/translate";
import {toAbsoluteUrl} from "../../../_helpers";
import {isNumber} from "loadsh";

export function SingleTypeheadSelectAllowNew({
                                         label,
                                         withFeedbackLabel = true,
                                         customFeedbackLabel,
                                         children,
                                         getURL,
                                         mapItems = (list) => list,
                                         ...props
                                     }) {
    const intl = useIntl();
    const I18Label = intl.formatMessage({id: label, defaultMessage: label})
    const {field, form} = props;
    const {values} = form
    const {
        onValuesChange = () => {
        }
    } = props
    const error = form.errors[field.name];
    const touched = form.touched[field.name];
    const [data, setData] = useState(null);
    const ref = useRef();
    useEffect(() => {
        onValuesChange(values)
    }, [values])

    useEffect(() => {
        const loadData = async () => {
            if (getURL) {
                try {
                    let result;
                    if (props.dependent > ' ') {
                        if (form.values[props.dependent] > " ") {
                            if (!(getURL > " "))
                                return
                            let api = `${API}${getURL}`
                            api = api.replace(`{${props.dependent}}`, form.values[props.dependent])
                            result = await Axios.get(api);
                        }
                    } else {
                        result = await Axios.get(`${API}${getURL}`);
                    }
                    setData(mapItems(result.data.data));
                } catch (e) {

                }

            }
        }
        loadData();
    }, [getURL, form?.values?.[props?.dependent]]);

    useEffect(() => {
        if (_.isFunction(ref.current?.clear) && props?.dependent > " ")
            ref.current.clear()
    }, [form?.values?.[props?.dependent], form?.values?.[props?.parentDependents]],)
    useEffect(() => {
        if (_.isFunction(props.displayOn)) {
            if (!_.isFunction(ref.current?.clear)) {
                if (field.value + "" > " " && ref.current) {
                    ref.current.clear()
                }
            }
        }

    }, [form?.values])
    const mapData = (selected) => {
        if (getURL > " ") {
            if (_.isArray(data))
                if (selected > " ") {
                    let res;
                    if(selected){
                        res = data.find((i) => i.name === selected)
                    }
                    if (res)
                        return [res]
                } else {
                    if (props.isAll) {
                        return [{
                            id: "",
                            name: translate("All")
                        }]
                    }
                }
        } else {
            if (_.isArray(props.items)) {
                let res = props.items.find((i) => i.name === selected)
                if (res)
                    return [res]
            }
        }
        return []
    }

    const [selected, setSelected] = useState(form.values[field.name]);
    useEffect(()=>{
        if(!(form.values[field.name] === selected)){
            setSelected(form.values[field.name]);
        }
    },[form.values[field.name], data])
    
    let show = true;
    if (_.isFunction(props.displayOn)) {
        show = props.displayOn(form.values)
    }
    if (!show)
        return <></>
    let showTypehead = true


    const options = getURL > " " ? data : props.items;
    if (getURL > " " && !options) {
        showTypehead = false
    }

    if (!(options?.length > 0))
        showTypehead = false

    if (field.value && !(options?.length > 0) )
        showTypehead = false


    const defaultSelect = mapData(field.value)
    if (!_.isArray(defaultSelect))
        showTypehead = false
    if (!(field.value == null))
        if (!(getURL > " ") && "" + field.value > " " && !defaultSelect)
            showTypehead = false

    if (!showTypehead)
        return <>
            {label && <label><FormattedMessage id='Select'/> {I18Label}{selected}</label>}
            <select disabled placeholder={I18Label} className="form-control">
                <option value="no-data" selected={!props.isAll}/>
                <option value="" selected={props.isAll}>  {translate("All")}</option>
            </select>
            {
                withFeedbackLabel && (
                    <FieldFeedbackLabel
                        error={error}
                        touched={touched}
                        label={I18Label}
                        type={"text"}
                        customFeedbackLabel={customFeedbackLabel}
                    />
                )
            }
        </>
    return <>
        {label && <label>{I18Label}</label>}
        <div className="position-relative">
            <Typeahead
                allowNew
                clearButton
                type="checkbox"
                name={field.name}
                className={props?.inputclassName + ' rbt-border-info'}
                disabled={!showTypehead || props?.disabled}
                id={I18Label}
                ref={ref}
                labelKey={'name'}
                options={_.isArray(options) ? options : []}
                positionFixed
                placeholder={I18Label}
                selected={selected ? [selected] : []}
                label={I18Label}
                isValid={touched && !error > " "}
                isInvalid={touched && error > " "}
                onChange={(value) => {
                    debugger
                    let result = [];
                    for (const key in value) {
                        if(_.isObject(value[key])){
                            result.push(value[key].name)
                        }else{
                            result.push(value[key])
                        }
                    }
                    setSelected(result[0])
                    form.setFieldValue(field.name, result[0])
                }}
                onFocus={
                    (value) => {

                        if (field.value == "" && props.isAll) {
                            value.target.placeholder = "All"

                        }
                        if (field.value > " ") {
                            let placeholder = field.value;
                            if (placeholder) {
                                value.target.placeholder = placeholder
                            } else {
                                value.target.placeholder = ""
                            }

                        }
                        if (_.isFunction(ref.current?.getInput)) {
                            let input = ref.current?.getInput();
                            input.value = "";
                            if (ref?.current?.state) {
                                ref.current.state.text = "";
                            }
                        }
                    }
                }
            >
            </Typeahead>
            <i style={{position: "absolute", display: "block", right: "5px", top: "7px",}}>
                {
                    !(field.value > " ") &&
                <img style={{width: "16px"}} src={toAbsoluteUrl("/media/svg/icons/Navigation/Angle-down.svg")}/>}
            </i>
        </div>

        {
            withFeedbackLabel && (
                <FieldFeedbackLabel
                    error={error}
                    touched={touched}
                    label={I18Label}
                    type={"text"}
                    customFeedbackLabel={customFeedbackLabel}
                />
            )
        }
    </>
        ;
}
