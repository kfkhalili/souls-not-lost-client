import React from 'react';
import {FormattedMessage} from 'react-intl';
import {v4 as uuid} from 'uuid';
import {I18EN} from "../../../../../../_metronic/i18n/Keys";

const useFields = (personType, clientID = null) => {
    const isClient = 2
    const fields = [
        {
            id: uuid(),
            label: I18EN["token"],
            tag: 'textarea',
            name: 'token',
            layout:"col-12",
            rules: [{required: true}],
            type: 'text',
            initialValue: '',
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
        initialValues,
        fields,
    };
};

export default useFields;
