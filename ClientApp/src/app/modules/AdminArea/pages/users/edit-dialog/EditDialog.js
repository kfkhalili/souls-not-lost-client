import React, {useEffect, useMemo} from "react";
import {Modal} from "react-bootstrap";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from "../../../_redux/users/actions";
import {EditDialogHeader} from "./EditDialogHeader";
import {EditForm} from "./EditForm";
import {useUIContext} from "../UIContext";
import Axios from "axios";
import {useSnackbar} from "notistack";
import {useRefresh} from "../../../hooks/refresh";

export function EditDialog({id, show, onHide}) {
    // Users UI Context
    const UIContext = useUIContext();
    const UIProps = useMemo(() => {
        return {
            initUser: UIContext.initUser,
        };
    }, [UIContext]);

    // Users Redux state
    const dispatch = useDispatch();
    const {actionsLoading, userForEdit} = useSelector(
        (state) => ({
            actionsLoading: state.users.actionsLoading,
            userForEdit: state.users.userForEdit,
        }),
        shallowEqual
    );

    useEffect(() => {
        // server call for getting User by id
        dispatch(actions.fetchUser(id));
    }, [id, dispatch]);

    const {enqueueSnackbar} = useSnackbar()
    const RefreshState = useRefresh("users", actions, useUIContext)
    const saveItem2 = async (user, helpers) => {
        try {

            if (!id) {
                // server request for creating aggregator
                const {id, ...raggregator} = user
                raggregator.menuIds = []
                const result = await Axios.post("api/User", raggregator)
                enqueueSnackbar("Updated Successfully", {variant: "success"});
            } else {
                // server request for updating aggregator
                let {
                    username,
                    password,
                    firstName,
                    lastName,
                    status,
                    roleId,
                    notes
                } = user;
                const result = await Axios.put("api/User", {
                    username,
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
                item={userForEdit}
                onHide={onHide}
            />
        </Modal>
    );
}
