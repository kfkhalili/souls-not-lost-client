import React from 'react';
import {FormattedMessage} from 'react-intl';
import {v4 as uuid} from 'uuid';
import {I18EN} from "../../../../../../_metronic/i18n/Keys";

const useFields = (userType, _id) => {
    const isClient = 2
    const fields = [
        {
            id: uuid(),
            tag: 'select',
            type: 'drop-down',
            initialValue: userType,
            label: <FormattedMessage id={I18EN["Role"]}/>,
            name: 'userType',
            layout: "col-12",
            items: [
                {
                    id:"admin",
                    name:"admin",
                    nameEn:"admin",
                    nameAr:"ادمين"
                },
                {
                    id:"client",
                    name: "client",
                    value: "client",
                    nameAr: "زبون"
                }
            ]
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
