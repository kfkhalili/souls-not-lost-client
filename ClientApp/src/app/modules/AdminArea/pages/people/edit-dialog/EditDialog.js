import React, {useEffect, useMemo} from "react";
import {Modal} from "react-bootstrap";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from "../../../_redux/people/actions";
import {EditDialogHeader} from "./EditDialogHeader";
import {EditForm} from "./EditForm";
import {useUIContext} from "../UIContext";
import Axios from "axios";
import {useSnackbar} from "notistack";
import {useRefresh} from "../../../hooks/refresh";

const toFormData = (payload) => {
    const data = new FormData();
    for (let k of Object.keys(payload))
    {
        data.append(k, payload[k]);
    }
    return data;
}

export const useClient = ({url, state, callback, isFormData= false}) => {
    const {enqueueSnackbar} = useSnackbar()
    return {
        request: async (person, helpers) => {
            try {
                const body = isFormData ? toFormData(person) : person;
                const result = await Axios.post(url, body)
                enqueueSnackbar("Request Succeeded", {variant: "success"});
                state.refresh()

                callback()
            } catch (e) {
                enqueueSnackbar(e.message, {variant: "error"});
            } finally {
                helpers.setSubmitting(false)
            };
        }
    }
}

export function EditDialog({id, show, onHide}) {
    // People UI Context
    const UIContext = useUIContext();
    const UIProps = useMemo(() => {
        return {
            initPerson: UIContext.initPerson,
        };
    }, [UIContext]);

    // People Redux state
    const dispatch = useDispatch();
    const {actionsLoading, personForEdit} = useSelector(
        (state) => ({
            actionsLoading: state.people.actionsLoading,
            personForEdit: state.people.personForEdit,
        }),
        shallowEqual
    );

    useEffect(() => {
        // server call for getting Person by id
        dispatch(actions.fetchPerson(id));
    }, [id, dispatch]);


    const RefreshState = useRefresh("people", actions, useUIContext)
    const {request} = useClient(
        {
            url:"/api/admin/person",
            state: RefreshState,
            callback: onHide,
            isFormData: true,
        });

    return (
        <Modal
            size="lg"
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <EditDialogHeader id={id}/>
            <EditForm
                saveItem={request}
                actionsLoading={actionsLoading}
                item={personForEdit}
                onHide={onHide}
            />
        </Modal>
    );
}
