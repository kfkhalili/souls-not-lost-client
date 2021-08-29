import React, {useEffect, useState} from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import Axios from "axios";
import {API} from "../../../../constants";
import {FormattedMessage} from 'react-intl';

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

export function ListsWidget4({className, data}) {
    return (
        <>
            {data && (data.map(item => <div className="d-block ">
                    <label
                        className="text-dark-75 text-hover-primary font-weight-bold font-size-lg checkbox checkbox-lg checkbox-light-success checkbox-single flex-shrink-0 m-0 mx-4">
                        {item}
                        <input type="checkbox" name="" onChange={() => {
                        }} value="1"/>
                        <span></span>
                    </label>
                </div>)
            )}
        </>
    );
}

export function CheckboxList({
                                 label,
                                 withFeedbackLabel = true,
                                 customFeedbackLabel,
                                 children,
                                 getURL,
                                 ...props
                             }) {
    const {field, form} = props;
    const error = form.errors[field.name];
    const touched = form.touched[field.name];
    const [data, setData] = useState(null);

    useEffect(() => {
        if (data !== null)
            return
        const loadData = async () => {
            if (getURL) {
                const result = await Axios.get(`${API}${getURL}`);
                if (result?.data?.data) {
                    setData(result.data.data);
                }
            }
        }
        loadData();
    }, [getURL]);

    const handleChange = (id) => (e) => {
        // e.preventDefault()
        let result = form.values[field.name];
        if (e.target.checked) {
            let roleToAdd = data.find(item => item === id);
            result.push(roleToAdd)
        } else {
            result = result.filter(item => item !== id)
        }
        form.setFieldValue(field.name, result)

    }
    let isAllSelected = form.values[field.name].length === data?.length;
    return <>
        {label &&
        <label>
            <FormattedMessage id='Select'/> {label}
            <label
                className="text-dark-75 text-hover-primary font-weight-bold font-size-lg checkbox checkbox-lg checkbox-light-success checkbox-single flex-shrink-0 m-0 mb-4 p-1">
                <input
                    {...field}
                    onChange={
                        (e) => {
                            if (e.target.checked)
                                form.setFieldValue(field.name, data)
                            else
                                form.setFieldValue(field.name, [])
                        }
                    }
                    type="checkbox"
                    checked={isAllSelected}/>
                <span className={"mr-3"}/>
                {isAllSelected?"deselect all":"select all"}
            </label>
        </label>}
        <div
            className="d-flex flex-wrap gap-1"
        >
            {data && (data.map(item => <div className="d-block " key={item}>
                    <label
                        className="text-dark-75 text-hover-primary font-weight-bold font-size-lg checkbox checkbox-lg checkbox-light-success checkbox-single flex-shrink-0 m-0 mb-4 p-1">
                        <input  {...field} onChange={handleChange(item)} type="checkbox" name={item}
                                checked={form.values[field.name].includes(item)}/>
                        <span className={"mr-3"}/>
                        <FormattedMessage id={item}/>
                    </label>
                </div>)
            )}
        </div>

        {withFeedbackLabel && error > " " && touched && <FieldFeedbackLabel
            erros={error}
            touched={touched}
            label={label}
            customFeedbackLabel={customFeedbackLabel}
        />}
    </>;
}
