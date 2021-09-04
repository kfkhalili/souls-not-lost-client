import React from 'react';
import {v4 as uuid} from 'uuid';
import {I18EN} from "../../../../../../_metronic/i18n/Keys";

const useFields = (isAdd) => {
    const fields = [
        {
            id: uuid(),
            label: I18EN["SOLES.Note"],
            tag: 'input',
            name: 'notes',
            type: 'text',
            initialValue: '',
        },
        {
            id: uuid(),
            label: I18EN["SOLES.RoleId"],
            tag: 'select',
            name: 'roleId',
            items: [{id: 0, name: "Standard"}, {id: 1, name: "Administrator"},],
            type: 'text',
            initialValue: 0,
        },
        {
            id: uuid(),
            label: I18EN["SOLES.Status"],
            tag: 'select',
            name: 'status',
            type: 'drop-down',
            enableAddItem: true,
            items: [{id: 0, name: "active"}, {id: 1, name: "inactive"},],
            parent: true,
            initialValue: 0,
        },
        {
            id: uuid(),
            label: I18EN["SOLES.Last.Name"],
            tag: 'input',
            name: 'lastName',
            rules: [{required: true}],
            type: 'text',
            initialValue: '',
        },
        {
            id: uuid(),
            label: I18EN["SOLES.First.Name"],
            tag: 'input',
            name: 'firstName',
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
    if (isAdd) {
        fields.push({
            id: uuid(),
            label: I18EN["AUTH.INPUT.PASSWORD"],
            tag: 'input',
            name: 'password',
            type: 'text',
            initialValue: '',
        },
            {
                id: uuid(),
                label: I18EN["AUTH.INPUT.USERNAME"],
                tag: 'input',
                name: 'username',
                type: 'text',
                initialValue: '',
            },

        )
    }else{
        fields.push(
            {
                id: uuid(),
                label: I18EN["AUTH.INPUT.USERNAME"],
                tag: 'input',
                disabled:true,
                name: 'username',
                type: 'text',
                initialValue: '',
            },
        )
    }
    return {
        initialValues,
        fields:fields.reverse(),
    };
};

export default useFields;
