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

    const {enqueueSnackbar} = useSnackbar()
    const RefreshState = useRefresh("people", actions, useUIContext)
    const saveItem2 = async (person, helpers) => {
        try {

            if (!id) {
                // server request for creating aggregator
                const {id, ...raggregator} = person
                raggregator.menuIds = []
                const result = await Axios.post("api/Person", raggregator)
                enqueueSnackbar("Updated Successfully", {variant: "success"});
            } else {
                // server request for updating aggregator
                let {
                    personname,
                    password,
                    firstName,
                    lastName,
                    status,
                    roleId,
                    notes
                } = person;
                const result = await Axios.put("api/Person", {
                    personname,
                    password,
                    firstName,
                    lastName,
                    status,
                    roleId,
                    notes
                })
                enqueueSnackbar("Updated Successfully", {variant: "success"});

            }
            RefreshState.refresh()
            helpers.setSubmitting(false)
            onHide()
        } catch (e) {
            helpers.setSubmitting(false)
            enqueueSnackbar("Request Failed", {variant: "error"});
        }
    };
    return (
        <Modal
            size="lg"
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <EditDialogHeader id={id}/>
            <EditForm
                saveItem={saveItem2}
                actionsLoading={actionsLoading}
                item={personForEdit}
                onHide={onHide}
            />
        </Modal>
    );
}
