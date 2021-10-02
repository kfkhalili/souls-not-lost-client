import React from 'react';
import {FormattedMessage} from 'react-intl';
import {v4 as uuid} from 'uuid';
import {I18EN} from "../../../../../../_metronic/i18n/Keys";
import {fieldTags} from "../../../../../../_metronic/_partials/controls/Form/InputTypes";

const useFields = (userType, _id) => {
    const isClient = 2
    const fields = [
        {
            id: uuid(),
            tag: fieldTags.CheckBox,
            type: 'checkbox',
            initialValue: userType,
            label: <FormattedMessage id={I18EN.CanUpload}/>,
            name: 'canUpload',
            layout: "col-12",
        },
    ];

    const initialValues = fields.reduce((values, cuuField) => {
        let initialValuesObj = values;

        initialValuesObj = {
            ...initialValuesObj,
            [cuuField.name]: cuuField.initialValue,
        };

        return initialValuesObj;
    }, {});

    return {
        initialValues: {
            _id,
            ...initialValues
        },
        fields,
    };
};

export default useFields;
