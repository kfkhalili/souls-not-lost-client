import React from 'react';
import {v4 as uuid} from 'uuid';
import {I18EN} from "../../../../../../_metronic/i18n/Keys";
import {fieldTags} from "../../../../../../_metronic/_partials/controls/Form/InputTypes";
import {toIds} from "../../../helpers/maplist";

const useFields = (isAdd) => {
    const fields = [
        {
            id: uuid(),
            label: I18EN["SOLES.Name"],
            tag: fieldTags.TextInput,
            name: 'name',
            initialValue: '',
        },
        {
            id: uuid(),
            label: I18EN.BirthDate,
            tag: fieldTags.TimePicker,
            name: 'birth',
            type: 'date',
        },
        {
            id: uuid(),
            label: I18EN.DeathDate,
            tag: fieldTags.TimePicker,
            name: 'death',
            type: 'date',
        },
        {
            id: uuid(),
            label: I18EN.Nationality,
            tag: fieldTags.SelectInput,
            name: 'nationality',
            type: 'select',
            getURL: "api/handle/api/general/nationalities",
            mapItems: toIds,
            initialValue: '',
        },
        {
            id: uuid(),
            label: I18EN.Occupation,
            tag: fieldTags.SelectInput,
            name: 'occupation',
            type: 'select',
            getURL: "api/handle/api/general/nationalities",
            mapItems: toIds,
            initialValue: '',
        },
        {
            id: uuid(),
            label: I18EN.CauseOfDeath,
            tag: fieldTags.SelectInput,
            name: 'causeOfDeath',
            type: 'select',
            getURL: "api/handle/api/general/causeofdeath",
            mapItems: toIds,
            initialValue: '',
        },
        {
            id: uuid(),
            label: I18EN.PlaceOfDeath,
            tag: fieldTags.SelectInput,
            name: 'deathPlace',
            type: 'select',
            getURL: "api/handle/api/general/placeofdeath",
            mapItems: toIds,
            initialValue: '',
        },
        {
            id: uuid(),
            label: I18EN.Picture,
            tag: fieldTags.UploadInput,
            name: 'picture',
            type: 'file',
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
