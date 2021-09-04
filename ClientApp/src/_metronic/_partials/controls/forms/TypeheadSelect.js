import React, {Fragment, useEffect, useState} from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import Axios from "axios";
import {API} from "../../../../constants";
import {FormattedMessage, useIntl} from 'react-intl';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {Typeahead} from "react-bootstrap-typeahead";

import *  as _ from "loadsh"

const getFieldCSSClasses = (touched, errors) => {
    const classes = [""];
    if (touched && errors) {
        classes.push("is-invalid-select");
    }

    if (touched && !errors) {
        classes.push("is-valid-select");
    }

    return classes.join(" ");
};

export function TypeheadSelect({
                                   label,
                                   withFeedbackLabel = true,
                                   customFeedbackLabel,
                                   children,
                                   getURL,
                                   ...props
                               }) {
    const intl = useIntl();
    const I18Label = intl.formatMessage({id: label, defaultMessage: label})
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
    const mapData = (selected) => {
        if (_.isArray(data))
            if (_.isArray(selected))
                return selected.map(item => {
                    if (_.isObject(item))
                        return item
                    return data.find((i) => i.id === item)
                })


    }
    let show = true;
    if (_.isFunction(props.displayOn)) {
        show = props.displayOn(form.values)
    }
    if (!show)
        return <></>
    return <>
        {label && <label><FormattedMessage id='Select'/> {I18Label}</label>}
        <Typeahead
            type="checkbox"
            id={I18Label}
            labelKey={'name'}
            options={getURL > " " ? _.isArray(data) ? [...data] : [] : [...props.items]}
            placeholder={I18Label}
            selected={mapData(form.values[field.name])}
            {...field}
            label={I18Label}
            isValid={touched && !error > " "}
            isInvalid={touched && error > " "}
            {...props}
            multiple
            onChange={(value) => {
                if (_.isArray(value))
                    form.setFieldValue(field.name, value.map((val) => val.id))
            }}>
        </Typeahead>
        {
            withFeedbackLabel && error > " " && touched && (
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
