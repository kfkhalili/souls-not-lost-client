import React, {useEffect, useState} from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import Axios from "axios";
import {API} from "../../../../constants";
import {FormattedMessage, useIntl} from "react-intl";
import * as _ from 'loadsh'

const getFieldCSSClasses = (touched, errors) => {
    const classes = ["form-control", "form-control-solid"];
    if (touched && errors) {
        classes.push("is-invalid");
    }
    if (touched && !errors) {
        classes.push("is-valid");
    }

    return classes.join(" ");
};

export function Select({

                           label,
                           withFeedbackLabel = true,
                           customFeedbackLabel,
                           children,
                           getURL,
                           ...props
                       }) {
    const intl = useIntl();
    const I18Label = intl.formatMessage({id:label,defaultMessage:label})
    const {field, form} = props;
    const error = form.errors[field.name];
    const touched = form.touched[field.name];
    const [data, setData] = useState(null);
    useEffect(() => {
        const loadData = async () => {
            if (getURL) {
                try {
                    let result;
                    if (props.dependent > ' ') {
                        if (form.values[props.dependent] > " ") {
                            let api = `${API}${getURL}`
                            api = api.replace(`{${props.dependent}}`, form.values[props.dependent])
                            result = await Axios.get(api);
                        }
                    } else {
                        result = await Axios.get(`${API}${getURL}`);
                    }
                    setData(result.data.data);
                } catch (e) {

                }

            }
        }
        loadData();
    }, [getURL, form?.values?.[props?.dependent]]);
    useEffect(() => {
        if (data !== null) {
            if (data.length > 0) {
                // props.form.setFieldValue( field.name,data[0].id||data.name)
            }
        }
    }, [data])
    let show = true;
    if(_.isFunction(props.displayOn) ){
        show = props.displayOn(form.values)
    }
    if(!show)
        return <></>
    return <>
        {label && <label><FormattedMessage id='Select' />  {I18Label}</label>}
        <select
            className={getFieldCSSClasses(touched, error)}
            {...field}
            label={I18Label}
            {...props}
        >
            <option value={""}>{intl.formatMessage({id: "CHOOSE"})}</option>
            {(!getURL)&&props.items.map(item => <option
                onBlur={field.onBlur}
                key={item.id}
                value={item.id}>{item?.name ? item?.name : item?.nameEn}</option>)}
            {data && (data.length > 0 && !(props.items?.length > 0)? data.map(item => <option
                onBlur={field.onBlur}
                key={item.id}
                value={item.id}>{item?.name ? item?.name : item?.nameEn}</option>) : children)}
        </select>
        {withFeedbackLabel && error > " " && touched && (
            <FieldFeedbackLabel
                error={error}
                touched={touched}
                label={I18Label}
                type={"text"}
                customFeedbackLabel={customFeedbackLabel}
            />
        )}
    </>;
}
